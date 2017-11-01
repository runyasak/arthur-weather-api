const format = require('date-fns/format')

/**
 * Object of month from date format
 */
const monthObj = {
  Jan: 1,
  Feb: 2,
  Mar: 3,
  Apr: 4,
  May: 5,
  Jun: 6,
  Jul: 7,
  Aug: 8,
  Sep: 9,
  Oct: 10,
  Nov: 11,
  Dec: 12
}

/**
 * Return month from format date
 * @param {string} formatDate DD MMM YYYY, such as 01 Jan 2017
 * @return {number} number of month
 */
exports.month = formatDate => monthObj[formatDate.split(' ')[1]]

/**
 * Return year from format date
 * @param {string} formatDate DD MMM YYYY, such as 01 Jan 2017
 * @return {number} number of year
 */
exports.year = formatDate => formatDate.split(' ')[2]

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
