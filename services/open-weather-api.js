import axios from 'axios'
import { APP_ID as appID } from '../config'

const currentWeatherByCountryID = async (id) => {
  const fullUrl = `http://api.openweathermap.org/data/2.5/weather?id=${id}&APPID=${appID}`
  const result = await axios.get(fullUrl).catch(err => err)
  return result.data
}

const currentWeatherByCountryName = async (name) => {
  const fullUrl = `http://api.openweathermap.org/data/2.5/weather?q=${name}&APPID=${appID}`
  const result = await axios.get(fullUrl).catch(err => err)
  return result.data
}

export default {
  currentWeatherByCountryID,
  currentWeatherByCountryName,
}
