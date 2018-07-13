const express = require('express')
const app = express()
const mongoose = require('mongoose')
const morgan = require('morgan') // logger
const bodyParser = require('body-parser')
const postsRoutes = require('./api/routes/posts_routes')
const commentRoutes = require('./api/routes/comment_routes')
const homeRoute = require('./api/routes/home_route')

mongoose.connect(process.env.DBURL2, { useNewUrlParser: true })

app.use(morgan('dev'))
app.use(bodyParser.json())

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, DELETE, GET')
    return res.status(200).json({})
  }
  next()
})

app.use('/', homeRoute)
app.use('/posts', postsRoutes)
app.use('/posts/:postId/comments', commentRoutes)

app.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
app.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.json({
    error: error.message
  })
})

module.exports = app
