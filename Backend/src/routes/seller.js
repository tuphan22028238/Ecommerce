const SellerController = require("../app/controllers/sellerControllers")

const express = require("express");
const route = express.Router();

route.get("/listProduct/:id", SellerController.viewListProduct);
route.delete("/deleteProduct/:id", SellerController.deleteProduct);
route.post("/addProduct", SellerController.addProduct);
route.get("/reqEdit/:id", SellerController.requestEditProduct);
route.put("/editProduct/:id", SellerController.editProduct);

route.get("/listOrders/:id", SellerController.viewListProductsWithOrders);
route.get("/orderDetail/:productId", SellerController.viewOrderDetailsOfProduct);
route.put("/confirmOrder/:orderDetailId/:productId", SellerController.confirmOrder);
route.put("/cancelOrder/:id", SellerController.cancelOrder);

route.get("/viewConfirmedCustomers/:id", SellerController.viewConfirmedCustomers);
route.get("/viewSpecificOrderDetail/:id", SellerController.viewSpecificOrderDetail);
route.get("/viewPurchasedCustomers/:id", SellerController.viewConfirmedCustomers)
route.get("/viewProductsByType/:id", SellerController.getProductsByType)
route.get("/viewBestSellingProducts/:id", SellerController.getBestSellingProducts)
route.get("/viewBestSellingProductsByType/:id", SellerController.getBestSellingProductsByType)
module.exports = route;