const express = require('express')
const serverController = require('../app/controllers/serverController')
const route = express.Router()

route.get('/home', (req, res) => {
    res.send("This is home page")
})

route.post('/createOne', serverController.createOne)
route.get('/showOne', serverController.showOne)
route.get('/show', serverController.showAll)
route.delete('/deleteOne/:id', serverController.deleteOne)
route.put('/putOne/:id', serverController.putOne)

module.exports = route