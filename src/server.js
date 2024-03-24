const express = require('express')
const route = require('./routes')
const db = require('./config/db')

const app = express()
const server = require('http').createServer(app)

app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.get('/db', (req, res) => {
    let sql = `SELECT * FROM wordtest`
    db.query(sql, (err, data) => {
        if (err) {
            console.log("Co loi");
            console.log(err);
        } else {
            res.send(typeof data)
        }
    })
})

route(app)

const port = process.env.PORT || 5000;

server.listen(port, () => {
    console.log("First project in " + port);
}) 