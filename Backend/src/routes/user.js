const userController = require("../app/controllers/userControllers");
const express = require("express");
const route = express.Router();

route.get("/cart/:id", userController.viewCart);
route.get("/profile/:id", userController.viewProfile);
route.put("/profile/update/:id", userController.updateProfile);
route.post("/cart/add/:id", userController.addToCart);
route.delete("/cart/delete/:userId/:productId", userController.deleteFromCart);
route.put("/cart/update/:id", userController.updateCart);

route.post("/cart/checkout/:id", userController.checkOutOrderFromCart);

module.exports = route;
