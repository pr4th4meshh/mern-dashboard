import express from "express"
import {
  createProduct,
  getAllProducts,
  deleteProduct,
  updateProduct,
  getProductByName,
  getProductById,
  getProductsByCategory,
  addRating,
  getRatings,
} from "../controllers/product.controller.js"
import { verifyToken } from "../../middlewares/authMiddleware.js"
import { getAllCategories } from "../controllers/category.controller.js"

const router = express.Router()

router.post("/create", verifyToken(["admin", "superadmin", "developer"]), createProduct)
router.get("/all", getAllProducts)
router.put("/update/:id", verifyToken(["admin", "superadmin", "developer"]), updateProduct)
router.get("/product/:name", getProductByName)
router.get("/product/id/:id", getProductById)
router.get("/category/:category", getProductsByCategory)
router.get("/categories/all", getAllCategories)
router.delete(
  "/delete/:id",
  verifyToken(["admin", "superadmin", "developer"]),
  deleteProduct
)
router.post("/:id/addRatings", addRating)
router.get("/:id/ratings", getRatings)

export default router
