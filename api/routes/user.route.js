import express from "express"
import { editUser, getAllUsers, getUserDetails, test } from "../controllers/user.controller.js"

const router = express.Router()

router.get("/test", test)
router.put('/update/:id', editUser);
router.get("/user/:id", getUserDetails)
router.get("/all", getAllUsers)

export default router;