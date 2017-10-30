const axios = require('axios')

const ENDPOINT_URL =
  'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22bangkok%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys'

/**
 * Get current weather detail of Thailand from Yahoo Weather API
 * @param {string} name
 * @returns {object}
 */

exports.currentWeather = async () => {
  const result = await axios.get(ENDPOINT_URL)
  return result.data
}
