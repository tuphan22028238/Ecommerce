const express = require("express");
const route = express.Router();
const serverController = require("../app/controllers/serverController");
const adminController = require("../app/controllers/adminControllers");
const userController = require("../app/controllers/userControllers");
const authController = require("../app/controllers/authController");

const initWebRoutes = (app) => {
  //auth routes
  route.post("/login", authController.login);
  route.get("/logout", authController.logout);
  route.post("/register", authController.register);

  //server routes
  route.get("/home", (req, res) => {
    res.send("This is home page");
  });
  route.get("/show/:id", serverController.viewSpecificProduct);
  route.get("/show", serverController.viewAllProduct);
  route.post("/add", serverController.addNewProduct);

  //admin routes
  route.get("/verify", adminController.verifyAdmin);

  //user routes
  route.get("/cart/:id", userController.viewCart);
  route.get("/orders", userController.getAllOrders);
  route.get("/order/:id", userController.getOrderById);
  route.post("/order", userController.createOrder);
  route.put("/order/:id", userController.updateOrder);
  route.delete("/order/:id", userController.deleteOrder);

  return app.use("/", route);
};

module.exports = initWebRoutes;
