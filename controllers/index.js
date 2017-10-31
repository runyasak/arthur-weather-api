const express = require('express')

const router = express.Router()

router.use('/weather', require('./weather-controller'))
router.use('/api/v1/weather', require('./data-controller'))

module.exports = router
