const User = require("../models/User");

class adminController {
  verifyAdmin(req, res, next) {
    res.status(200).send("You are admin");
  }
}

module.exports = new adminController;