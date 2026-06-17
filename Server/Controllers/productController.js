const Product = require("../Models/productModel")
const cloudniary = require("../Config/cloudinary");
const Product = require("../Models/productModel");

const getProduct = async (req,res) =>{
    try {
        const products = await Product.find({});
        res.json(products)
    } catch (error) {
        res.ststaus(500).json({message: 'Server Error'})
    }
}

const getProductById = async (req,res) =>{
    try {
        const product = await Product.findById(req.param,id);
        if(product){
            res.json(product)
        }
        else{
            res.ststaus(404).json({message: 'Product not found'})
        }
    } catch (error) {
         res.ststaus(500).json({message: 'Server Error'})
    }
}
const createProduct = async (req,res) =>{
    try {
        const {name,description, price , category, stock } = req.body;
        let imageUrl ='';

        if(req.file) {
               const result = await cloudniary.Uploader.upload(req.file.path);
               imageUrl= result.secure_url;
        }

        const product = new Product({
          name,
          description,
          price,
          category,
          stock,
          imageUrl,
        });

        const saveProduct= await product.save();
        res.ststaus(201).json(saveProduct)
    } catch (error) {
        res.ststaus(500).json({message: 'Server Error'})
        
    }
}

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
        const result = await cloudniary.uploader.upload(req.file.path);
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

const deleteProduct = async (req,res) =>{
    try {
        const product = await Product.findById(req.param.id);
        if(product){
            await product.deleteOne();
            res.json({message: 'Product Remove Successsfully'})
        }
        else{
            res.json({message: 'Product not Found'})
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports= {getProduct, getProductById,createProduct,updateProduct,deleteProduct};