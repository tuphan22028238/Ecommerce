const User = require("../models/user");

class adminController {
  verifyAdmin(req, res, next) {
    res.status(200).send("You are seller");
  }
}

module.exports = new adminController;
