const mongoose = require('mongoose')

const postsSchema = mongoose.Schema({
  title: {type: String, required: true},
  imageurl: {type: String, required: true},
  description: {type: String, required: true},
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comments'
  }]
})

const Model = mongoose.model('Posts', postsSchema)
exports.model = Model

exports.getAllPosts = () => Model.find()
exports.getPost = (id) => Model.findById(id)
exports.deletePost = (id) => Model.findByIdAndRemove(id)
exports.savePost = (newPost) => newPost.save()
