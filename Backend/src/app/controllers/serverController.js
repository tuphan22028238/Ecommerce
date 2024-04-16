const Product = require("../models/product");

class ServerController {
  //Some functions below are for testing
  async viewAllProduct(req, res, next) {
    try {
      const data = await Product.findAll();
      res.status(200).json(data);
    } catch (errors) {
      console.error("Error viewing all product:", errors.message);
      res.status(400).send("Error viewing all product");
    }
  }

  // Request imporved
  async addNewProduct(req, res, next) {
    try {
      const newProduct = await Product.create({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        unitInStock: req.body.unitInStock,
        typeId: 1,
      });

      if (newProduct !== null) {
        res.send("Add new product success");
      } else {
        res.send("Add new product failed");
      }
    } catch (error) {
      console.error("Error adding new product:", error.message);
      res.status(400).send("Error adding new product");
    }
  }

  async viewSpecificProduct(req, res, next) {
    try {
      const product = await Product.findOne({ where: { id: req.params.id } });
      if (product !== null) {
        res.send(product);
      } else {
        res.send("Product not found");
      }
    } catch (errors) {
      console.error("Error viewing specific product:", errors.message);
      res.status(400).send("Error viewing specific product");
    }
  }
}

module.exports = new ServerController();
