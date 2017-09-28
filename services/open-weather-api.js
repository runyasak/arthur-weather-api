import axios from 'axios'

const currentWeather = async () => {
  const result = await axios.get('http://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=b1b15e88fa797225412429c1c50c122a1')
  return result.data
}

export default {
  currentWeather,
}
