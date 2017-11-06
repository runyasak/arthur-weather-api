const FilterData = require('../helpers/filter-data')
const WeatherAPI = require('../services/weather-api')
const Weather = require('../models/weather')

const express = require('express')

const router = express.Router()

/**
 * Get all data from table
 */

router.get('/history', (req, res) => {
  res.json(Weather.select())
})

/**
 * Get data by year
 */

router.get('/year/:year', (req, res) => {
  res.json(Weather.select(req.params.year))
})

/**
 * Get data by month
 */

router.get('/month/:month', (req, res) => {
  res.json(Weather.select(req.params.month))
})

/**
 * Reset database and create a new table
 */

router.get('/reset', (req, res) => {
  Weather.dropAndCreateTable()
  res.json(Weather.select())
})

/**
 * Add current weather data
 */

router.get('/add', async (req, res) => {
  const weatherData = FilterData.filter(await WeatherAPI.currentWeather())
  Weather.add(weatherData)
  res.json(Weather.select())
})

module.exports = router
