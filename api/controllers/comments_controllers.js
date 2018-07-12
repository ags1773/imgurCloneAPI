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
  // // find post; add comment to it

  // Posts.findById(req.params.postId)
  //   .exec()
  //   .then(foundPost => {
  //     if (!foundPost) return res.status(404).json({ message: `Post with ID ${req.params.postId} not found!` })
  //     const newComment = new Comments({
  //       author: req.body.author,
  //       comment: req.body.comment
  //     })
  //     return Comments.create(newComment)
  //   })
  //   .then(obj => {
  //     res.status(200).json({
  //       newMessage: obj
  //     })
  //     // obj.b.comments.push(obj.a)
  //     // return obj.b.save()
  //   })
  //   .then((result) => {
  //     res.status(201).json({
  //       message: 'Comment saved',
  //       result: result
  //     })
  //   })
  //   .catch(err => res.status(500).json({ error: err }))

  Posts.findById(req.params.postId, (err, foundPost) => {
    if (err) res.status(500).json({ error: err })
    const newComment = new Comments({
      author: req.body.author,
      comment: req.body.comment
    })
    Comments.create(newComment, (err, createdComment) => {
      if (err) res.status(500).json({ error: err })
      foundPost.comments.push(createdComment)
      foundPost.save((err) => {
        if (err) res.status(500).json({ error: err })
        res.status(201).json({
          message: 'Comment saved successfully for postId : ' + req.params.postId
        })
      })
    })
  })
}

exports.comments_delete_comment = (req, res) => {
  Posts.findById(req.params.postId)
    // .populate('comments')
    .exec()
    .then(foundPost => {
      if (!foundPost) return res.status(404).json({ message: `Post with ID ${req.params.postId} not found!` })
      return Comments.findById(req.params.commentId).exec()
    })
    .then(foundComment => {
      Comments.findByIdAndRemove(foundComment._id).exec()
    })
    .then(() => {
      res.status(200).json({
        message: 'Comment Deleted successfully!'
      })
    })
    .catch(err => res.status(500).json({ error: err }))
}

// exports.comments_delete_comment = (req, res) => {
//   Posts.findById(req.params.postId)
//     .exec()
//     .then(foundPost => {
//       if (foundPost.comments.indexOf(req.params.commentId) === -1) {
//         res.status(404).json({ error: 'Comment not found for given post' })
//         return
//       }
//       return Comments.findByIdAndRemove(req.params.commentId).exec()
//     })
//     .then(() => {
//       res.status(200).json({
//         message: 'Comment Deleted'
//       })
//     })
//     .catch(err => res.status(500).json({ error: err }))
// }

exports.comments_get_one = (req, res) => {
  // Posts.findById(req.params.postId, (err, foundPost) => {
  //   if (err) return res.status(500).json({ error: err })
  //   if (foundPost.comments.indexOf(req.params.commentId) === -1) {
  //     return res.status(404).json({ error: 'Comment not found for given post' })
  //   }
  //   Comments.findById(req.params.commentId, (err, foundComment) => {
  //     if (err) res.status(500).json({ error: err })
  //     res.status(200).json(foundComment)
  //   })
  // })
  Posts.findById(req.params.postId)
    .exec()
    .then(foundPost => {
      if (foundPost.comments.indexOf(req.params.commentId) === -1) {
        // res.status(404).json({ error: 'Comment not found for given post' })
        throw new Error('Comment not found for given post')
      }
      return Comments.findById(req.params.commentId).exec().catch(err => console.log(err))
    }, err => {
      // console.log(err)
      res.status(404).json({error: err})
    })
    .then(foundComment => {
      console.log(' ......', foundComment)
      if (!foundComment) {
        throw new Error('Comment not found')
      }
      res.status(200).json(foundComment).catch(err => console.log(err))
    }, err => {
      // console.log('>>>>>.', err)
      res.status(404).json({error: err})
    })
    .catch(err => res.status(404).json({error: err}))
  // ----------------- DNC --------------------
  // Posts.findById(req.params.postId)
  //   .exec()
  //   .then(foundPost => {
  //     if (foundPost.comments.indexOf(req.params.commentId) === -1) {
  //       res.status(404).json({ error: 'Comment not found for given post' })
  //     }
  //     throw 'ee '
  //     return Comments.findById(req.params.commentId).exec().catch(err => console.log(err))
  //   }, err => console.log(err)
  //   )
  //   .then(foundComment => {
  //     console.log(' ......', foundComment)
  //     if (!foundComment) {
  //       res.status(404).json({ error: 'Comment not found' })
  //       return
  //     }
  //     res.status(200).json(foundComment).catch(err => console.log(err))
  //   }, err => console.log('>>>>>.', err)
  //   )
  //   .catch(err => console.log(err))
  // -------------------------------------------
}
