/**
 * Weather data from sqlite
 */

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

/**
 * Create table replace previous
 */

const dropAndCreateTable = () => {
  const db = new sql.Database()
  const sqlstr =
    'CREATE TABLE arthur_weather (timestamp char, year char, month char, day char, forecast_data char, PRIMARY KEY (timestamp));'
  db.exec(sqlstr)
  databaseExport(db)
  console.log('dropAndCreateTable!!')
}

/**
 * Get all data from table
 * @param {string} tableName
 */

const selectFromTable = (tableName) => {
  const filebuffer = fs.readFileSync(path.join(__dirname, '../data/weather.sqlite') || '')
  const db = new sql.Database(filebuffer)
  let res
  try {
    res = db.exec(`SELECT * FROM ${tableName};`)
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

const insertForecastToTable = (tableName, date, value) => {
  const filebuffer = fs.readFileSync(path.join(__dirname, '../data/weather.sqlite') || '')
  const db = new sql.Database(filebuffer)
  const sqlstr = `INSERT INTO ${tableName} (timestamp, year, month, day, forecast_data) VALUES ('${Number(date)}', ${date.getFullYear()}, ${date.getMonth()}, ${date.getDate()}, '${value}')`
  try {
    db.run(sqlstr)
  } catch (err) {
    console.log(err)
  }
  databaseExport(db)
}

module.exports = {
  selectFromTable,
  insertForecastToTable,
  dropAndCreateTable
}
