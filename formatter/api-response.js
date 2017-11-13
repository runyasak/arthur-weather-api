/**
 * Map key of weather log data from api response
 * @param {object} data
 * @returns {array}
 */
const mapWeatherLog = data =>
  data.reduce(
    (acc, value) => [
      ...acc,
      Object.keys(value).reduce(
        (objAcc, key) => Object.assign(objAcc, { [`weather_${key}`]: value[key] }),
        {}
      )
    ],
    []
  )

/**
 * Get filtered data from weather api for response
 * @param {object} data
 * @returns {object}
 */
exports.format = data =>
  Object.assign(
    {},
    {
      success: true,
      current_condition: data.query.results.channel.item.condition,
      weather_log: mapWeatherLog(data.query.results.channel.item.forecast)
    }
  )
