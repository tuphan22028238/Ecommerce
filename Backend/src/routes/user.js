const userController = require("../app/controllers/userControllers");
const express = require("express");
const route = express.Router();

route.get("/cart/:id", userController.viewCart);
route.post("/cart/add", userController.addToCart);

module.exports = route;
