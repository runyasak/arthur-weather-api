const { ArrayUtil } = require('.')

/**
 * Map key of weather log data from api
 * @param {object} data
 * @returns {array}
 */
const mapWeatherLogAPI = data =>
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
 * Map key as columns with rows
 * @param {array} columns array of columns
 * @param {array} rows array of rows
 * @returns {object} data that was mapped with columns and row
 */
const mapRow = (columns, row) =>
  columns.reduce((acc, value, index) => Object.assign(acc, { [value]: row[index] }), {})

/**
 * Map sqlite data values
 * @param {obj} columns array of columns
 * @returns {Array} data that was mapped with columns and row
 */
const mapColumnRow = data =>
  (data && ArrayUtil.first(data)
    ? ArrayUtil.first(data).values.reduce(
      (acc, row) => [...acc, mapRow(ArrayUtil.first(data).columns, row)],
      []
    )
    : [])

/**
 * Success data for response
 * @param {array} weatherLog
 * @param {object} currentCondition
 */
const successData = (weatherLog, currentCondition) =>
  Object.assign(
    { success: true },
    currentCondition
      ? {
        current_condition: currentCondition,
        weather_log: weatherLog
      }
      : { weather_log: weatherLog }
  )

/**
 * Filter sqlite data included weather_log
 * @param {object} data data from executing sql
 * @return {object} result of success object
 */
exports.mapSqlite = (weatherLog, currentLog) =>
  successData(mapColumnRow(weatherLog), mapColumnRow(currentLog))

/**
 * Get filtered data from weather api for response
 * @param {object} data
 * @returns {object}
 */
exports.apiResponse = data =>
  successData(
    mapWeatherLogAPI(data.query.results.channel.item.forecast),
    data.query.results.channel.item.condition
  )
