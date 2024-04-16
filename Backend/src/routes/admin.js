const adminController = require('../app/controllers/adminControllers');
const express = require('express');
const route = express.Router();

route.get('/verify', adminController.verifyAdmin);

module.exports = route;