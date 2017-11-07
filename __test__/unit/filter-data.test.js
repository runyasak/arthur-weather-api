/* eslint-env jest */

const { WeatherData } = require('../../helpers')

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
    const result = WeatherData.filterData(testData, 'id', 'name')
    const result2 = WeatherData.filterData(testData, 'id')
    expect(result.id).toBeDefined()
    expect(result.name).toBeDefined()
    expect(result2.id).toBeDefined()
  })
})
