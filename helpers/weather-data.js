const { ArrayUtil, DateTime } = require('.')

/**
 * Map key of weather log data
 * @param {object} data
 * @returns {array}
 */
const mapWeatherLog = data =>
  data.reduce(
    (acc, value) => [
      ...acc,
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
    (acc, value, index) =>
      Object.assign(acc, {
        [value]:
          value === 'weather_data'
            ? DateTime.format('DD MMM YYYY', rows[index])
            : rows[index]
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
      weather_log: ArrayUtil.first(data)
        ? ArrayUtil.first(data).values.reduce(
            (acc, value) => [
              ...acc,
              mapSqlite(ArrayUtil.first(data).columns, value)
            ],
            []
          )
        : []
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
      current_condition: ArrayUtil.first(currentData.weather_log),
      weather_log: futureData.weather_log
    }
  )

/**
 * Get filtered data from weather api for response
 * @param {object} data
 * @returns {object}
 */
exports.apiResponse = data =>
  Object.assign(
    {},
    {
      surccess: true,
      current_condition: data.query.results.channel.item.condition,
      weather_log: mapWeatherLog(data.query.results.channel.item.forecast)
    }
  )
