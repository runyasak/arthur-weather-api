/**
 * Data Sqlite Controller
 */

const express = require('express')
const Weather = require('../models/weather')

const router = express.Router()
const tableName = 'arthur_weather'

/**
 * Get all data from table
 */

router.get('/get-all-Data', (req, res) => {
  res.json(Weather.selectFromTable(tableName))
})

/**
 * Reset database and create a new table
 */

router.get('/reset-data', (req, res) => {
  Weather.dropAndCreateTable()
  res.send('table is reset!')
})

/**
 * Add current weather data with date as primary key
 */

router.get('/add-current-weather', (req, res) => {
  Weather.insertForecastToTable(tableName, '55', 'iiiii')
  res.send('data is inserted!')
})

module.exports = router
