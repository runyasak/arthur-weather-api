const format = require('date-fns/format')

/**
 * Get format of date as MM/DD/YYYY
 * @param {Date} inputDate
 */

exports.getDate = inputDate =>
  (inputDate ? format(inputDate, 'MM/DD/YYYY') : format(new Date(), 'MM/DD/YYYY'))
