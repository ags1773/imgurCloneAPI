const mongoose = require('mongoose')

const commentsSchema = mongoose.Schema({
  author: {type: String, required: true},
  comment: {type: String, required: true}
})

module.exports = mongoose.model('Comments', commentsSchema)
