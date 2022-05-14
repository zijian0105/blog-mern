import useStyles from './styles'
import { Paper, TextField, Button, Typography } from '@mui/material'
import FileBase from 'react-file-base64'
import { useState, useEffect } from 'react'
import superagent from 'superagent'

const Form = ({ currentId, setCurrentId }) => {
    const classes = useStyles()
    const [post, setPost] = useState({})
    const [flag, setFlag] = useState(true)
    const [postData, setPostData] = useState({
        creator: '',
        title: '',
        message: '',
        tags: '',
        selectedFile: ''
    })
    useEffect(() => { setPostData(post) }, [post])

    const clear = () => {
        setCurrentId(null)
        setPostData({
            creator: '',
            title: '',
            message: '',
            tags: '',
            selectedFile: ''
        })
        setFlag(true)
    }
    const handleSubmit = async () => {
        if (currentId) {
            console.log(post)
            await superagent.patch(`http://localhost:3001/posts/${currentId}`).send(post)
            clear()
        }
        else {
            await superagent.post(`http://localhost:3001/posts/create`)
                .send(
                    postData
                )
            clear()
        }
    }
    const findFunc = async (id) => {
        const pos = await superagent.get(`http://localhost:3001/posts/${id}`)
        const res = pos.body
        const result = {
            creator: res.creator,
            title: res.title,
            message: res.message,
            tags: res.tags,
            selectedFile: res.selectedFile
        }
        setPost(result)
        console.log(post)
    }

    if (currentId && flag) {
        setFlag(false)
        findFunc(currentId)
    }





    return (
        <Paper className={classes.paper}>

            <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant='h6'>{currentId ? `Editing "${post.title}"` : 'Creating a Memory'}</Typography>
                <TextField name="creator" variant="outlined" label="Creator" fullWidth value={postData.creator} onChange={(e) => setPostData({ ...postData, creator: e.target.value })} />
                <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
                <TextField name="message" variant="outlined" label="Message" fullWidth value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
                <TextField name="tags" variant="outlined" label="Tags" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
                <div className={classes.fileInput}><FileBase type='file' multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
                <Button className={classes.buttonSubmit} variant="contained" color='primary' size="large" type='submit' fullWidth>Submit</Button>
                <Button variant="contained" color='secondary' size="small" onClick={clear} fullWidth>Clear</Button>
            </form>

        </Paper>
    )
}
export default Form