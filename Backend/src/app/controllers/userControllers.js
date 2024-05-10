const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Orders");
const OrderDetail = require("../models/OrdersDetail");
const Cart = require("../models/Cart");

class UserController {
  //-----------------------------------Handle Profile-----------------------------------------------------//
  // View profile
  async viewProfile(req, res, next) {
    try {
      const profile = await User.findOne({ where: { id: req.params.id } });
      res.send(profile);
    } catch (error) {
      console.error("Error getting profile:", error.message);
      res.status(500).send("Error getting profile");
    }
  }

  // Update profile
  async updateProfile(req, res, next) {
    try {
      const { name, email, phone, address } = req.body;
      const user = await User.findOne({ where: { id: req.params.id } });

      if (user) {
        user.name = name;
        user.email = email;
        user.phone = phone;
        user.address = address;
        await user.save();
        res.send("Profile updated successfully");
      } else {
        res.status(404).send("User not found");
      }
    } catch (error) {
      console.error("Error updating profile:", error.message);
      res.status(400).send("Error updating profile");
    }
  }

  //-----------------------------------Handle Cart-----------------------------------------------------//
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
  //-----------------------------------Handle Orders-----------------------------------------------------//

  // Checkout order
  async checkOutOrder(req, res, next) {
    try {
      const userId = req.params.id;
      let cartItems = await this.getCartSelectedItems(req, res, next);

      if (cartItems.length > 0) {
        const orderSummary = this.displayOrderSummary(cartItems);

        const paymentInfo = await this.collectPaymentInfo(req, res, next);

        const order = await this.placeOrder(paymentInfo, cartItems, userId);

        res.status(200).json({
          message: "Order placed and paid successfully",
          orderSummary: orderSummary,
          order: order
        });
      } else {
        res.status(200).json({
          message: "No items selected for checkout"
        });
      }
    } catch (error) {
      console.error("Error during checkout:", error.message);
      res.status(500).json({
        message: "Error during checkout",
        error: error.message
      });
    }
  }

  // Get cart items selected by user
  async getCartSelectedItems(req, res, next) {
    try {
      const userId = req.params.userId;
      const selectedItems = req.query.selectedItems ? req.query.selectedItems.split(',') : []; // Array of selected item ids from query params
      let cartItems = await Cart.findAll({ where: { userId } });
      cartItems = cartItems.filter(item => selectedItems.length === 0 || selectedItems.includes(item.id.toString()));
      res.status(200).json(cartItems);
    } catch (error) {
      console.error("Error getting cart items:", error.message);
      res.status(500).json({
        message: "Error getting cart items",
        error: error.message
      });
    }
  }

  // Display order summary
  async displayOrderSummary(req, res, next) {
    try {
      const userId = req.params.userId;
      let cartItems = await this.getCartItems(userId);
      let orderSummary = {
        totalItems: 0,
        totalPrice: 0,
        items: []
      };

      cartItems.forEach(item => {
        const total = item.price * item.quantity;
        orderSummary.items.push({
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          total: total
        });
        orderSummary.totalItems += item.quantity;
        orderSummary.totalPrice += total;
      });

      res.status(200).json(orderSummary);
    } catch (error) {
      console.error("Error getting order summary:", error.message);
      res.status(500).json({
        message: "Error getting order summary",
        error: error.message
      });
    }
  }

  async collectPaymentInfo(req, res, next) {
    try {
      const { address, paymentMode } = req.body;
      const paymentInfo = { address, paymentMode };
      res.status(200).json(paymentInfo);
    } catch (error) {
      console.error("Error collecting payment info:", error.message);
      res.status(500).json({
        message: "Error collecting payment info",
        error: error.message
      });
    }
  }

  // Place order
  async placeOrder(paymentInfo, cartItems, userId) {
    // Calculate total price
    const totalPrice = cartItems.reduce((sum, item) => sum + item.quantity * item.price, 0);

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

    const createdOrder = await Order.create(order);

    // Create order details
    for (const item of cartItems) {
      const orderDetail = {
        orderId: createdOrder.id,
        productId: item.productId,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        color: item.color,
        discount: item.discount
      };

      await OrderDetail.create(orderDetail);
    }

    // Update product quantities
    for (const item of cartItems) {
      const product = await Product.findOne({ where: { id: item.productId } });
      if (product) {
        product.unitInStock -= item.quantity;
        product.quantitySold += item.quantity;
        await product.save();
      }
    }

    return createdOrder;
  }

  // Get order summary for latest orders
  async getLatestOrderSummary(req, res, next) {
    try {
      const userId = req.params.id;
      let orderSummary = {
        totalItems: 0,
        totalPrice: 0,
        items: []
      };

      const latestOrder = await Order.findOne({ where: { id_user: userId }, order: [['createdAt', 'DESC']] });

      if (latestOrder) {
        // Get order details of the latest order
        const orderDetails = await OrderDetail.findAll({ where: { orderId: latestOrder.id } });

        for (const orderDetail of orderDetails) {
          const product = await Product.findOne({ where: { id: orderDetail.productId } });
          if (product) {
            const itemSummary = {
              productId: product.id,
              productName: product.name,
              quantity: orderDetail.quantity,
              unitPrice: orderDetail.unitPrice,
              color: orderDetail.color,
              discount: orderDetail.discount,
              total: orderDetail.quantity * orderDetail.unitPrice
            };
            orderSummary.items.push(itemSummary);
            orderSummary.totalItems += orderDetail.quantity;
            orderSummary.totalPrice += itemSummary.total;
          }
        }
      }

      res.send(orderSummary);
    } catch (error) {
      console.error("Error getting order summary:", error.message);
      res.status(500).send("Error getting order summary");
    }
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

  // Cancel order
  async cancelOrder(req, res) {
    try {
      const orderId = req.params.orderId;

      const order = await Order.findOne({ where: { id: orderId } });

      if (order) {
        // Update order status to cancelled
        order.status = 2;
        await order.save();

        // Get order items
        const orderItems = await OrderItem.findAll({ where: { orderId: orderId } });

        // Update product quantities
        for (const item of orderItems) {
          const product = await Product.findOne({ where: { id: item.productId } });
          if (product) {
            product.unitInStock += item.quantity;
            product.sold -= item.quantity;
            await product.save();
          }
        }

        res.send("Order cancelled successfully");
      } else {
        res.status(404).send("Order not found");
      }
    } catch (error) {
      console.error("Error cancelling order:", error.message);
      res.status(200).send("Error cancelling order");
    }
  }

  // View order history
  async viewOrderHistory(req, res) {
    try {
      const userId = req.params.id;
      const orders = await Order.findAll({ where: { userId, status: 2 } });
      res.send(orders);
    } catch (error) {
      console.error("Error viewing order history:", error.message);
      res.status(200).send("Error viewing order history");
    }
  }
  //-----------------------------------End-----------------------------------------------------//
}

module.exports = new UserController;
