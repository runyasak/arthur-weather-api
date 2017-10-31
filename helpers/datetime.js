const format = require('date-fns/format')

/**
 * Get format of date as MM/DD/YYYY
 * @param {Date} inputDate
 * @return {string}
 */

exports.format = inputDate =>
  (inputDate ? format(inputDate, 'YYYY/MM/DD') : format(new Date(), 'YYYY/MM/DD'))

/**
 * Check input time is year or month
 * @param {Date} inputTime
 * @return {boolean}
 */
exports.isYear = time => Number(time) > 12
