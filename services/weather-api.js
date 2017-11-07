const axios = require('axios')

const ENDPOINT_URL = require('../constant').WEATHER_URL

/**
 * Get current weather detail of Thailand from Yahoo Weather API
 * @param {string} name
 * @returns {object}
 */

exports.currentWeather = async () => {
  const result = await axios.get(ENDPOINT_URL)
  return result.data
}
