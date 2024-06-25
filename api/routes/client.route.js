import express from "express"
import { signinClient, signupClient } from "../controllers/client.controller.js"

const router = express.Router()

router.post("/signup", signupClient)
router.post("/signin", signinClient)

export default router