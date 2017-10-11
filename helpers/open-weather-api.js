const axios = require('axios')

const instance = axios.create({
  baseURL: 'http://api.openweathermap.org/data/2.5/weather',
  timeout: 3000
})

/**
 * Get current weather detail by country id.
 * @param {string} id
 * @returns {object}
 */

const currentWeatherByCountryID = async (id) => {
  const result = await instance.get(`?id=${id}&APPID=${process.env.APP_ID}`)
  return result.data
}

/**
 * Get current weather detail by country name.
 * @param {string} name
 * @returns {object}
 */

const currentWeatherByCountryName = async (name) => {
  const result = await instance.get(`?q=${name}&APPID=${process.env.APP_ID}`)
  return result.data
}

module.exports = {
  currentWeatherByCountryID,
  currentWeatherByCountryName
}
