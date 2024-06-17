import express from "express"
import {
  createProduct,
  getAllProducts,
  getProductById,
  deleteProduct,
  updateProduct,
} from "../controllers/product.controller.js"
import { verifyToken } from "../middlewares/authMiddleware.js"

const router = express.Router()

router.post("/create", verifyToken(["admin", "superadmin", "developer"]), createProduct)
router.get("/events", getAllProducts)
router.put("/update/:id", verifyToken(["admin", "superadmin", "developer"]), updateProduct)
router.delete(
  "/delete/:id",
  verifyToken(["admin", "superadmin", "developer"]),
  deleteProduct
)

export default router
