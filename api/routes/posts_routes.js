const express = require('express')
const router = express.Router()
const PostsControllers = require('../controllers/posts_controllers')

router.get('/', PostsControllers.posts_get_all)
router.post('/', PostsControllers.posts_create_post)
router.get('/:postId', PostsControllers.posts_get_one) // populate comments remaining
router.delete('/:postId', PostsControllers.posts_delete_one)

// --------- TEMP ---------------
// router.post('/:id', function (req, res) {
//   const newComment = new Comments({
//     author: req.body.author,
//     comment: req.body.comment
//   })
//   newComment
//     .save()
//     .then(savedComment => {
//       Posts.findById(req.params.id, function (err, foundPost) {
//         if (err) {
//           // delete savedComment??
//           return res.send(500).json({
//             message: `Post not found for id ${req.params.id}`
//           })
//         } else {
//           foundPost.comments.push(savedComment)
//         }
//       })
//     })
//     .catch(err => res.status(500).json({error: err}))
// })
// -----------------------------

module.exports = router
