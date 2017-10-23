/* eslint-env jest */

const DataHandler = require('../../helpers/data-handler')

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
    const result = DataHandler.filterData(testData, 'id', 'name')
    const result2 = DataHandler.filterData(testData, 'id')
    expect(result.id).toBeDefined()
    expect(result.name).toBeDefined()
    expect(result2.id).toBeDefined()
  })
})
