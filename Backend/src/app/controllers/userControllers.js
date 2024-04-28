const User = require("../models/User");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

class UserController {
  async viewCart(req, res, next) {
    try {
      let myCart = []
      const cart = await Cart.findAll({where: {userId: req.params.id}});
      for (let i = 0; i < cart.length; i++) {
        const product = await Product.findOne({where: {id: cart[i].dataValues.productId}});
        myCart.push(product);
      }
      res.send(myCart);
    }
    catch (errors) {
      console.error("Error viewing cart:", errors.message);
      res.status(400).send("Error viewing cart");
    }
  }
}

module.exports = new UserController;