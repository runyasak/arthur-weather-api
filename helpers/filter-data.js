const DateTime = require('./datetime')

/**
 * Get first element from array
 * @param {Array} arr array for get first element
 * @return {Data} first element of array
 */
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

/**
 * Map key as columns with rows from sqlite data
 * @param {array} columns array of columns
 * @param {array} rows array of rows
 * @returns {object} data that was mapped with columns and row
 */
const mapSqlite = (columns, rows) =>
  columns.reduce(
    (current, value, index) =>
      Object.assign(current, {
        [value]: value === 'weather_data' ? DateTime.fullFormat(rows[index]) : rows[index]
      }),
    {}
  )

/**
 * Filter sqlite data included weather_log
 * @param {object} data data from executing sql
 * @return {object} result of filtered object
 */
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

/**
 * Filter data for current response which has current_condition and weather_log as future forecast
 * @param {object} currentData
 * @param {object} futureData
 * @return {object}
 */
exports.current = (currentData, futureData) =>
  Object.assign(
    {},
    {
      success: true,
      current_condition: arrayFirst(currentData.weather_log),
      weather_log: futureData.weather_log
    }
  )

/**
 * Get filtered data from weather api for response
 * @param {object} data
 * @returns {object}
 */
exports.responseData = data =>
  Object.assign(
    {},
    {
      surccess: true,
      current_condition: data.query.results.channel.item.condition,
      weather_log: mapWeatherLog(data.query.results.channel.item.forecast)
    }
  )
