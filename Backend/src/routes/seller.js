const SellerController = require("../app/controllers/sellerControllers")

const express = require("express");
const route = express.Router();

route.get("/listProduct/:id", SellerController.viewListProduct);
route.delete("/deleteProduct/:id", SellerController.deleteProduct);
route.post("/addProduct", SellerController.addProduct);
route.get("/reqEdit/:id", SellerController.requestEditProduct);
route.put("/editProduct/:id", SellerController.editProduct);
route.post('/product-type', SellerController.addProductType);

route.get("/listProductOrders/:id", SellerController.viewListProductOrder);
route.get("/productOrdersDetail", SellerController.viewOrderDetail);
route.get("/viewConfirmedCustomers/:id", SellerController.viewConfirmedCustomers)
route.get("/viewPurchasedCustomers/:id", SellerController.viewConfirmedCustomers)
module.exports = route;