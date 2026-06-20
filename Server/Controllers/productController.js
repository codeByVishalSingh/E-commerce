const Product = require("../Models/productModel")
const cloudinary = require("../Config/cloudinary");


const getProduct = async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

const getProductById = async (req, res) => {
    try {
        // Fixed: req.param,id -> req.params.id
        const product = await Product.findById(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' }); // Fixed 'ststaus'
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' }); // Fixed 'ststaus'
    }
};

const createProduct = async (req, res) => {
    try {
       
     const { name, description, price, category, stock } = req.body;
        let imageUrl = '';

        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            imageUrl = result.secure_url;
        }

        const product = new Product({
            name, description, price, category, stock, imageUrl,
        });

        const savedProduct = await product.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        console.error("FULL ERROR:", error); 
        res.status(500).json({ message: error.message }); 
    }
};

const updateProduct = async (req, res) => {
    try {
        const { name, description, price, category, stock } = req.body;
        const product = await Product.findById(req.params.id);
        
        if (product) {
            product.name = name || product.name;
            product.description = description || product.description;
            product.price = price || product.price;
            product.category = category || product.category;
            product.stock = stock || product.stock;

            if (req.file) {
                const result = await cloudinary.uploader.upload(req.file.path);
                product.imageUrl = result.secure_url;
            }
            const updatedProduct = await product.save();
            res.json(updatedProduct);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteProduct = async (req, res) => {
    try {
        // Fixed: req.param.id -> req.params.id
        const product = await Product.findById(req.params.id);
        if (product) {
            await product.deleteOne();
            res.json({ message: 'Product Removed Successfully' });
        } else {
            res.status(404).json({ message: 'Product not Found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getProduct, getProductById, createProduct, updateProduct, deleteProduct };