const Product = require("../models/Product");
const Type = require("../models/Type");
const { Op } = require("sequelize");

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
  // View products by type
  async viewProductsByType(req, res, next) {
    try {
      const productType = req.query.type;

      const products = await Product.findAll({
        where: {
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
  async viewProductsFollowPage(req, res, next) {
    try {
      const page = req.query.page ? parseInt(req.query.page) : 1;
      const limit = req.query.limit ? parseInt(req.query.limit) : 10;
      const offset = (page - 1) * limit;
      const sortBy = req.query.sort_by || 'name';
      const order = req.query.order || 'DESC';
      const category = req.query.category || null;

      const data = await Product.findAll({
        where: {
          ...category ? { typeId: category } : {},
          name: {
            [Op.like]: `%${req.query.search || ''}%`
          }
        },
        offset: offset,
        limit: limit,
        order: [[sortBy, order]]
      });

      const totalProducts = await Product.count()
      const total_pages = Math.ceil(totalProducts / limit)
      const pagination = {
        page,
        limit,
        total_pages
      }
      res.send({ products: data, page, pagination })

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

  async getCategory(req, res, next) {
    try {
      const category = await Type.findAll();
      res.send(category);
    } catch (errors) {
      console.error("Error getting category:", errors.message);
      res.status(400).send("Error getting category");
    }
  }
}

module.exports = new ServerController;
