/**
 * Just testing mock axios adapter
 */

const axios = require('axios')

require('./mock/axios-adapter/').intiate(axios)

axios.get('/weather').then((res) => {
  console.log(res.data)
})
