/**
 * Get forecasting detail of today.
 */

const { WeatherData } = require('../helpers')
const { WeatherAPI } = require('../services')

const express = require('express')

const router = express.Router()

router.get('/', async (req, res) => {
  const data = await WeatherAPI.currentWeather()
  const result = WeatherData.apiResponse(data)
  res.setHeader('Content-Type', 'application/json')
  if (data) {
    res.json(result)
  } else {
    res.status(404).send(null)
  }
})

module.exports = router
