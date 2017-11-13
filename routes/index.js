const { WeatherController } = require('../controllers')
const express = require('express')

const router = express.Router()

const apiRouter = express.Router()
apiRouter.get('/', WeatherController.request)

const dbRouter = express.Router()
dbRouter.get('/', WeatherController.current)
dbRouter.get('/history', WeatherController.history)
dbRouter.get('/year/:year', WeatherController.byYear)
dbRouter.get('/month/:month', WeatherController.byMonth)
dbRouter.get('/reset', WeatherController.reset)
dbRouter.get('/add', WeatherController.add)

router.use('/weather', apiRouter)
router.use('/api/v1/weather', dbRouter)

module.exports = router
