const arrayFirst = arr => arr[0]

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

const mapSqlite = (columns, rows) =>
  columns.reduce((current, value, index) => Object.assign(current, { [value]: rows[index] }), {})

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

exports.sqlite = data =>
  Object.assign(
    {},
    {
      surccess: true,
      weather_log: arrayFirst(data).values.reduce(
        (current, value, index) => [
          ...current,
          mapSqlite(arrayFirst(data).columns, arrayFirst(data).values[index])
        ],
        []
      )
    }
  )
