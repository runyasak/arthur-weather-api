const format = require('date-fns/format')

/**
 * Get format of date as MM/DD/YYYY
 * @param {Date} inputDate
 */

exports.format = inputDate =>
  (inputDate ? format(inputDate, 'YYYY/MM/DD') : format(new Date(), 'YYYY/MM/DD'))

exports.isYear = time => Number(time) > 12
