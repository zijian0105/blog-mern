import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core/';
import superagent from 'superagent'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import useStyles from './styles'
import { useState, useEffect } from 'react';


const Post = ({ post, setCurrentId}) => {
    const classes = useStyles()

    const deletePost = async (id) => {
        console.log(id)
        if (await superagent.delete('http://localhost:3001/posts/delete').send({ "_id": id })) {
            window.location.reload(false);
            alert("Success! ")
        }
    }

    return (
        <>
            <Card className={classes.card}>
                <CardMedia className={classes.media} image={post.selectedFile} title={post.title} component='div' />
                <div className={classes.overlay}>
                    <Typography variant="h6">{post.creator}</Typography>
                    <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
                </div>
                <div className={classes.overlay2}>
                    <Button style={{ color: 'white' }} size="small" ><MoreHorizIcon fontSize="small" onClick={() => {  setCurrentId(post._id); console.log(post._id)  }} /></Button>
                </div>
                <div className={classes.details}>
                    <Typography variant="body2" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
                </div>
                <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.title}</Typography>
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
                </CardContent>
                <CardActions className={classes.cardActions}>
                    <Button size="small" color="primary" ><ThumbUpAltIcon fontSize="small" onClick={() => { }} /> Like {post.likeCount} </Button>
                    <Button size="small" color="primary" onClick={() => deletePost(post._id)} ><DeleteIcon fontSize="small"  /* onClick={() => deletePost(post._id)} */ /> Delete</Button>
                </CardActions>
            </Card>
        </>
    )
}
export default Post