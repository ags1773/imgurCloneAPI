const postsModel = require('../models/posts_model')
const Posts = postsModel.model

exports.posts_get_all = (req, res) => {
  postsModel.getAllPosts()
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
    title: req.body.title,
    imageurl: req.body.imageurl,
    description: req.body.description
  })
  postsModel.savePost(newPost)
    .then(() => {
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
  postsModel.getPost(req.params.postId)
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
  postsModel.deletePost(req.params.postId)
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
