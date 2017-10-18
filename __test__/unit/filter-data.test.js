/* eslint-env jest */

const ResponseData = require('../../helpers/response-data')

let testData = {}

beforeAll(() => {
  testData = {
    id: 1,
    name: 'John',
    age: 22
  }
})

describe('#get filtered data', () => {
  it('should get data that was filtered from assigned properties', () => {
    const result = ResponseData.filterData(testData, 'id', 'name')
    const result2 = ResponseData.filterData(testData, 'id')
    expect(result.id).toBeDefined()
    expect(result.name).toBeDefined()
    expect(result2.id).toBeDefined()
  })
})
