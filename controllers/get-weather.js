/**
 * Get forecasting detail of country.
 */

const OpenWeatherAPI = require('../helpers/open-weather-api')
const ResponseData = require('../helpers/response-data')
const express = require('express')

const router = express.Router()

router.get('/:country', async (req, res) => {
  const data = Number(req.params.country)
    ? await OpenWeatherAPI.currentWeatherByCountryID(req.params.country)
    : await OpenWeatherAPI.currentWeatherByCountryName(req.params.country)
  res.setHeader('Content-Type', 'application/json')
  if (data) {
    res.json(ResponseData.filterData(data, 'weather', 'main', 'dt'))
  } else {
    res.status(404).send(null)
  }
})

module.exports = router
