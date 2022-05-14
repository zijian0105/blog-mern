import Post from './Post/post'
import superagent from 'superagent'
import { Grid, CircularProgress } from '@material-ui/core'
import useStyles from './styles'
import { useState,useEffect} from 'react'

const Posts = ({setCurrentId,setCurrentId2}) => {
    const classes = useStyles()
    const [posts, setPosts] = useState([]) 
    const loadPost = async() =>{
        const post = await superagent.get('http://localhost:3001/posts')
        const postResult = post.body
        setPosts(postResult)
    }
    useEffect(()=>{
        loadPost()
    },[])
    return (
        <>
            {!posts.length ? <CircularProgress /> : (
            <Grid  className={classes.container} container alignItems="stretch" spacing={3}>
                {posts.map((post) => (
                    <Grid key={post._id} item xs={12} sm={6} md={6}>
                        <Post post={post} setCurrentId={setCurrentId} setCurrentId2={setCurrentId2}/>
                    </Grid>
                ))}
            </Grid>
            ) }
        </>
    )
}
export default Posts