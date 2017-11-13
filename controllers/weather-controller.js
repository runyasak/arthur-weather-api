const { APIResponse } = require('../helpers')
const { WeatherAPI } = require('../services')

/**
 * Get request data from api
 */
exports.request = async (req, res) => {
  const data = await WeatherAPI.currentWeather()
  const result = APIResponse.mapResponse(data)
  res.setHeader('Content-Type', 'application/json')
  if (data) {
    res.json(result)
  } else {
    res.status(404).send(null)
  }
}
