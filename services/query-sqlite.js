const fs = require('fs')
const sql = require('sql.js')
const path = require('path')

const filebuffer = fs.readFileSync(path.join(__dirname, '../data/test.sqlite'))

const getAllData = () => {
  const db = new sql.Database(filebuffer)
  const res = db.exec('SELECT * FROM test')
  db.close()
  return res
}

module.exports = {
  getAllData,
}
