const Comments = require('../models/comments_model')

exports.comments_get_all = (req, res) => {
  res.status(200).json({
    message: `Hit POST for postId = ${req.params.postId}`
  })
}
