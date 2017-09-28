import express from 'express'
import { openWeatherAPI } from '../services/'

const app = express()

app.get('/weather', async (req, res) => {
  const data = await openWeatherAPI.currentWeather()
  console.log('data:', data)
  res.setHeader('Content-Type', 'application/json')
  if (data) {
    res.json(data)
  } else {
    res.status(404).send(null)
  }
})

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
})
