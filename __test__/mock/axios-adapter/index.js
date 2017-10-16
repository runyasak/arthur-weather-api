const MockAdapter = require('axios-mock-adapter')

exports.intiate = (axios) => {
  // This sets the mock adapter on the default instance
  const mock = new MockAdapter(axios)

  mock.onGet('/weather').reply(200, {
    coord: {
      lon: 100.5,
      lat: 13.75
    },
    weather: [
      {
        id: 801,
        main: 'Clouds',
        description: 'few clouds',
        icon: '02n'
      }
    ],
    base: 'stations',
    main: {
      temp: 302.15,
      pressure: 1006,
      humidity: 70,
      temp_min: 302.15,
      temp_max: 302.15
    },
    visibility: 10000,
    wind: {
      speed: 3.1,
      deg: 200
    },
    clouds: {
      all: 20
    },
    dt: 1508153400,
    sys: {
      type: 1,
      id: 7925,
      message: 0.0099,
      country: 'TH',
      sunrise: 1508108937,
      sunset: 1508151466
    },
    id: 1608132,
    name: 'Changwat Nonthaburi',
    cod: 200
  })
}
