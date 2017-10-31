/**
 * Get forecasting detail of today.
 */

const FilterData = require('../helpers/filter-data')
const WeatherAPI = require('../services/weather-api')

const express = require('express')

const router = express.Router()

router.get('/', async (req, res) => {
  const data = await WeatherAPI.currentWeather()
  const filterData = FilterData.filter(data)
  res.setHeader('Content-Type', 'application/json')
  if (data) {
    res.json(filterData)
  } else {
    res.status(404).send(null)
  }
})

module.exports = router
