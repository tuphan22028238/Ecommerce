const User = require("../models/user");
const Product = require("../models/product");
const PossesProduct = require("../models/possesProduct");
const Order = require("../models/orders");
const OrderDetail = require("../models/ordersDetail");
const { or } = require("sequelize");

class UserController {
  // View cart
  async viewCart(req, res, next) {
    try {
      let myCart = [];
      const orders = await Order.findAll({
        where: { userId: req.params.id },
      });

      for (let i = 0; i < orders.length; i++) {
        const orderDetails = await OrderDetail.findAll({
          where: { orderId: orders[i].dataValues.id },
        });

        for (let j = 0; j < orderDetails.length; j++) {
          const product = await Product.findOne({
            where: { id: orderDetails[j].dataValues.productId },
          });

          myCart.push({
            order_id: orders[i].id,
            id: product.id,
            name: product.name,
            price: orderDetails[j].unitPrice,
            quantity: orderDetails[j].quantity,
            color: orderDetails[j].color,
            discount: orderDetails[j].discount
          });
        }
      }
      res.send(myCart);
    } catch (error) {
      console.error("Error viewing cart:", error.message);
      res.status(500).send("Error viewing cart");
    }
  }

  // Add product to cart
  async addToCart(req, res, next) {
    try {
      const { productId, quantity, color, discount } = req.body;
      const userId = req.params.id;

      const order = await Order.create({
        userId,
        status: 1,
        paymentMode: 0,
      });

      await OrderDetail.create({
        orderId: order.id,
        productId,
        quantity,
        color,
        discount,
      });
      res.status(200).send("Product added to cart successfully");
    } catch (error) {
      console.error("Error adding product to cart:", error.message);
      res.status(500).send("Error adding product to cart");
    }
  }
  // Delete product from cart
  async deleteFromCart(req, res, next) {
    try {
      const product = await OrderDetail.findOne({
        where: {
          orderId: req.body.orderId,
          productId: req.body.productId,
        },
      });
      if (product) {
        await product.destroy();
        res.send("Product deleted from cart");
      }
    } catch (error) {
      console.error("Error deleting product from cart:", error.message);
      res.status(400).send("Error deleting product from cart");
    }
  }
  // Update product in cart
  async updateCart(req, res, next) {
    try {
      const product = await OrderDetail.findOne({
        where: {
          orderId: req.body.orderId,
          productId: req.body.productId,
        },
      });
      if (product) {
        product.quantity = req.body.quantity;
        await product.save();
        res.send("Product updated in cart");
      }
    } catch (error) {
      console.error("Error updating product in cart:", error.message);
      res.status(400).send("Error updating product in cart");
    }
  }
  //Place an order with quantity.
  async placeOrder(req, res, next) {
    try {
      const order = await Order.findOne({
        where: { id: req.body.orderId },
      });
      order.status = 3;
      order.paymentMode = 0;
      order.paymentDate = new Date();
      await order.save();
      res.send("Order placed successfully");
    }
    catch (error) {
      console.error("Error placing order:", error.message);
      res.status(400).send("Error placing order");
    }
  }
  //Redirect to a specific product when the user chooses one.
  async redirectToProduct(req, res, next) {
    try {
      const product = await Product.findOne({
        where: { id: req.params.id },
      });
      res.send(product);
    } catch (error) {
      console.error("Error redirecting to product:", error.message);
      res.status(400).send("Error redirecting to product");
    }
  }

  // Pay for the order
  async payOrder(req, res, next) {
    try {
      const order = await Order.findOne({
        where: { id: req.body.orderId },
      });
      order.status = 4;
      order.paymentMode = 0;
      order.paymentDate = new Date();
      await order.save();
      res.send("Order paid successfully");
    }
    catch (error) {
      console.error("Error paying order:", error.message);
      res.status(400).send("Error paying order");
    }
  }
  // Cancel the order
  async cancelOrder(req, res, next) {
    try {
      const order = await Order.findOne({
        where: { id: req.body.orderId },
      });
      order.status = 2;
      await order.save();
      res.send("Order cancelled successfully");
    }
    catch (error) {
      console.error("Error cancelling order:", error.message);
      res.status(400).send("Error cancelling order");
    }
  }
  // Return the order
  async returnOrder(req, res, next) {
    try {
      const order = await Order.findOne({
        where: { id: req.body.orderId },
      });
      order.status = 6;
      await order.save();
      res.send("Order returned successfully");
    }
    catch (error) {
      console.error("Error returning order:", error.message);
      res.status(400).send("Error returning order");
    }
  }
  // Refund the order
  async refundOrder(req, res, next) {
    try {
      const order = await Order.findOne({
        where: { id: req.body.orderId },
      });
      order.status = 5;
      await order.save();
      res.send("Order refunded successfully");
    }
    catch (error) {
      console.error("Error refunding order:", error.message);
      res.status(400).send("Error refunding order");
    }
  }
  // View order history
  async viewOrderHistory(req, res, next) {
    try {
      const orders = await Order.findAll({
        where: { userId: req.params.id, status: 2 },
      });
      res.send(orders);
    } catch (error) {
      console.error("Error viewing order history:", error.message);
      res.status(500).send("Error viewing order history");
    }
  }
  // View order details
  async viewOrderDetails(req, res, next) {
    try {
      const orderDetails = await OrderDetail.findAll({
        where: { orderId: req.params.id },
      });
      res.send(orderDetails);
    } catch (error) {
      console.error("Error viewing order details:", error.message);
      res.status(500).send("Error viewing order details");
    }
  }
}
module.exports = new UserController;
