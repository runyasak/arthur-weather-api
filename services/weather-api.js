const axios = require('axios')

const { WEATHER_URL } = require('../config')

/**
 * Get current weather detail of Thailand from Yahoo Weather API
 * @param {string} name
 * @returns {object}
 */

exports.currentWeather = async () => {
  const result = await axios.get(WEATHER_URL)
  return result.data
}
