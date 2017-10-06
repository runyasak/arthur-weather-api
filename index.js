const express = require('express')
const services = require('./services')

const app = express()

app.set('port', 3000)

app.get('/', (req, res) => {
  res.send('hello weather!')
})

app.get('/weather/:country', async (req, res) => {
  const data = Number(req.params.country)
    ? await services.openWeatherAPI.currentWeatherByCountryID(req.params.country)
    : await services.openWeatherAPI.currentWeatherByCountryName(req.params.country)
  // console.log('data:', JSON.stringify(data.main))
  services.openWeatherSqlite.insertForecastToTable(
    'arthur_weather',
    Number(new Date()),
    JSON.stringify(data.main)
  )
  res.setHeader('Content-Type', 'application/json')
  if (data) {
    res.json(data)
  } else {
    res.status(404).send(null)
  }
})

app.listen(app.get('port'), () => {
  // console.log(Number(new Date()))
  // services.openWeatherSqlite.createTable()
  // services.openWeatherSqlite.insertForecastToTable('arthur_weather', '555', 'cold')
  console.log('allData:', services.openWeatherSqlite.selectFromTable('arthur_weather')[0])
  console.log(`Listening on port ${app.get('port')}!`)
})
