const mongoose = require('mongoose')
const postSchema = mongoose.Schema({
    title:String,
    massage: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likeCount:{
        type: Number,
        default: 0
    },
    createDate: {
        type: Date,
        default: new Date()
    }
})
module.exports = mongoose.model('postMessage',postSchema)