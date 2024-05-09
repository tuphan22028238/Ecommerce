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
      const profile = await User.findOne({ where: { id: req.params.id } });
      res.send(profile);
    } catch (error) {
      console.error("Error getting profile:", error.message);
      res.status(500).send("Error getting profile");
    }
  }

  // View cart
  async viewCart(req, res, next) {
    try {
      const myCart = [];

      const cartItems = await Cart.findAll({ where: { userId: req.params.id } });

      for (const cartItem of cartItems) {
        const product = await Product.findOne({ where: { id: cartItem.productId } });
        if (product) {
          myCart.push(product);
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
      const { productId, quantity, color, discount, size } = req.body;
      const userId = req.params.id;

      const product = await Cart.findOne({
        where: {
          userId: userId,
          productId: productId,
        },
      });

      if (product) {
        if (quantity !== undefined) {
          product.quantity = quantity;
        }
        if (color !== undefined) {
          product.color = color;
        }
        if (discount !== undefined) {
          product.discount = discount;
        }
        if (size !== undefined) {
          product.size = size;
        }

        await product.save();
        res.send("Product updated in cart");
      } else {
        res.status(404).send("Product not found in cart");
      }
    } catch (error) {
      console.error("Error updating product in cart:", error.message);
      res.status(400).send("Error updating product in cart");
    }
  }
  //-------------------------------------------------------------------------------------//

  // Checkout
  async checkout(req, res, next) {
    try {
      const userId = req.params.id;
      const selectedItems = req.body.selectedItems; // Array of selected item
      let cartItems = await this.getCartItems(userId);

      cartItems = cartItems.filter(item => selectedItems.includes(item.id));

      if (cartItems.length > 0) {
        this.displayOrderSummary(cartItems);
        const paymentInfo = await this.collectPaymentInfo(req);
        await this.placeOrder(paymentInfo, cartItems);
        res.status(200).send("Order placed and paid successfully");
      } else {
        res.status(200).send("No items selected for checkout");
      }
    } catch (error) {
      console.error("Error during checkout:", error.message);
      res.status(200).send("Error during checkout");
    }
  }

  // Get cart items
  async getCartItems(userId) {
    const cartItems = await Cart.findAll({ where: { userId } });
    return cartItems;
  }

  // Display order summary
  displayOrderSummary(cartItems) {
    console.log("Order Summary:");
    cartItems.forEach(item => {
      console.log(`Product: ${item.name}, Price: ${item.price}, Quantity: ${item.quantity}`);
    });
  }

  // Collect payment info
  async collectPaymentInfo(req) {
    const { address, paymentMode } = req.body;
    const paymentInfo = { address, paymentMode };
    return paymentInfo;
  }

  // Place order
  async placeOrder(paymentInfo, cartItems, userId) {
    // Calculate total price
    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Set status and payment mode
    const status = 1; // Processing
    const paymentMode = paymentInfo.payment_mode === 'Bank Transfer' ? 0 : 1;

    // Create order
    const order = {
      total_price: totalPrice,
      status: status,
      payment_mode: paymentMode,
      payment_date: new Date(),
      address: paymentInfo.address,
      id_user: userId
    };

    await Order.create(order);
  }

  // Update payment info for an order
  async updatePaymentInfo(req, res, next) {
    try {
      const orderId = req.params.orderId;
      const paymentInfo = req.body;

      const order = await Order.findOne({ where: { id: orderId } });

      if (order) {
        order.payment_mode = paymentInfo.payment_mode;
        order.payment_date = paymentInfo.payment_date;

        await order.save();
        res.send("Payment info updated for order");
      } else {
        res.status(404).send("Order not found");
      }
    } catch (error) {
      console.error("Error updating payment info for order:", error.message);
      res.status(400).send("Error updating payment info for order");
    }
  }

}

module.exports = new UserController;
