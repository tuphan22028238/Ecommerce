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
      const { username, name, email, phone, address, dob } = req.body;
      const user = await User.findOne({ where: { id: req.params.id } });

      if (user) {
        user.username = username;
        user.name = name;
        user.email = email;
        user.phone = phone;
        user.address = address;
        user.dob = dob;
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
        const cartDetails = await Cart.findOne({ where: { userId: req.params.id, productId: product.id } });
        if (product) {
          myCart.push({product, cartDetails});
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
      } else {
        product.quantity += quantity;
        await product.save();
        res.status(200).send("Product quantity updated in cart");
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
          userId: req.params.userId,
          productId: req.params.productId,
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
  // Get product details
  async getProductDetails(req, res, next) {
    try {
      const productId = req.params.id;
      const product = await Product.findOne({ where: { id: productId } });

      if (product) {
        res.send(product);
      } else {
        res.status(404).send("Product not found");
      }
    } catch (error) {
      console.error("Error getting product details:", error.message);
      res.status(500).send("Error getting product details");
    }
  }
  //-----------------------------------Handle Orders-----------------------------------------------------//

  // Checkout order
  async checkOutOrderFromCart(req, res, next) {
    try {
      const userId = req.params.id;

      const selectedItems =  req.body.productIds;
      let cartItems;
      if (selectedItems.length === 0) {
        cartItems = await Cart.findAll({ where: { userId: userId } });
      } else {
        cartItems = await Cart.findAll({
          where: {
            userId: userId,
            productId: selectedItems
          }
        });
      }
      if (cartItems.length > 0) {
        // Display order summary
        const orderSummary = {
          totalItems: 0,
          totalPrice: 0,
          items: []
        };

        for (const item of cartItems) {
          const product = await Product.findOne({ where: { id: item.productId } });
          const totalCostForItems = product.price * item.quantity;
          orderSummary.items.push({
            name: product.name,
            price: product.price,
            quantity: item.quantity,
            total: totalCostForItems
          });
          orderSummary.totalItems += item.quantity;
          orderSummary.totalPrice += totalCostForItems;
        };

        // Collect payment info
        const { address, paymentMode } = req.body;
        const paymentInfo = { address, paymentMode };

        // Place order
        const status = 1; // Processing

        const order = {
          totalPrice: orderSummary.totalPrice,
          status: status,
          paymentMode: paymentMode,
          paymentDate: new Date(),
          address: paymentInfo.address,
          userId: userId
        };
        const createdOrder = await Order.create(order);

        // Create order details and update product quantities
        for (const item of cartItems) {
          const product = await Product.findOne({ where: { id: item.productId } });
          if (product) {
            const orderDetail = {
              orderId: createdOrder.id,
              productId: item.productId,
              quantity: item.quantity,
              unitPrice: product.price,
              color: item.color,
              discount: item.discount
            }
            await OrderDetail.create(orderDetail);
            // Update product quantities
            product.unitInStock -= item.quantity;
            product.quantitySold += item.quantity;
            await product.save();
          }
        }

        res.status(200).send({
          message: "Order placed and paid successfully",
          orderSummary: orderSummary,
          order: createdOrder
        });
      } else {
        res.status(200).send({
          message: "No items selected for checkout"
        });
      }
    } catch (error) {
      console.error("Error during checkout:", error.message);
      res.status(500).send({
        message: "Error during checkout",
        error: error.message
      });
    }
  }

  async getPrepareOrderFromCart(req, res, next) {
    try {
      const userId = req.params.id;
      const BuyProducts = req.body.productIds;
      const preparedOrder = []
      for (const productId of BuyProducts) {
        const productToBuy = {}
        const product = await Product.findOne({ where: { id: productId } });
        const productInCart = await Cart.findOne({ where: { userId: userId, productId: productId } }); 

        productToBuy.productId = product.id;
        productToBuy.name = product.name;
        productToBuy.quantity = productInCart.quantity;
        productToBuy.price = product.price;
        productToBuy.color = productInCart.color;
        productToBuy.discount = productInCart.discount;
        
        preparedOrder.push(productToBuy);
      }
      res.send(preparedOrder);
    } catch (error) {
      console.error("Error getting prepare orders:", error.message);
    }
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
              image: product.image,
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
      const orderId = req.params.id;
      const paymentInfo = req.body;

      const order = await Order.findOne({ where: { id: orderId } });

      if (order) {
        order.paymentMode = paymentInfo.paymentMode;
        order.paymentDate = paymentInfo.paymentDate;

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
  async cancelOrder(req, res, next) {
    try {
      const orderDetailId = req.params.id;

      const order = await OrderDetail.findOne({ where: { id: orderDetailId } });

      if (order) {
        // Update order status to cancelled
        order.status = 2;
        await order.save();

        // Get order items
        const orderItems = await Product.findOne({ where: { id : order.productId } });

        // Update product quantities
        orderItems.unitInStock += order.quantity;
        orderItems.quantitySold -= order.quantity;
        await orderItems.save();

        res.send("Order cancelled successfully");
      } else {
        res.status(404).send("Order not found");
      }
    } catch (error) {
      console.error("Error cancelling order:", error.message);
      res.status(400).send("Error cancelling order");
    }
  }

  // View order history
  async viewOrderHistory(req, res, next) {
    try {
      const userId = req.params.id;
      const orders = await Order.findAll({ where: { userId, status: 2 } });
      res.send(orders);
    } catch (error) {
      console.error("Error viewing order history:", error.message);
      res.status(400).send("Error viewing order history");
    }
  }
  // View order status
  async viewOrder(req, res, next) {
    try {
      const userId = req.params.id;
      const allOrder = []

      const orders = await Order.findAll({ where: { userId } });
      for (const order of orders) {
        const orderDetails = await OrderDetail.findAll({ where: { orderId: order.id } });
        for (const orderDetail of orderDetails) {
          const product = await Product.findOne({ where: { id: orderDetail.productId } });
          allOrder.push({order, orderDetail, product});
        }
      }

      res.send(allOrder);
    } catch (errors) {
      console.error("Error viewing order status:", errors.message);
      res.status(400).send("Error viewing order status");
    }
  }
  //-----------------------------------End-----------------------------------------------------//
}

module.exports = new UserController;
