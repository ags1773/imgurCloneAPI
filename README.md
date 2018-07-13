# imgurCloneAPI
API to get Image posts, add comments

To run: 
  - add your mongodb URI in an env variable called DBURL2
  - npm start

Endpoints:
  /posts - GET, POST
  /posts/:postId - GET, DELETE
  /posts/:postId/comments - GET, POST
  /posts/:postId/comments/:commentId - GET, DELETE