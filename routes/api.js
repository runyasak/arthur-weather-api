const { WeatherController } = require('../controllers')
const express = require('express')

const weatherRouter = express.Router()

weatherRouter.get('/', WeatherController.request)

module.exports = weatherRouter
