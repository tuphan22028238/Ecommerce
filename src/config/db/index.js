const mysql = require('mysql2')

const db = mysql.createConnection({
    host: 'localhost',
    port: '3307',
    user: 'root',
    password: '123456',
    database: 'dicdb'
})

db.connect()

module.exports = db