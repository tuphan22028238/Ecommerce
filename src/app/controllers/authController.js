const user = require("../models/User");

class authController {
  login(req, res, next) {
    let userInfor = user.insertUser(req.body);
    console.log(userInfor);
    if (userInfor) {
      res.send("Ok have account");
    } else {
      res.send("Not have account");
    }
  }
}

module.exports = new authController();
