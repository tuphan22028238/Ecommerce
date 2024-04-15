const express = require("express");
const serverController = require("../app/controllers/serverController");
const route = express.Router();

route.get("/home", (req, res) => {
  res.send("This is home page");
});
route.get("/show/:id", serverController.viewSpecificProduct)
route.get("/show", serverController.viewAllProduct)
route.post("/add", serverController.addNewProduct);

module.exports = route;
