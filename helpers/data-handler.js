exports.filterData = (data, ...props) =>
  props.reduce((acc, prop) => Object.assign(acc, { [prop]: data[prop] }), {})
