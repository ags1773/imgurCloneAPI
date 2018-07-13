const mongoose = require('mongoose')

const commentsSchema = mongoose.Schema({
  author: {type: String, required: true},
  comment: {type: String, required: true}
})

const Model = mongoose.model('Comments', commentsSchema)
exports.model = Model

exports.getAllComments = () => Model.find()
exports.createComment = (newComment) => Model.create(newComment)
exports.getComment = (id) => Model.findById(id)
exports.deleteComment = (id) => Model.findByIdAndRemove(id)
