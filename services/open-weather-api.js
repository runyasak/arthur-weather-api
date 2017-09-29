import axios from 'axios'

const currentWeatherByID = async (id) => {
  const fullUrl = `http://api.openweathermap.org/data/2.5/weather?id=${id}&APPID=ff332f54015b41493ccd32caa1e2cc70`
  const result = await axios.get(fullUrl).catch(err => err)
  return result.data
}

const currentWeatherByName = async (name) => {
  const fullUrl = `http://api.openweathermap.org/data/2.5/weather?q=${name}&APPID=ff332f54015b41493ccd32caa1e2cc70`
  const result = await axios.get(fullUrl).catch(err => err)
  return result.data
}

export default {
  currentWeatherByID,
  currentWeatherByName,
}
