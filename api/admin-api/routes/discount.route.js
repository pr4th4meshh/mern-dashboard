import express from "express"
import {
  createDiscount,
  deleteDiscountCode,
  getAllDiscounts,
  getDiscountByCode,
  getDiscountById,
  updateDiscountCode,
} from "../controllers/discount.controller.js"
import { verifyToken } from "../../middlewares/authMiddleware.js"

const router = express.Router()

router.post(
  "/create",
  verifyToken(["admin", "superadmin", "developer"]),
  createDiscount
)

router.get("/all", getAllDiscounts)
router.get("/code/:code", getDiscountByCode)
router.get("/id/:id", getDiscountById)
router.delete(
  "/code/:id",
  verifyToken(["admin", "superadmin", "developer"]),
  deleteDiscountCode
)
router.put(
  "/code/:id",
  verifyToken(["admin", "superadmin", "developer"]),
  updateDiscountCode
)

export default router
