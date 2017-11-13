/* eslint-env jest */

const { API_RESPONSE, CURRENT_LOG, WEATHER_LOG } = require('../mock')
const { APIResponse, WeatherData } = require('../../formatter')

describe('#get filtered data from weather api', () => {
  it('should get mapped api response data', () => {
    const result = APIResponse.format(API_RESPONSE)
    expect(result.success).toBeTruthy()
    expect(result.current_condition).toBeDefined()
    expect(result.weather_log).toBeDefined()
  })
})

describe('#get mapped data from sqlite', () => {
  it('should get weather log', () => {
    const result = WeatherData.format(WEATHER_LOG)
    expect(result.success).toBeTruthy()
    expect(result.current_condition).not.toBeDefined()
    expect(result.weather_log).toBeDefined()
  })
  it('should get current and weather log', () => {
    const result = WeatherData.format(WEATHER_LOG, CURRENT_LOG)
    expect(result.success).toBeTruthy()
    expect(result.current_condition).toBeDefined()
    expect(result.weather_log).toBeDefined()
  })
})
