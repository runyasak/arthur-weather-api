const moment = require('moment')

/**
 * Return month from format date
 * @param {string} formatDate DD MMM YYYY, such as 01 Jan 2017
 * @return {number} number of month
 */
exports.month = formatDate => new Date(formatDate.replace('ICT', '(ICT)')).getMonth() + 1

/**
 * Return year from format date
 * @param {string} formatDate DD MMM YYYY, such as 01 Jan 2017
 * @return {number} number of year
 */
exports.year = formatDate => new Date(formatDate.replace('ICT', '(ICT)')).getFullYear()

/**
 * Return date from format date
 * @param {string} formatDate DD MMM YYYY, such as 01 Jan 2017
 * @return {number} number of year
 */
exports.date = formatDate => new Date(formatDate.replace('ICT', '(ICT)')).getDate()

/**
 * Convert format for sqlite as YYYY-MM-DD
 * @param {Date} inputDate
 * @return {string}
 */
exports.format = inputDate => moment(inputDate).format('YYYY-MM-DD')

/**
 * Convert full format for response data as DD MMM YYYY
 * @param {Date} inputDate
 * @return {string}
 */
exports.fullFormat = inputDate => moment(inputDate).format('DD MMM YYYY')

/**
 * Check input time is year or month
 * @param {Date} inputTime
 * @return {boolean}
 */
exports.isYear = time => Number(time) > 12
