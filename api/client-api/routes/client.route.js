import express from "express"
import { editClient, getClientDetails, google, signinClient, signoutClient, signupClient } from "../controllers/client.controller.js"

const router = express.Router()

router.post("/signup", signupClient)
router.post("/signin", signinClient)
router.post("/signout", signoutClient)
router.post("/google", google)

router.get("/user/:id", getClientDetails)
router.put("/update/:id", editClient)

export default router