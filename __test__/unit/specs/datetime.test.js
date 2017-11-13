/* eslint-env jest */

const { DateTime } = require('../../../helpers')

describe('#get check isYear', () => {
  it('should get true if the input is year', () => {
    const year = 2017
    expect(DateTime.isYear(year)).toBeTruthy()
  })
  it('should get false if the input is month', () => {
    const month = 11
    expect(DateTime.isYear(month)).not.toBeTruthy()
  })
})
