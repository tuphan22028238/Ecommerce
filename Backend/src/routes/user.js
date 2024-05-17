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
route.get("/order/:id", userController.viewOrder);
route.post("/cart/prepare/:id", userController.getPrepareOrderFromCart);
route.post("/cart/checkout/:id", userController.checkOutOrderFromCart);
route.put("/order/cancel/:id", userController.cancelOrder);

module.exports = route;
