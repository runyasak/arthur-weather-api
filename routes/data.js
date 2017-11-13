const { DataController } = require('../controllers')
const express = require('express')

const dataRouter = express.Router()

dataRouter.get('/', DataController.current)
dataRouter.get('/history', DataController.history)
dataRouter.get('/year/:year', DataController.byYear)
dataRouter.get('/month/:month', DataController.byMonth)
dataRouter.get('/reset', DataController.reset)
dataRouter.get('/add', DataController.add)

module.exports = dataRouter
