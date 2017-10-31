/**
 * Data Sqlite Controller
 */
const FilterData = require('../helpers/filter-data')
const WeatherAPI = require('../services/weather-api')
const Weather = require('../models/weather')

const express = require('express')

const router = express.Router()
const tableName = 'arthur_weather'

/**
 * Get all data from table
 */

router.get('/history', (req, res) => {
  res.json(Weather.select(tableName))
})

/**
 * Get data by year
 */

router.get('/year/:year', (req, res) => {
  res.json(Weather.select(tableName, req.params.year))
})

/**
 * Get data by month
 */

router.get('/month/:month', (req, res) => {
  res.json(Weather.select(tableName, req.params.month))
})

/**
 * Reset database and create a new table
 */

router.get('/reset', (req, res) => {
  Weather.dropAndCreateTable()
  res.json(Weather.select(tableName))
})

/**
 * Add current weather data
 */

router.get('/add', async (req, res) => {
  const currentDate = new Date()
  const weatherData = FilterData.filter(await WeatherAPI.currentWeather())
  Weather.insert(tableName, currentDate, weatherData)
  res.json(Weather.select(tableName))
})

module.exports = router
