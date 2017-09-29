import express from 'express'
import { openWeatherAPI } from '../services/'

const app = express()

app.get('/weather/:country', async (req, res) => {
  const data = Number(req.params.country)
    ? await openWeatherAPI.currentWeatherByID(req.params.country)
    : await openWeatherAPI.currentWeatherByName(req.params.country)
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
