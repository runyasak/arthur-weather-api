import axios from 'axios'

const currentWeather = async () => {
  const result = await axios
    .get('http://api.openweathermap.org/data/2.5/forecast?id=1608132&APPID=ff332f54015b41493ccd32caa1e2cc70')
    .catch(err => err)
  return result.data
}

export default {
  currentWeather,
}
