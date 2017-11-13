const { APIResponse, WeatherData } = require('../formatter')
const { WeatherAPI } = require('../services')
const { Weather } = require('../sqlite-dbhelper')

/**
 * Get request data from api
 */
exports.request = async (req, res) => {
  const data = await WeatherAPI.currentWeather()
  const result = APIResponse.format(data)
  res.setHeader('Content-Type', 'application/json')
  if (data) {
    res.json(result)
  } else {
    res.status(404).send(null)
  }
}

/**
 * Get current with future data from table
 */
exports.current = async (req, res) => {
  res.json(Weather.current(new Date()))
}

/**
 * Get all data from table
 */
exports.history = async (req, res) => {
  res.json(Weather.history())
}

/**
 * Get data by year
 */
exports.byYear = (req, res) => {
  res.json(Weather.history(req.params.year))
}

/**
 * Get data by month
 */
exports.byMonth = (req, res) => {
  res.json(Weather.history(req.params.month))
}

/**
 * Reset database and create a new table
 */
exports.reset = (req, res) => {
  Weather.dropAndCreateTable()
  res.json(Weather.history())
}

/**
 * Add current weather data
 */
exports.add = async (req, res) => {
  const weatherData = WeatherData.apiResponse(await WeatherAPI.currentWeather())
  Weather.add(weatherData)
  res.json(Weather.history())
}
