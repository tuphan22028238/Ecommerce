const userController = require('../app/controllers/userControllers')
const express = require('express');
const route = express.Router();

route.get('/cart/:id', userController.viewCart);

module.exports = route;