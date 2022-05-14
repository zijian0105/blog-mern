const express = require('express')
const Functions = require('../controller/posts')
const router = express.Router()

router.get('/',Functions.getPosts);
router.post('/create',Functions.createPosts);
router.delete('/delete',Functions.deletePost)
router.patch('/:postId',Functions.modifyPost)
router.get('/:postId',Functions.findPost)
module.exports = router
