const User = require("../models/User");
const Product = require("../models/Product");
const PossesProduct = require("../models/PossesProduct");
const Order = require("../models/Orders");
const OrderDetail = require("../models/OrdersDetail");
const Type = require("../models/Type");
const ImageProduct = require("../models/ImageProduct");
const Cart = require("../models/Cart");

class UserController {

  async viewProfile(req, res, next) {
    try {
      const profile = await User.findOne({where : {id : req.params.id}});
      res.send(profile);
    } catch (error) {
      console.error("Error getting profile:", error.message);
      res.status(500).send("Error getting profile");
    }
  }

  // View cart
  async viewCart(req, res, next) {
    try {
      let myCart = [];

      // Find user's cart items
      const cartItems = await Cart.findAll({
        where: { userId: req.params.id },
      });

      // Retrieve product details for each cart item
      for (let i = 0; i < cartItems.length; i++) {
        const product = await Product.findOne({
          where: { id: cartItems[i].productId },
        });

        myCart.push(product);
      }

      // Send the user's cart
      res.send(myCart);
    } catch (error) {
      console.error("Error viewing cart:", error.message);
      res.status(500).send("Error viewing cart");
    }
  }

  // Add product to cart
  async addToCart(req, res, next) {
    try {
      const { productId, quantity, color, discount, size } = req.body;
      const userId = req.params.id;

      // Find the product in the cart
      const product = await Cart.findOne({
        where: {
          userId,
          productId,
        },
      });

      // Add the product to the cart
      if (!product) {
        await Cart.create({
          userId,
          productId,
          quantity,
          color,
          discount,
          size,
        });
        res.send("Product added to cart");
      }
      // Update the quantity of the product in the cart
    } catch (error) {
      console.error("Error adding product to cart:", error.message);
      res.status(400).send("Error adding product to cart");
    }
  }
  // Delete product from cart
  async deleteFromCart(req, res, next) {
    try {
      // Find the product in the cart
      const product = await Cart.findOne({
        where: {
          userId: req.params.id,
          productId: req.body.productId,
        },
      });

      // Delete the product from the cart
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
      // Find the product in the cart
      const product = await Cart.findOne({
        where: {
          userId: req.params.id,
          productId: req.body.productId,
        },
      });

      // Update the quantity of the product in the cart
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

  //-------------------------------------------------------------------------------------//

  // Add cart to order
  async addCartToOrder(req, res, next) {
    try {
      const { productId, quantity, color, discount } = req.body;
      const userId = req.params.id;

      // Find the user's cart
      const cart = await Cart.findOne({
        where: { userId },
      });

      // Check if the user has an active cart
      if (!cart) {
        throw new Error("No active cart found for the user");
      }

      // Create a new order
      const order = await Order.create({
        userId,
        status: 1,
        paymentMode: 0,
      });

      // Move products from cart to order detail
      await OrderDetail.create({
        orderId: order.id,
        productId: cart.productId,
        quantity: cart.quantity,
        color: cart.color,
        discount: cart.discount,
      });

      // Remove products from the cart
      await cart.destroy();

      // Send success response
      res.status(200).send("Cart added to order successfully");
    } catch (error) {
      console.error("Error adding cart to order:", error.message);
      res.status(500).send("Error adding cart to order");
    }
  }

  // Delete orders
  async deleteOrders(req, res, next) {
    try {
      // Find the product in the order
      const product = await OrderDetail.findOne({
        where: {
          orderId: req.body.orderId,
          productId: req.body.productId,
        },
      });

      // Delete the product from the order
      if (product) {
        await product.destroy();
        res.send("Product deleted from order");
      }
    } catch (error) {
      console.error("Error deleting product from order:", error.message);
      res.status(400).send("Error deleting product from order");
    }
  }

  // Update orders
  async updateOrders(req, res, next) {
    try {
      // Find the product in the order
      const product = await OrderDetail.findOne({
        where: {
          orderId: req.body.orderId,
          productId: req.body.productId,
        },
      });

      // Update the quantity of the product in the order
      if (product) {
        product.quantity = req.body.quantity;
        await product.save();
        res.send("Product updated in order");
      }
    } catch (error) {
      console.error("Error updating product in order:", error.message);
      res.status(400).send("Error updating product in order");
    }
  }

  // Place an order
  async placeOrder(req, res, next) {
    try {
      // Find the order
      const order = await Order.findOne({
        where: { id: req.body.orderId },
      });

      // Update order status and payment details
      order.status = 3;
      order.paymentMode = 0;
      order.paymentDate = new Date();
      await order.save();

      // Send success response
      res.send("Order placed successfully");
    } catch (error) {
      console.error("Error placing order:", error.message);
      res.status(400).send("Error placing order");
    }
  }

  // Redirect to a specific product
  async redirectToProduct(req, res, next) {
    try {
      // Find the product
      const product = await Product.findOne({
        where: { id: req.params.id },
      });

      // Send the product details
      res.send(product);
    } catch (error) {
      console.error("Error redirecting to product:", error.message);
      res.status(400).send("Error redirecting to product");
    }
  }

  // Pay for the order
  async payOrder(req, res, next) {
    try {
      // Find the order
      const order = await Order.findOne({
        where: { id: req.body.orderId },
      });

      // Update order status and payment details
      order.status = 4;
      order.paymentMode = 0;
      order.paymentDate = new Date();
      await order.save();

      // Send success response
      res.send("Order paid successfully");
    } catch (error) {
      console.error("Error paying order:", error.message);
      res.status(400).send("Error paying order");
    }
  }

  // Cancel the order
  async cancelOrder(req, res, next) {
    try {
      // Find the order
      const order = await Order.findOne({
        where: { id: req.body.orderId },
      });

      // Update order status
      order.status = 2;
      await order.save();

      // Send success response
      res.send("Order cancelled successfully");
    } catch (error) {
      console.error("Error cancelling order:", error.message);
      res.status(400).send("Error cancelling order");
    }
  }

  // Return the order
  async returnOrder(req, res, next) {
    try {
      // Find the order
      const order = await Order.findOne({
        where: { id: req.body.orderId },
      });

      // Update order status
      order.status = 6;
      await order.save();

      // Send success response
      res.send("Order returned successfully");
    } catch (error) {
      console.error("Error returning order:", error.message);
      res.status(400).send("Error returning order");
    }
  }

  // Refund the order
  async refundOrder(req, res, next) {
    try {
      // Find the order
      const order = await Order.findOne({
        where: { id: req.body.orderId },
      });

      // Update order status
      order.status = 5;
      await order.save();

      // Send success response
      res.send("Order refunded successfully");
    } catch (error) {
      console.error("Error refunding order:", error.message);
      res.status(400).send("Error refunding order");
    }
  }

  // View order history
  async viewOrderHistory(req, res, next) {
    try {
      // Find orders with status "Cancelled"
      const orders = await Order.findAll({
        where: { userId: req.params.id, status: 2 },
      });

      // Send the order history
      res.send(orders);
    } catch (error) {
      console.error("Error viewing order history:", error.message);
      res.status(500).send("Error viewing order history");
    }
  }

  // View orders
  async viewOrders(req, res, next) {
    try {
      let myOrders = [];

      // Find all orders for the user
      const orders = await Order.findAll({
        where: { userId: req.params.id },
      });

      // Retrieve order details
      for (let i = 0; i < orders.length; i++) {
        const orderDetails = await OrderDetail.findAll({
          where: { orderId: orders[i].dataValues.id },
        });

        // Retrieve product details for each order
        for (let j = 0; j < orderDetails.length; j++) {
          const product = await Product.findOne({
            where: { id: orderDetails[j].dataValues.productId },
          });

          myOrders.push({
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

      // Send the orders with product details
      res.send(myOrders);
    } catch (error) {
      console.error("Error viewing orders:", error.message);
      res.status(500).send("Error viewing orders");
    }
  }
}

module.exports = new UserController;
