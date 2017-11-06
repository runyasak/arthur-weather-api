const DateTime = require('../helpers/datetime')

const fs = require('fs')
const sql = require('sql.js')
const path = require('path')

/**
 * @type {string} Table name in Database
 */
const tableName = 'arthur_weather'

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
  let res
  try {
    res = db.exec(sqlStr)
  } catch (err) {
    console.log(err)
  }
  return res
}

/**
 * Get existed weatherID in Database by weather_data
 * @param {sql.Database} db
 * @param {string} weatherData
 */
const existWeatherID = (db, weatherData) => {
  const sqlStr = `SELECT weather_id FROM arthur_weather WHERE weather_data='${weatherData}';`
  return execSql(db, sqlStr)[0] ? execSql(db, sqlStr)[0].values[0][0] : null
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
exports.history = (time) => {
  const db = getDatabase()
  const selectStr = `SELECT * FROM ${tableName}`
  const whereStr = time
    ? `${DateTime.isYear(time) ? `WHERE year=${time}` : `WHERE month=${time}`}`
    : ''
  const sqlstr = `${selectStr} ${whereStr};`
  let res
  try {
    res = db.exec(sqlstr)
  } catch (err) {
    console.log(err)
  }
  return res || `no such table: ${tableName}`
}

/**
 * Add or update new weather data in table
 * @param {string} weatherData
 */
exports.add = (weatherData) => {
  const db = getDatabase()
  weatherData.weather_log.forEach((data) => {
    const weatherID = existWeatherID(db, data.weather_data)
    let sqlStr = ''
    if (weatherID) {
      console.log(DateTime.format(data.weather_data))
      sqlStr = `UPDATE
      arthur_weather SET weather_code='${data.weather_code}', weather_high='${data.weather_high}', weather_low='${data.weather_low}', weather_text='${data.weather_text}' WHERE weather_id = ${weatherID};`
    } else {
      sqlStr = `INSERT INTO
      ${tableName} (weather_data, weather_code, weather_high, weather_low, weather_text)
      VALUES ('${DateTime.format(data.weather_data)}', '${data.weather_code}', '${data.weather_high}', '${data.weather_low}', '${data.weather_text}');`
    }
    runSql(db, sqlStr)
  })
  databaseExport(db)
}
