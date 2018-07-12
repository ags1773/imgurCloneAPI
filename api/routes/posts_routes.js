const express = require('express')
const router = express.Router()
const PostsControllers = require('../controllers/posts_controllers')

router.get('/', PostsControllers.posts_get_all)
router.post('/', PostsControllers.posts_create_post)
router.get('/:postId', PostsControllers.posts_get_one) // populate comments remaining
router.delete('/:postId', PostsControllers.posts_delete_one)

module.exports = router
