/**
 * Map key of weather log data
 * @param {object} data
 * @returns {array}
 */

const mapWeatherLog = data =>
  data.reduce(
    (current, value) => [
      ...current,
      {
        weather_code: value.code,
        weather_data: value.date,
        weather_high: value.high,
        weather_low: value.low,
        weather_text: value.text
      }
    ],
    []
  )

/**
 * Get filtered data for necessary use
 * @param {object} data
 * @returns {object}
 */

exports.filter = data =>
  Object.assign(
    {},
    {
      surccess: true,
      current_condition: data.query.results.channel.item.condition,
      weather_log: mapWeatherLog(data.query.results.channel.item.forecast)
    }
  )
