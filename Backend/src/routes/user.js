const userController = require("../app/controllers/userControllers");
const express = require("express");
const route = express.Router();

route.get("/cart/:id", userController.viewCart);
route.get("/profile/:id", userController.viewProfile);
route.post("/cart/add", userController.addToCart);
route.post("/cart/delete", userController.deleteFromCart);
route.put("/cart/update", userController.updateCart);

route.post("/cart/checkout/:id", userController.placeOrder);
route.get('/cart/:userId', userController.getCartSelectedItems);
route.get('/order-summary/:id', userController.displayOrderSummary);
route.post('/payment-info', userController.collectPaymentInfo);

module.exports = route;
