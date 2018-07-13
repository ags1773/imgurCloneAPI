const express = require('express')
const router = express.Router()
const HomepageControllers = require('../controllers/homepage_controllers')

router.all('/', HomepageControllers.show_homepage)

module.exports = router
