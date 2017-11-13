/* eslint-env jest */

const { WeatherAPI } = require('../../services')
const { WeatherData } = require('../../helpers')

describe('#get filtered data from weather api', () => {
  it('should get mapped api response data', async () => {
    const responseData = await WeatherAPI.currentWeather()
    console.log(responseData)
    const result = WeatherData.apiResponse(responseData)
    expect(result.success).toBeTruthy()
    expect(result.current_condition).toBeDefined()
    expect(result.weather_log).toBeDefined()
  })
})
