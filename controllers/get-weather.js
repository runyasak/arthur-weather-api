/**
 * Get forecasting detail of country.
 */

const WeatherAPI = require('../helpers/weather-api')
const DataHandler = require('../helpers/data-handler')
const express = require('express')

const router = express.Router()

/**
 * Get data with country name or country id.
 */

router.get('/:country', async (req, res) => {
  const data = Number(req.params.country)
    ? await WeatherAPI.currentWeatherByCountryID(req.params.country)
    : await WeatherAPI.currentWeatherByCountryName(req.params.country)
  res.setHeader('Content-Type', 'application/json')
  if (data) {
    res.json(DataHandler.filterData(data, 'weather', 'main', 'dt'))
  } else {
    res.status(404).send(null)
  }
})

router.get('/', async (req, res) => {
  const data = await WeatherAPI.exampleCurrentWeather()
  const filterData = Object.assign(
    {},
    {
      created: data.query.created,
      condition: data.query.results.channel.item.condition,
      forecast: data.query.results.channel.item.forecast
    }
  )
  res.setHeader('Content-Type', 'application/json')
  if (data) {
    res.json(filterData)
  } else {
    res.status(404).send(null)
  }
})

module.exports = router
