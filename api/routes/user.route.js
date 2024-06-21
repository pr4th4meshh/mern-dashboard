import express from "express"
import { editUser, getUserDetails, test } from "../controllers/user.controller.js"

const router = express.Router()

router.get("/test", test)
router.put('/update/:id', editUser);
router.get("/user/:id", getUserDetails)

export default router;