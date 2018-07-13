const Comments = require('../models/comments_model')
const Posts = require('../models/posts_model')

exports.comments_get_all = (req, res) => {
  Posts.findById(req.params.postId)
    .populate('comments')
    .exec()
    .then(foundPost => {
      if (!foundPost) return res.status(404).json({ message: `Post with ID ${req.params.postId} not found!` })
      res.status(200).json({
        commentCount: foundPost.comments.length,
        comments: [...foundPost.comments].map(doc => {
          return {
            _id: doc._id,
            author: doc.author,
            comment: doc.comment
          }
        })
      })
    })
    .catch(err => res.status(500).json({ error: err }))
}

exports.comments_create_comment = (req, res) => {
  // // find post, if exists, create new comment and push it into the post
  Posts.findById(req.params.postId)
    .exec()
    .then(post => {
      if (!post) return res.status(404).json({ message: 'Post not found!' })
      const newComment = new Comments({
        author: req.body.author,
        comment: req.body.comment
      })
      Comments.create(newComment)
        .then(createdComment => {
          post.comments.push(createdComment)
          return post.save()
        })
        .then(saved => res.status(201).json({ message: 'Successfully created new comment' }))
        .catch(err => res.status(500).json({ error: err }))
    })
    .catch(err => res.status(500).json({ error: err }))
}

exports.comments_get_one = (req, res) => {
  // // Find post - If post exists, find if given comment is part of it - if yes, return that comment
  Posts.findById(req.params.postId)
    .exec()
    .then(post => {
      if (!post) throw new Error('Post not found!') // how to send status(404) with Error??
      // if (!post) return res.status(404).json({ message: 'Post not found!' })
      if (post.comments.indexOf(req.params.commentId) === -1) {
        throw new Error('Comment not found on given post')
        // return res.status(404).json({ message: 'Comment not found on given post' })
      }
      return Comments.findById(req.params.commentId).exec()
    })
    .then(comment => {
      let formattedComment = {
        _id: comment._id,
        author: comment.author,
        comment: comment.comment
      }
      res.status(200).json(formattedComment)
    })
    .catch(err => {
      res.status(500).json({ error: err.message })
    })
}

exports.comments_delete_comment = (req, res) => {
  Posts.findById(req.params.postId)
    .exec()
    .then(post => {
      if (!post) throw new Error('Post not found!')
      if (post.comments.indexOf(req.params.commentId) === -1) {
        throw new Error('Comment not found on given post')
      }
      return Comments.findByIdAndRemove(req.params.commentId).exec()
    })
    .then(result => res.status(200).json({
      message: 'Comment deleted successfully!',
      result: result
    }))
    .catch(err => {
      res.status(500).json({ error: err.message })
    })
}
