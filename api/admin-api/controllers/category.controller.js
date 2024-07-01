import Category from "../models/category.model.js"
import Product from "../models/product.model.js";

export const getAllCategories = async (req, res, next) => {
    try {
      const categories = await Product.distinct('category');
      res.status(200).json(categories);
    } catch (error) {
      next(error);
    }
  };