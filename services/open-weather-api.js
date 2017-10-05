/**
 * Get forecasting detail of country.
 */

const axios = require('axios')

/**
 * Get current weather detail by country id.
 * @param {string} id
 * @returns {object}
 */
const currentWeatherByCountryID = async (id) => {
  const fullUrl = `http://api.openweathermap.org/data/2.5/weather?id=${id}&APPID=${process.env
    .APP_ID}`
  const result = await axios.get(fullUrl).catch(err => err)
  return result.data
}

/**
 * Get current weather detail by country name.
 * @param {string} name
 * @returns {object}
 */
const currentWeatherByCountryName = async (name) => {
  const fullUrl = `http://api.openweathermap.org/data/2.5/weather?q=${name}&APPID=${process.env
    .APP_ID}`
  const result = await axios.get(fullUrl).catch(err => err)
  return result.data
}

module.exports = {
  currentWeatherByCountryID,
  currentWeatherByCountryName,
}
