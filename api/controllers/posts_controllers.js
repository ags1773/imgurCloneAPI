const Posts = require('../models/posts_model')
const mongoose = require('mongoose')

exports.posts_get_all = (req, res) => {
  Posts.find()
    .select('title imageurl description comments')
    .populate('comments')
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

exports.posts_get_one = (req, res) => {
  Posts.findById(req.params.postId)
    .populate('comments')
    .exec()
    .then(post => {
      if (post) {
        res.status(200).json(post)
      } else {
        res.status(404).json({
          message: 'Post not found!'
        })
      }
    })
    .catch(err => {
      res.status(500).json({ error: err })
    })
}

exports.posts_delete_one = (req, res) => {
  Posts.findByIdAndRemove(req.params.postId)
    .exec()
    .then(post => {
      res.status(200).json({
        message: 'Post deleted!'
      })
    })
    .catch(err => {
      res.status(500).json({ error: err })
    })
}
