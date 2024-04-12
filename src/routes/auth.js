const authController = require("../app/controllers/authController");
const express = require("express");
const route = express.Router();

route.get("/login", authController.login);

module.exports = route;
