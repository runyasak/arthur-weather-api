const { DateTime, WeatherData } = require('../helpers')
const moment = require('moment-timezone').tz.setDefault('Asia/Bangkok')

const fs = require('fs')
const sql = require('sql.js')
const path = require('path')

/**
 * @type {string} Table name in Database
 */
const { TABLE_NAME } = require('../constant')

/**
 * Export data from sql.js to buffer and write with file system
 * @param {Database} db
 */
const databaseExport = (db) => {
  try {
    const binaryArray = db.export()
    const buffer = Buffer.from(binaryArray.buffer)
    fs.writeFileSync(path.join(__dirname, '../data/weather.sqlite'), buffer)
  } catch (err) {
    console.log(err)
  }
}

/**
 * Run sql string to Database
 * @param {sql.Database} db
 * @param {string} sqlStr
 */
const runSql = (db, sqlStr) => {
  try {
    db.run(sqlStr)
  } catch (err) {
    console.log(err)
  }
}

/**
 * Run sql string to Database with return result
 * @param {sql.Database} db
 * @param {string} sqlStr
 * @return {array} result of execute
 */
const execSql = (db, sqlStr) => {
  let result
  try {
    result = db.exec(sqlStr)
  } catch (err) {
    console.log(err)
  }
  return result
}

/**
 * Get existed weatherID in Database by weather_data
 * @param {sql.Database} db
 * @param {string} weatherData
 */
const existWeatherID = (db, weatherData) => {
  const sqlStr = `SELECT weather_id FROM arthur_weather WHERE weather_data='${weatherData}';`
  const result = WeatherData.mapSqlite(execSql(db, sqlStr))
  return result.weather_log[0] ? result.weather_log[0].weather_id : null
}

/**
 * Get Database from sqlite as buffer
 * @return {sql.Database} Database from buffer
 */
const getDatabase = () =>
  new sql.Database(fs.readFileSync(path.join(__dirname, '../data/weather.sqlite') || ''))

/**
 * Create table replace previous
 */
exports.dropAndCreateTable = () => {
  const db = new sql.Database()
  const sqlstr =
    'CREATE TABLE arthur_weather(weather_id INTEGER PRIMARY KEY ASC, weather_data date, weather_code char, weather_high char, weather_low char, weather_text char);'
  db.exec(sqlstr)
  databaseExport(db)
  console.log('dropAndCreateTable!!')
}
/**
 * Get all data from table
 */
exports.current = () => {
  const db = getDatabase()
  const currentDate = moment(new Date()).format('YYYY-MM-DD')
  const beginDate = moment(currentDate)
    .add(1, 'day')
    .format('YYYY-MM-DD')
  const endDate = moment(currentDate)
    .add(5, 'days')
    .format('YYYY-MM-DD')
  const currentSqlStr = `SELECT * FROM ${TABLE_NAME} WHERE weather_data='${currentDate}'`
  const furtureSqlStr = `SELECT * FROM ${TABLE_NAME} WHERE weather_data BETWEEN '${beginDate}' AND '${endDate}'`
  const currentResponse = WeatherData.mapSqlite(execSql(db, currentSqlStr))
  const futureResponse = WeatherData.mapSqlite(execSql(db, furtureSqlStr))
  return WeatherData.current(currentResponse, futureResponse) || `no such table: ${TABLE_NAME}`
}

/**
 * Get all data from table
 */
exports.history = (inputTime) => {
  const db = getDatabase()
  const selectStr = `SELECT * FROM ${TABLE_NAME}`
  const whereStr = inputTime
    ? `WHERE strftime('${DateTime.isYear(inputTime) ? '%Y' : '%m'}', weather_data)='${inputTime}'`
    : ''
  const sqlStr = `${selectStr} ${whereStr}`
  const result = WeatherData.mapSqlite(execSql(db, sqlStr))
  return result || `no such table: ${TABLE_NAME}`
}

/**
 * Add or update new weather data in table
 * @param {string} weatherData
 */
exports.add = (inputData) => {
  const db = getDatabase()
  inputData.weather_log.forEach((data) => {
    const weatherData = moment(new Date(data.weather_data)).format('YYYY-MM-DD')
    const weatherID = existWeatherID(db, weatherData)
    const sqlStr = weatherID
      ? `UPDATE ${TABLE_NAME} 
        SET weather_code='${data.weather_code}', weather_high='${data.weather_high}', 
          weather_low='${data.weather_low}', weather_text='${data.weather_text}' 
        WHERE weather_id = ${weatherID};`
      : `INSERT INTO ${TABLE_NAME} (weather_data, weather_code, weather_high, weather_low, weather_text)
        VALUES ('${weatherData}', '${data.weather_code}', '${data.weather_high}', '${data.weather_low}', '${data.weather_text}');`
    runSql(db, sqlStr)
  })
  databaseExport(db)
}
