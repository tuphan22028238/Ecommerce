// const Product = require("../models/product");

// class ServerController {
//   //Some functions below are for testing
//   async viewAllProduct(req, res, next) {
//     try {
//       const data = await Product.findAll();
//       res.status(200).json(data);
//     } catch (errors) {
//       console.error("Error viewing all product:", errors.message);
//       res.status(400).send("Error viewing all product");
//     }
//   }

//   // Request imporved
//   async addNewProduct(req, res, next) {
//     try {
//       const newProduct = await Product.create({
//         name: req.body.name,
//         price: req.body.price,
//         description: req.body.description,
//         unitInStock: req.body.unitInStock,
//         typeId: 1,
//       });

//       if (newProduct !== null) {
//         res.send("Add new product success");
//       } else {
//         res.send("Add new product failed");
//       }
//     } catch (error) {
//       console.error("Error adding new product:", error.message);
//       res.status(400).send("Error adding new product");
//     }
//   }

//   async viewSpecificProduct(req, res, next) {
//     try {
//       const product = await Product.findOne({ where: { id: req.params.id } });
//       if (product !== null) {
//         res.send(product);
//       } else {
//         res.send("Product not found");
//       }
//     } catch (errors) {
//       console.error("Error viewing specific product:", errors.message);
//       res.status(400).send("Error viewing specific product");
//     }
//   }
// }

// module.exports = new ServerController();
const express = require("express");
const router = express.Router();
const { Product } = require("../models/product");

// Lấy tất cả sản phẩm
router.get("/", async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Lỗi máy chủ" });
  }
});

// Lấy một sản phẩm
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Không tìm thấy sản phẩm" });
    }
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Lỗi máy chủ" });
  }
});

// Tạo sản phẩm mới
router.post("/", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Yêu cầu không hợp lệ" });
  }
});

// Cập nhật sản phẩm
router.put("/:id", async (req, res) => {
  try {
    const [updatedRows] = await Product.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (updatedRows === 0) {
      return res.status(404).json({ error: "Không tìm thấy sản phẩm" });
    }
    res.json({ message: "Sản phẩm đã được cập nhật" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Yêu cầu không hợp lệ" });
  }
});

// Xóa sản phẩm
router.delete("/:id", async (req, res) => {
  try {
    const deletedRows = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (deletedRows === 0) {
      return res.status(404).json({ error: "Không tìm thấy sản phẩm" });
    }
    res.json({ message: "Sản phẩm đã được xóa" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Yêu cầu không hợp lệ" });
  }
});

module.exports = router;
