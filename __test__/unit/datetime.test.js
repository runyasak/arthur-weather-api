const { DateTime } = require('../../helpers')

/**
 * Using UTC date format for api
 */
const currentDate = new Date()
const currentDateISOFormat = `${currentDate.getFullYear()}-${currentDate.getMonth() +
  1}-${`0${currentDate.getDate()}`.slice(-2)}`
const currentDateLongFormat = `${`0${currentDate.getDate()}`.slice(-2)} ${currentDate
  .toLocaleString('en-us', { month: 'long' })
  .substring(0, 3)} ${currentDate.getFullYear()}`
const testDate = new Date('2017-11-11')
const testDateISOFormat = '2017-11-11'
const testDateLongFormat = '11 Nov 2017'

describe('#get date format', () => {
  it('should get date from testDate with assigned format', () => {
    const resultISODate = DateTime.format('YYYY-MM-DD', testDate)
    const resultLongDate = DateTime.format('DD MMM YYYY', testDate)
    expect(testDateISOFormat).toEqual(resultISODate)
    expect(testDateLongFormat).toEqual(resultLongDate)
  })
  it('should get current date with assigned format', () => {
    const resultISODate = DateTime.format('YYYY-MM-DD')
    const resultLongDate = DateTime.format('DD MMM YYYY')
    expect(currentDateISOFormat).toEqual(resultISODate)
    expect(currentDateLongFormat).toEqual(resultLongDate)
  })
})
