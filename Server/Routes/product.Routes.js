const express = require("express");
const { protect } = require("../Middleware/authMiddleware");
const { admin } = require("../Middleware/adminMiddleware");
const multer = require("multer");
const { getProduct, createProduct, updateProduct, deleteProduct, getProductById } = require("../Controllers/productController");
const upload = multer({dest:'upload/'}) 


const router = express.Router();
 router.route('/').get(getProduct).post(protect, admin, upload.single('image'), createProduct)
 router.route('/:id').get(getProductById).put(protect, admin, upload.single('image'), updateProduct).delete(protect,admin,deleteProduct);

 module.exports= router;