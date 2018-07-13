exports.show_homepage = (req, res) => {
  res.status(200).json({
    message: 'Welcome to /',
    endpoints: [
      '/posts - GET, POST',
      '/posts/:postId - GET, DELETE',
      '/posts/:postId/comments - GET, POST',
      '/posts/:postId/comments/:commentId - GET, DELETE'
    ]
  })
}
