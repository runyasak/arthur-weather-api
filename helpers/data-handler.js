/**
 * Get filtered data from props
 * @param {object} data
 * @param {...array} props
 * @returns {object}
 */

exports.filterData = (data, ...props) =>
  props.reduce((acc, prop) => Object.assign(acc, { [prop]: data[prop] }), {})
