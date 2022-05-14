const postSchema = require('../models/postMessages')
const getPosts = async(req,res)=>{
    try {
        const postmessage = await postSchema.find()
        console.log(postmessage)
        res.status(200).json(postmessage)
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

const createPosts = async (req,res)=>{
    const post = req.body
    res.send(post)
    const newPost = new postSchema(post)
        try {
        await newPost.save()

    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

const deletePost = async (req,res) =>{
    try {
        const id = req.body._id
        const pos = await postSchema.remove({ _id: id })
        res.send(pos)
    }
    catch (e) {
        res.send("not found")
    }
}

const modifyPost = async(req,res) =>{
    try {
        const pos = await postSchema.updateOne({ _id: req.params.postId }, {
            $set: {
                title: req.body.title,
                creator : req.body.creator,
                tags: req.body.tags,
                selectedFile: req.body.selectedFile
            }
        })
        res.send(pos)
    }
    catch (e) {
        res.send("not found")
    }
}
const findPost =  async (req, res) => {
    try {
        const posts = await postSchema.findById(req.params.postId)
        res.send(posts)
    }
    catch (e) {
        res.send("not found")
    }
}
module.exports = {getPosts,createPosts,deletePost,modifyPost,findPost}
