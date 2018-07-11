const mongoose = require('mongoose')
// const comments = require('./comments_model')

const postsSchema = mongoose.Schema({
  title: {type: String, required: true},
  imageurl: {type: String, required: true},
  description: {type: String, required: true},
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comments'
  }]
})

module.exports = mongoose.model('Posts', postsSchema)
