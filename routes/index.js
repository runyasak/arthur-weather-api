const express = require('express')

const router = express.Router()

router.use('/weather', require('./api'))
router.use('/api/v1/weather', require('./data'))

module.exports = router
