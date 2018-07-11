const express = require('express')
const app = express()
const mongoose = require('mongoose')
const morgan = require('morgan') // logger
const bodyParser = require('body-parser')
const postsRoutes = require('./api/routes/posts_routes')

// mongoose.connect(`mongodb://${process.env.MLAB_ID}:${process.env.MLAB_PASSWORD}@ds013599.mlab.com:13599/devinstance1`,
//   { useNewUrlParser: true }
// )

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
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
    return res.status(200).json({})
  }
  next()
})

app.use('/posts', postsRoutes)

app.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status(404)
  next(error)
})
app.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.json({
    error: error.message
  })
})

module.exports = app
