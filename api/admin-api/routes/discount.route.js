import express from "express"
import {
  applyDiscount,
  createDiscount,
  deleteDiscountCode,
  getAllDiscounts,
  getDiscountByCode,
  getDiscountById,
  updateDiscountCode,
  validateDiscount,
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
  "/discountId/:id",
  verifyToken(["admin", "superadmin", "developer"]),
  deleteDiscountCode
)
router.put(
  "/code/:id",
  verifyToken(["admin", "superadmin", "developer"]),
  updateDiscountCode
)

router.post("/validate-discount", validateDiscount)
router.post("/apply-discount", applyDiscount)

export default router
