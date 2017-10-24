/**
 * Data Sqlite Controller
 */

const express = require('express')
const FormatDate = require('../helpers/format-date')
const WeatherAPI = require('../helpers/weather-api')
const DataHandler = require('../helpers/data-handler')

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
  res.json(Weather.selectFromTable(tableName))
})

/**
 * Add current weather data with date as primary key
 */

router.get('/add-current-weather', async (req, res) => {
  const currentDate = await FormatDate.getDate()
  const weatherData = await WeatherAPI.currentWeatherByCountryName('Thailand')
  Weather.insertForecastToTable(
    tableName,
    currentDate,
    JSON.stringify(DataHandler.filterData(weatherData, 'weather', 'main', 'dt'))
  )
  res.json(Weather.selectFromTable(tableName))
})

/**
 * Add example weather data from Yahoo with date as primary key
 */

router.get('/add-example-weather', async (req, res) => {
  const weatherData = await WeatherAPI.exampleCurrentWeather()
  const filterData = Object.assign(
    {},
    {
      created: weatherData.query.created,
      condition: weatherData.query.results.channel.item.condition,
      forecast: weatherData.query.results.channel.item.forecast
    }
  )
  Weather.insertForecastToTable(tableName, new Date(), JSON.stringify(filterData))
  res.json(Weather.selectFromTable(tableName))
})

module.exports = router
