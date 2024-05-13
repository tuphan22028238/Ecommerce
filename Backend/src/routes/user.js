const userController = require("../app/controllers/userControllers");
const express = require("express");
const route = express.Router();

// Profile
route.get("/profile/:id", userController.viewProfile);
route.put("/profile/update/:id", userController.updateProfile);

// Cart
route.get("/cart/:id", userController.viewCart);
route.post("/cart/add/:id", userController.addToCart);
route.delete("/cart/delete/:userId/:productId", userController.deleteFromCart);
route.put("/cart/update/:id", userController.updateCart);

// Order
route.post("/cart/prepare/:id", userController.getPrepareOrderFromCart);
route.post("/cart/checkout/:id", userController.checkOutOrderFromCart);

module.exports = route;
