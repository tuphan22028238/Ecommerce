const serverController = require('./server')
const authController = require('./auth')
const {Protect, CheckUser} = require('../app/middlewares/authMiddleware')

function route(app) {
    app.get('*',CheckUser);
    app.use('/auth', authController)
    app.use('/server', Protect, serverController)
}

module.exports = route