const User = require("../models/User");
const PossesProduct = require("../models/PossesProduct");
const Product = require("../models/Product");
const Order = require("../models/Orders");
const OrderDetail = require("../models/OrdersDetail");
const ImageProduct = require("../models/ImageProduct");
const Cart = require("../models/Cart");

class SellerController {
  async viewListProduct(req, res, next) {
    try {
      let listProduct = [];
      const myProduct = await PossesProduct.findAll({
        where: { userId: req.params.id },
      });
      for (let i = 0; i < myProduct.length; i++) {
        const product = await Product.findOne({
          where: { id: myProduct[i].dataValues.productId },
        });
        listProduct.push(product);
      }
      res.send(listProduct);
    } catch (errors) {
      console.error("Error viewing product:", errors.message);
      res.status(400).send("Error viewing product");
    }
  }

  async addProduct(req, res, next) {
    try {
      console.log(req.body);
      const product = await Product.create(req.body);
      const possesProduct = await PossesProduct.create({
        userId: req.body.sellerId,
        productId: product.id,
      });

      res.send(product);
    } catch (errors) {
      console.error("Error adding product:", errors.message);
      res.status(400).send("Error adding product");
    }
  }

  async deleteProduct(req, res, next) {
    try {
      const product = await Product.findOne({ where: { id: req.params.id } });

      await ImageProduct.findAll({ where: { productId: product.id } }).then(
        (images) => {
          images.forEach((image) => {
            image.destroy();
          });
        }
      );

      await PossesProduct.findAll({ where: { productId: product.id } }).then(
        (possesProducts) => {
          possesProducts.forEach((possesProduct) => {
            possesProduct.destroy();
          });
        }
      );

      await Cart.findAll({ where: { productId: product.id } }).then((carts) => {
        carts.forEach((cart) => {
          cart.destroy();
        });
      });

      await OrderDetail.findAll({ where: { productId: product.id } }).then(
        (orderDetails) => {
          orderDetails.forEach(async (orderDetail) => {
            orderDetail.destroy();
          });
        }
      );

      product.destroy();

      res.send(product);
    } catch (errors) {
      console.error("Error deleting product:", errors.message);
      res.status(400).send("Error deleting product");
    }
  }

  async requestEditProduct(req, res, next) {
    try {
      const product = await Product.findOne({ where: { id: req.params.id } });
      res.send(product);
    } catch (errors) {
      console.error("Error requesting edit product:", errors.message);
      res.status(400).send("Error requesting edit product");
    }
  }

  async editProduct(req, res, next) {
    try {
      const product = await Product.findOne({ where: { id: req.params.id } });
      await product.update(req.body);

      res.send(product);
    } catch (errors) {
      console.error("Error edit product:", errors.message);
      res.status(400).send("Error edit product");
    }
  }
}

module.exports = new SellerController();
