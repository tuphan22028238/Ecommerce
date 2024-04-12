const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({id}, "MarketSwift", {
    expiresIn: maxAge
  });
}

const handleErrors = (errors) => {
  let Errors = {username: "", email: ""};
  mainError = errors.errors[0].message;
  if (mainError.includes("username")) {
    Errors.username = "Username is already taken";
  }
  if (mainError.includes("email")) {
    Errors.email = "Email is already taken";
  }
  return Errors;
}

class authController {
  async login(req, res, next) {
    const infor = await User.findOne({ where: { username: req.body.username } });
    if (infor !== null) {
      const token = createToken(infor.id);
      res.cookie("jwt", token, { httpOnly: true});
      res.cookie("role", infor.role, { httpOnly: true});
      res.send(infor);
    } else {
      res.send("Login failed");
    }
  }
  async register(req, res, next) {
    try {
      const newUser = await User.create({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        role: req.body.role,
      });
      if (newUser) {
        res.send("Register success" + newUser.id);
      } else {
        res.send("Register failed");
      }
    } 
    catch (errors) {
      const Errors = handleErrors(errors);
      res.status(400).send("Error adding new user: " + Errors.username + Errors.email);
    }
  }
}

module.exports = new authController;
