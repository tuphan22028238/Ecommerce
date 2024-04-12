const express = require("express");
const serverController = require("../app/controllers/serverController");
const route = express.Router();

route.get("/home", (req, res) => {
  res.send("This is home page");
});

module.exports = route;
