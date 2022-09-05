const express = require('express');
const router = express.Router();
const {getposts,createPost,updatePost,deletePost,likePost} = require('../controllers/posts')
const auth = require('../middleware/auth')

router.get('/', getposts);
router.post('/',auth,createPost)
router.put('/:id',auth, updatePost)
router.delete('/:id',auth, deletePost)
router.put('/:id/likePost',auth, likePost )
module.exports=router;