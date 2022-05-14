import React, { useEffect,useState } from "react";
import { Container, AppBar, Typography, Grow, Grid } from '@mui/material'
import Posts from './components/Posts/posts'
import Form from './components/Form/form'
import memories from './images/memories.png'
import useStyles from './styles'

const App = () => {
    const classes = useStyles()
    const [currentId, setCurrentId] = useState(0);
    const [currentId2, setCurrentId2] = useState(0);
    return (
        <>
            <Container maxWidth='lg'>
                <AppBar className={classes.appBar} position="static" color="inherit"  >
                    <Typography className={classes.heading} variant="h3" align="center">Memories</Typography>
                    <img className={classes.image} src={memories} alt="memories" height="50" />
                </AppBar>
                <Grow in>
                    <Container>
                        <Grid container justify="space-between" alignItems="stretch" spacing={3}>
                            <Grid item xs={12} sm={7}>
                                <Posts setCurrentId={setCurrentId} setCurrentId2={setCurrentId2}></Posts>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Form currentId={currentId} setCurrentId={setCurrentId}></Form>
                            </Grid>

                        </Grid>
                    </Container>
                </Grow>
            </Container>
        </>
    )
}
export default App