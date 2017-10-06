const fs = require('fs')
const sql = require('sql.js')
const path = require('path')

const databaseExport = (db) => {
  try {
    const binaryArray = db.export()
    const buffer = Buffer.from(binaryArray.buffer)
    fs.writeFileSync(path.join(__dirname, '../data/weather.sqlite'), buffer)
  } catch (err) {
    console.log(err)
  }
}

const createTable = () => {
  const db = new sql.Database()
  const sqlstr = 'CREATE TABLE arthur_weather (timestamp char, forecast char);'
  db.exec(sqlstr)
  databaseExport(db)
  console.log('createTable!!')
}

const selectFromTable = (tableName) => {
  const filebuffer = fs.readFileSync(path.join(__dirname, '../data/weather.sqlite') || '')
  const db = new sql.Database(filebuffer)
  const res = db.exec(`SELECT * FROM ${tableName};`)
  db.close()
  return res
}

const insertForecastToTable = (tableName, timestamp, value) => {
  const filebuffer = fs.readFileSync(path.join(__dirname, '../data/weather.sqlite') || '')
  const db = new sql.Database(filebuffer)
  const sqlstr = `INSERT INTO ${tableName} (timestamp, forecast) VALUES ('${timestamp}', '${value}')`
  db.run(sqlstr)
  databaseExport(db)
  // const binaryArray = db.export()
  // const buffer = Buffer.from(binaryArray.buffer)
  // fs.writeFileSync(path.join(__dirname, '../data/weather.sqlite'), buffer)
  // console.log('insert complete')
}

module.exports = {
  createTable,
  selectFromTable,
  insertForecastToTable,
}
