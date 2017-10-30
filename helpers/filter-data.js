/**
 * Get filtered data from props
 * @param {object} data
 * @param {...array} props
 * @returns {object}
 */

exports.filter = data =>
  Object.assign(
    {},
    {
      created: data.query.created,
      condition: data.query.results.channel.item.condition,
      forecast: data.query.results.channel.item.forecast
    }
  )
