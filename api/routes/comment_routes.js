const express = require('express')
const router = express.Router({mergeParams: true}) // to get postsID from parent router
const CommentsControllers = require('../controllers/comments_controllers')

router.get('/', CommentsControllers.comments_get_all)
router.post('/', CommentsControllers.comments_create_comment)
router.delete('/:commentId', CommentsControllers.comments_delete_comment)
router.get('/:commentId', CommentsControllers.comments_get_one)

module.exports = router
