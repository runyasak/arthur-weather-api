const moment = require('moment-timezone')

/**
 * Format date as input format
 * @param {string} inputFormat
 * @param {Date} inputDate
 * @return {Date}
 */
exports.format = (inputFormat, inputDate) =>
  moment(inputDate ? new Date(inputDate) : new Date())
    .tz('Asia/Bangkok')
    .format(inputFormat)

/**
 * Add day from date
 * @param {Date} inputDate
 * @param {number} day number of day for adding
 * @return {Date}
 */
exports.addDay = (inputDate, day) =>
  moment(new Date(inputDate))
    .add(day, day > 1 ? 'days' : 'day')
    .format(moment(inputDate).creationData().format)

/**
 * Check input time is year or month
 * @param {Date} inputTime
 * @return {boolean}
 */
exports.isYear = time => Number(time) > 12
