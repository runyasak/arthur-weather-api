const axios = require('axios')

const endpointURL = 'http://api.openweathermap.org/data/2.5/weather'

/**
 * Get current weather detail by country id
 * @param {string} id
 * @returns {object}
 */

exports.currentWeatherByCountryID = async (id) => {
  const result = await axios.get(`${endpointURL}?id=${id}&APPID=${process.env.APP_ID}`)
  return result.data
}

/**
 * Get current weather detail by country name
 * @param {string} name
 * @returns {object}
 */

exports.currentWeatherByCountryName = async (name) => {
  const result = await axios.get(`${endpointURL}?q=${name}&APPID=${process.env.APP_ID}`)
  return result.data
}
