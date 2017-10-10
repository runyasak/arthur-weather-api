const express = require('express')

const app = express()

app.set('port', 3000)

app.get('/', (req, res) => {
  res.send('hello weather!')
})

app.use(require('./controllers'))

app.listen(app.get('port'), () => {
  console.log(`Listening on port ${app.get('port')}!`)
})
