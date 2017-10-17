/* eslint-env jest */
const axios = require('axios')
const MockAdapter = require('axios-mock-adapter')
const OpenWeatherAPI = require('../helpers/open-weather-api')

const countryID = 1608132

process.env.APP_ID = 'test123'

describe('#get currentWeatherByCountry ID/Name of Thailand using async/await', () => {
  it('should get current weather data by ID', async () => {
    /* eslint-disable */
    const mock = new MockAdapter(axios)
    /* eslint-enable */
    mock
      .onGet(`http://api.openweathermap.org/data/2.5/weather?id=${countryID}&APPID=${process.env.APP_ID}`)
      .reply(200, {
        coord: {
          lon: 100.5,
          lat: 13.75
        },
        weather: [
          {
            id: 201,
            main: 'Thunderstorm',
            description: 'thunderstorm with rain',
            icon: '11d'
          }
        ],
        base: 'stations',
        main: {
          temp: 302.11,
          pressure: 1005,
          humidity: 62,
          temp_min: 299.15,
          temp_max: 305.15
        },
        visibility: 10000,
        wind: {
          speed: 4.1,
          deg: 320
        },
        clouds: {
          all: 20
        },
        dt: 1508232600,
        sys: {
          type: 1,
          id: 7917,
          message: 0.0087,
          country: 'TH',
          sunrise: 1508195346,
          sunset: 1508237835
        },
        id: 1608132,
        name: 'Changwat Nonthaburi',
        cod: 200
      })
    const result = await OpenWeatherAPI.currentWeatherByCountryID(countryID)
    expect(result).toBeDefined()
    expect(result.id).toEqual(countryID)
  })
})
