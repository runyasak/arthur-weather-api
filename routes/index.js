const { WeatherController, DataController } = require('../controllers')
const express = require('express')

const router = express.Router()
const weatherRouter = express.Router()
const dataRouter = express.Router()

weatherRouter.get('/', WeatherController.request)

dataRouter.get('/', DataController.current)
dataRouter.get('/history', DataController.history)
dataRouter.get('/year/:year', DataController.byYear)
dataRouter.get('/month/:month', DataController.byMonth)
dataRouter.get('/reset', DataController.reset)
dataRouter.get('/add', DataController.add)

router.use('/weather', weatherRouter)
router.use('/api/v1/weather', dataRouter)

module.exports = router
