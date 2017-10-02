import express from 'express'
import { openWeatherAPI } from './services'

const app = express()

app.set('port', process.env.PORT || 3000)

app.get('/', (req, res) => {
  res.send('hello weather!')
})

app.get('/weather/:country', async (req, res) => {
  const data = Number(req.params.country)
    ? await openWeatherAPI.currentWeatherByCountryID(req.params.country)
    : await openWeatherAPI.currentWeatherByCountryName(req.params.country)
  console.log('data:', data)
  res.setHeader('Content-Type', 'application/json')
  if (data) {
    res.json(data)
  } else {
    res.status(404).send(null)
  }
})

app.listen(app.get('port'), () => {
  console.log('Listening on port 3000!')
})
