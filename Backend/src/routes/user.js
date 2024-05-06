const userController = require("../app/controllers/userControllers");
const express = require("express");
const route = express.Router();

route.get("/cart/:id", userController.viewCart);
route.post("/cart/add", userController.addToCart);
route.post("/cart/delete", userController.deleteFromCart);
route.put("/cart/update", userController.updateCart);
route.post("/cart/placeOrder", userController.placeOrder);


module.exports = route;
