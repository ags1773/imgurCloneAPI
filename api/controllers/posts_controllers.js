const Posts = require('../models/posts_model')
const mongoose = require('mongoose')

exports.posts_get_all = (req, res) => {
  Posts.find()
    .select('title imageurl description')
    .exec()
    .then(docs => {
      res.status(200).json({
        count: docs.length,
        posts: [...docs]
      })
    })
    .catch(err => {
      res.status(500).json({
        error: err
      })
    })
}

exports.posts_create_post = (req, res) => {
  const newPost = new Posts({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    imageurl: req.body.imageurl,
    description: req.body.description
  })
  newPost
    .save()
    .then(result => {
      res.status(201).json({
        message: 'New post created successfully',
        createdPost: newPost
      })
    })
    .catch(err => {
      res.status(500).json({
        error: err
      })
    })
}
