/* eslint-env jest */

const OpenWeatherAPI = require('../../helpers/open-weather-api')
const MockOpenWeatherAPI = require('../mock/open-weather-api')

const countryID = 1608132

process.env.APP_ID = 'test123'

describe('#get currentWeatherByCountry ID/Name of Thailand using async/await', () => {
  it('should get current weather data by ID', async () => {
    MockOpenWeatherAPI.successResponse()
    const result = await OpenWeatherAPI.currentWeatherByCountryID(countryID)
    expect(result).toBeDefined()
    expect(result.id).toEqual(countryID)
  })
})
