/**
 * Get forecasting detail of country.
 */

const OpenWeather = require('../helpers/open-weather')
const DataHandler = require('../helpers/data-handler')
const express = require('express')

const router = express.Router()

/**
 * Get data with country name or country id.
 */

router.get('/:country', async (req, res) => {
  const data = Number(req.params.country)
    ? await OpenWeather.currentWeatherByCountryID(req.params.country)
    : await OpenWeather.currentWeatherByCountryName(req.params.country)
  res.setHeader('Content-Type', 'application/json')
  if (data) {
    res.json(DataHandler.filterData(data, 'weather', 'main', 'dt'))
  } else {
    res.status(404).send(null)
  }
})

module.exports = router
