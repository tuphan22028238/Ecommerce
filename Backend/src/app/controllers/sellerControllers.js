const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Orders");
const OrderDetail = require("../models/OrdersDetail");
const ImageProduct = require("../models/ImageProduct");
const Cart = require("../models/Cart");
const Type = require("../models/Type");
const PossesProduct = require("../models/PossesProduct")
class SellerController {
  //----------------------------------------Handle Product---------------------------------------------------------//
  async viewListProduct(req, res, next) {
    try {
      // let listProduct = []
      // const myProduct = await PossesProduct.findAll({ where: { userId: req.params.id } });
      // for (let i = 0; i < myProduct.length; i++) {
      //   const product = await Product.findOne({ where: { id: myProduct[i].dataValues.productId } });
      //   listProduct.push(product);
      // }
      const myProduct = await Product.findAll({ where: { sellerId: req.params.id } });
      res.send(myProduct);
    } catch (errors) {
      console.error("Error viewing product:", errors.message);
      res.status(400).send("Error viewing product");
    }
  }

  async viewProductType(req, res, next) {
    try {
      const types = await Type.findAll();

      res.send(types);
    } catch (error) {
      console.error("Error viewing product types:", error.message);
      res.status(400).send("Error viewing product types");
    }
  }

  async addProduct(req, res, next) {
    try {
      const product = await Product.create(req.body);
      // const possesProduct = await PossesProduct.create({
      //   userId: req.body.idSeller,
      //   productId: product.id
      // });

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

      // await PossesProduct.findAll({ where: { productId: product.id } }).then(possesProducts => {
      //   possesProducts.forEach(possesProduct => {
      //     possesProduct.destroy();
      //   });
      // });

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
  // Update product quantity
  async updateProductQuantity(req, res, next) {
    try {
      const sellerId = req.params.id;
      const productId = req.body.productId;
      const newQuantity = req.body.quantity;

      const product = await Product.findOne({ where: { id: productId, sellerId: sellerId } });

      if (!product) {
        return res.status(404).send({ message: "Product not found" });
      }

      product.quantity = newQuantity;
      await product.save();

      res.status(200).send({ message: "Product quantity updated successfully" });
    } catch (error) {
      console.error("Error updating product quantity:", error.message);
      res.status(500).send({
        message: "Error updating product quantity",
        error: error.message
      });
    }
  }
  //-----------------------------------------Handle Order--------------------------------------------------------//
  // View list product being ordered
  async viewListProductsWithOrders(req, res, next) {
    try {
      const listProduct = []
      const myProduct = await Product.findAll({ where: { sellerId: req.params.id } });
      for (let i = 0; i < myProduct.length; i++) {
        const product = await OrderDetail.findAll({ where: { productId: myProduct[i].dataValues.id } });
        listProduct.push(product);
      }
      res.send(listProduct);
    }
    catch (errors) {
      console.error("Error viewing product:", errors.message);
      res.status(400).send("Error viewing product");
    }
  }
  // Redirect to order detail by product id
  async viewOrderDetailsOfProduct(req, res, next) {
    try {
      const orderDetails = await OrderDetail.findAll({
        where: { productId: req.params.productId },
      });

      const detailedOrderDetails = await Promise.all(orderDetails.map(async detail => {
        const order = await Order.findOne({ where: { id: detail.orderId } });
        const buyer = await User.findByPk(order.userId);

        return {
          orderDetail: detail,
          order: order,
          buyer: buyer
        };
      }));

      res.send(detailedOrderDetails);
    }
    catch (errors) {
      console.error("Error viewing order detail:", errors.message);
      res.status(400).send("Error viewing order detail");
    }
  }
  // Confirm order
  async confirmOrder(req, res, next) {
    try {
      const orderDetailId = req.params.orderDetailId;
      const productId = req.params.productId;
      const orderDetail = await OrderDetail.findOne({ where: { id: orderDetailId, productId } });

      if (!orderDetail) {
        res.status(404).send("Order detail not found or you do not have permission to confirm this order");
        return;
      }

      await orderDetail.update({ status: 1 });

      res.send(orderDetail);
    } catch (errors) {
      console.error("Error confirming order:", errors.message);
      res.status(400).send("Error confirming order");
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

  //View specific OrderDetail
  async viewSpecificOrderDetail(req, res, next) {
    try { 
      const orderDetail = await OrderDetail.findOne({ where: { id: req.params.id } });
      const product = await Product.findOne({ where: { id: orderDetail.productId } });
      const orders = await Order.findOne({ where: { id: orderDetail.orderId } });
      const buyer = await User.findOne({ where: { id: orders.userId } });
      res.send({ orderDetail, product, buyer, orders });
    } catch (errors) {
      console.error("Error viewing order detail:", errors.message);
      res.status(400).send("Error viewing order detail");
    }
  }
  // View confirmed customers
  async viewConfirmedCustomers(req, res, next) {
    try {
      const sellerId = req.params.id;

      const products = await Product.findAll({ where: { sellerId: sellerId } });

      const productIds = [...new Set(products.map(product => product.id))];

      const orderDetails = await OrderDetail.findAll({ where: { productId: productIds } });

      const orderIds = [...new Set(orderDetails.map(orderDetail => orderDetail.orderId))];

      const orders = await Order.findAll({ where: { id: orderIds } });

      const customerIds = [...new Set(orders.map(order => order.userId))];

      const confirmedCustomers = [];
      for (let id of customerIds) {
        const customer = await User.findOne({ where: { id: id, status: 1 } });
        if (customer) {
          confirmedCustomers.push(customer);
        }
      }

      res.status(200).send(confirmedCustomers);
    } catch (error) {
      console.error("Error viewing confirmed customers:", error.message);
      res.status(500).send({
        message: "Error viewing confirmed customers",
        error: error.message
      });
    }
  }
  // View customer's purchased items and their details
  async viewPurchasedCustomers(req, res, next) {
    try {
      const customerId = req.params.id;
      const sellerId = req.params.id;

      const orders = await Order.findAll({ where: { userId: customerId } });

      const purchasedCustomers = [];
      for (let order of orders) {
        const orderDetails = await OrderDetail.findAll({ where: { orderId: order.id, sellerId: sellerId } });
        for (let detail of orderDetails) {
          const product = await Product.findOne({ where: { id: detail.productId } });
          purchasedCustomers.push({
            order: order,
            orderDetail: detail,
            product: product
          });
        }
      }

      res.status(200).send(purchasedCustomers);
    } catch (error) {
      console.error("Error viewing customer purchases:", error.message);
      res.status(500).send({
        message: "Error viewing customer purchases",
        error: error.message
      });
    }
  }
  // Get products by type
  async getProductsByType(req, res, next) {
    try {
      const sellerId = req.params.id;
      const productType = req.query.type;

      const products = await Product.findAll({
        where: {
          sellerId: sellerId,
          typeId: productType
        }
      });

      if (!products.length) {
        return res.status(404).send({ message: "No products found" });
      }

      res.status(200).send(products);
    } catch (error) {
      console.error("Error fetching products by type:", error.message);
      res.status(500).send({
        message: "Error fetching products by type",
        error: error.message
      });
    }
  }
  // Get best selling products
  async getBestSellingProducts(req, res, next) {
    try {
      const sellerId = req.params.id;

      const products = await Product.findAll({
        where: {
          sellerId: sellerId
        }
      });

      if (!products.length) {
        return res.status(404).send({ message: "No products found" });
      }

      const productIds = [...new Set(products.map(product => product.id))];

      const orderDetails = await OrderDetail.findAll({ where: { productId: productIds } });

      const bestSellingProducts = [];
      for (let productId of productIds) {
        const productOrderDetails = orderDetails.filter(orderDetail => orderDetail.productId === productId);
        const product = await Product.findOne({ where: { id: productId } });
        const totalQuantity = productOrderDetails.reduce((total, orderDetail) => total + orderDetail.quantity, 0);
        bestSellingProducts.push({
          product: product,
          totalQuantity: totalQuantity
        });
      }

      bestSellingProducts.sort((a, b) => b.totalQuantity - a.totalQuantity);

      res.status(200).send(bestSellingProducts);
    } catch (error) {
      console.error("Error fetching best selling products:", error.message);
      res.status(500).send({
        message: "Error fetching best selling products",
        error: error.message
      });
    }
  }
  // Get best selling products by type
  async getBestSellingProductsByType(req, res, next) {
    try {
      const sellerId = req.params.id;
      const productType = req.query.type;

      const products = await Product.findAll({
        where: {
          sellerId: sellerId,
          typeId: productType
        }
      });

      if (!products.length) {
        return res.status(404).send({ message: "No products found" });
      }

      const productIds = [...new Set(products.map(product => product.id))];

      const orderDetails = await OrderDetail.findAll({ where: { productId: productIds } });

      const getBestSellingProductsByType = [];
      for (let productId of productIds) {
        const productOrderDetails = orderDetails.filter(orderDetail => orderDetail.productId === productId);
        const product = await Product.findOne({ where: { id: productId } });
        const totalQuantity = productOrderDetails.reduce((total, orderDetail) => total + orderDetail.quantity, 0);
        getBestSellingProductsByType.push({
          product: product,
          totalQuantity: totalQuantity
        });
      }

      getBestSellingProductsByType.sort((a, b) => b.totalQuantity - a.totalQuantity);

      res.status(200).send(getBestSellingProductsByType);
    } catch (error) {
      console.error("Error fetching best selling products:", error.message);
      res.status(500).send({
        message: "Error fetching best selling products",
        error: error.message
      });
    }
  }
}

module.exports = new SellerController;
