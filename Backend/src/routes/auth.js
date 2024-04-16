const authController = require("../app/controllers/authController");
const express = require("express");
const route = express.Router();

route.post("/login", authController.login);
route.get("/logout", authController.logout);
route.post("/register", authController.register);

module.exports = route;
