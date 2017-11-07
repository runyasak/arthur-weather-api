const moment = require('moment')

/**
 * Convert date format as input format
 * @param {string} inputFormat
 * @param {Date} inputDate
 * @return {Date}
 */
exports.format = (inputFormat, inputDate) =>
  moment(inputDate ? new Date(inputDate) : new Date()).format(inputFormat)

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
