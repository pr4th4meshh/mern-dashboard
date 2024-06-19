import Product from "../models/product.model.js";

export const getAllProducts = async (req, res, next) => {
    try {
      const products = await Product.find().populate('createdBy', 'username').exec();
      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  };
  
  export const getProductByName = async (req, res, next) => {
    const { name } = req.params;
    try {
      const products = await Product.find({ name: { $regex: name, $options: "i" } })
        .populate("createdBy", "username")
        .exec();
      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  };

  export const getProductById = async (req, res, next) => {
    const productId = req.params.id;
    try {
      const product = await Product.findById(productId).populate('createdBy', 'username').exec();;
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  };
  
  export const createProduct = async (req, res, next) => {
    const { name, description, price } = req.body;
    const createdBy = req.user._id;
    try {
      const newProduct = new Product({
        name,
        description,
        price,
        createdBy
      });
      await newProduct.save();
      res.status(201).json(newProduct);
    } catch (error) {
      next(error);
    }
  };
  
  export const updateProduct = async (req, res, next) => {
    const productId = req.params.id;
    const { name, description, price } = req.body;
    const updatedBy = req.body._id
    try {
      const updatedProduct = await Product.findByIdAndUpdate(productId, {
        name,
        description,
        price,
        updatedBy
      }, { new: true });
      if (!updatedProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.status(200).json(updatedProduct);
    } catch (error) {
      next(error);
    }
  };
  
 export const deleteProduct = async (req, res, next) => {
    const productId = req.params.id;
    try {
      const deletedProduct = await Product.findByIdAndDelete(productId);
      if (!deletedProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
      next(error);
    }
  };