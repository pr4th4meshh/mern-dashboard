import express from "express"
import {
  createProduct,
  getAllProducts,
  deleteProduct,
  updateProduct,
  getProductByName,
  getProductById,
  getProductsByCategory,
} from "../controllers/product.controller.js"
import { verifyToken } from "../../middlewares/authMiddleware.js"

const router = express.Router()

router.post("/create", verifyToken(["admin", "superadmin", "developer"]), createProduct)
router.get("/all", getAllProducts)
router.put("/update/:id", verifyToken(["admin", "superadmin", "developer"]), updateProduct)
router.get("/product/:name", getProductByName)
router.get("/product/id/:id", getProductById)
router.get("/category/:category", getProductsByCategory)
router.delete(
  "/delete/:id",
  verifyToken(["admin", "superadmin", "developer"]),
  deleteProduct
)

export default router
