const express = require('express')
const Weather = require('../models/weather')

const router = express.Router()
const tableName = 'arthur_weather'

router.get('/get-all-Data', (req, res) => {
  res.json(Weather.selectFromTable(tableName))
})

router.get('/reset-data', (req, res) => {
  Weather.dropAndCreateTable()
  res.send('table is reset!')
})

router.get('/add-current-weather', (req, res) => {
  Weather.insertForecastToTable(tableName, '22', 'eiei')
  res.send('data is inserted!')
})

module.exports = router
