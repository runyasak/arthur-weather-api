/**
 * Weather data from sqlite
 */

const DateTime = require('../helpers/datetime')

const fs = require('fs')
const sql = require('sql.js')
const path = require('path')

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

const getDatabase = () =>
  new sql.Database(fs.readFileSync(path.join(__dirname, '../data/weather.sqlite') || ''))

/**
 * Create table replace previous
 */

exports.dropAndCreateTable = () => {
  const db = new sql.Database()
  const sqlstr =
    'CREATE TABLE arthur_weather (weather_data char, year char, month char, weather_code char, weather_high char, weather_low char, weather_text char, PRIMARY KEY (weather_data));'
  db.exec(sqlstr)
  databaseExport(db)
  console.log('dropAndCreateTable!!')
}

/**
 * Get all data from table
 * @param {string} tableName
 */

exports.select = (tableName, time) => {
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
 * Insert new weather data in table
 * @param {string} tableName
 * @param {string} timestamp
 * @param {string} value
 */

exports.insert = (tableName, date, weatherData) => {
  const db = getDatabase()
  weatherData.weather_log.forEach((data) => {
    const sqlstr = `INSERT INTO\
    ${tableName} (weather_data, year, month, weather_code, weather_high, weather_low, weather_text)\
    VALUES ('${data.weather_data}', '${date.getYear()}', '${date.getMonth() +
      1}', '${data.weather_code}', '${data.weather_high}', '${data.weather_low}', '${data.weather_text}');`
    try {
      db.run(sqlstr)
    } catch (err) {
      console.log(err)
    }
  })
  databaseExport(db)
}
