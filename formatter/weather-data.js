const { ArrayUtil } = require('../helpers')

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
const mapColumnRow = (data) => {
  const records = data ? ArrayUtil.first(data) : null
  let result = []
  if (records) {
    const dataColumns = ArrayUtil.first(data).columns
    const dataRows = ArrayUtil.first(data).values
    result =
      dataRows.length > 1
        ? dataRows.reduce((acc, row) => [...acc, mapRow(dataColumns, row)], [])
        : mapRow(dataColumns, dataRows[0])
  }
  return result
}

/**
 * Success data for response
 * @param {array} weatherLog
 * @param {object} currentCondition
 */
const successData = (weatherLog, currentCondition) =>
  Object.assign(
    { success: true },
    Array.isArray(currentCondition) && currentCondition.length > 0
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
exports.format = (weatherLog, currentLog) =>
  successData(mapColumnRow(weatherLog), mapColumnRow(currentLog))
