const express = require('express')
const services = require('./services')
const config = require('./config')

const app = express()

app.set('port', config.SERVER_PORT)

app.get('/', (req, res) => {
  res.send('hello weather!')
})

app.get('/weather/:country', async (req, res) => {
  const data = Number(req.params.country)
    ? await services.openWeatherAPI.currentWeatherByCountryID(req.params.country)
    : await services.openWeatherAPI.currentWeatherByCountryName(req.params.country)
  console.log('data:', data)
  res.setHeader('Content-Type', 'application/json')
  if (data) {
    res.json(data)
  } else {
    res.status(404).send(null)
  }
})

app.listen(app.get('port'), () => {
  console.log(`Listening on port ${app.get('port')}!`)
})
