/* eslint-env jest */

const { ArrayUtil } = require('../../helpers')

const testArr = jest.fn().mockReturnValue([1, 2, 3])

describe('#get first element of array', () => {
  it('should get first element', () => {
    expect(testArr[0]).toEqual(ArrayUtil.first(testArr))
  })
})
