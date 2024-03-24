const serverController = require('./server')
const authController = require('./auth')

function route(app) {
    app.use('/auth', authController)
    app.use('/', serverController)
}

module.exports = route