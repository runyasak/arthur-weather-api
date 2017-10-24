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

/**
 * Get example current weather detail from Yahoo Weather API
 * @param {string} name
 * @returns {object}
 */

exports.exampleCurrentWeather = async () => {
  const result = await axios.get('https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22nome%2C%20ak%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys')
  return result.data
}
