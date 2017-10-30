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

router.get('/all', (req, res) => {
  res.json(Weather.selectFromTable(tableName))
})

/**
 * Get data by year
 */

router.get('/year/:year', (req, res) => {
  res.json(Weather.selectFromTable(tableName, req.params.year))
})

/**
 * Get data by month
 */

router.get('/month/:month', (req, res) => {
  res.json(Weather.selectFromTable(tableName, req.params.month))
})

/**
 * Reset database and create a new table
 */

router.get('/reset-data', (req, res) => {
  Weather.dropAndCreateTable()
  res.json(Weather.selectFromTable(tableName))
})

/**
 * Add current weather data with date as primary key
 */

router.get('/add-current-weather', async (req, res) => {
  const currentDate = new Date()
  const weatherData = await WeatherAPI.currentWeather()
  Weather.insertForecastToTable(
    tableName,
    currentDate,
    JSON.stringify(FilterData.filter(weatherData))
  )
  res.json(Weather.selectFromTable(tableName))
})

module.exports = router
