const mongoose = require('mongoose')

const postsSchema = mongoose.Schema({
  title: {type: String, required: true},
  imageurl: {type: String, required: true},
  description: {type: String, required: true}
})

module.exports = mongoose.model('Posts', postsSchema)
