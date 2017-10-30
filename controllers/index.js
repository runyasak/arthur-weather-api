const express = require('express')

const router = express.Router()

router.use('/weather', require('./weather-manager'))
router.use('/data', require('./data-sqlite'))

module.exports = router
