import express from "express"
import {addItemInUsersCart, clearUserCart, editClient, getClientDetails, google, reduceItemQuantityFromCart, removeItemsFromUserCart, signinClient, signoutClient, signupClient } from "../controllers/client.controller.js"
// import { addItemInUsersCart } from "../controllers/order.controller.js"

const router = express.Router()

router.post("/signup", signupClient)
router.post("/signin", signinClient)
router.post("/signout", signoutClient)
router.post("/google", google)

router.get("/user/:id", getClientDetails)
router.put("/update/:id", editClient)

router.post("/cart/:id", addItemInUsersCart)
router.delete("/cart/:id", clearUserCart)
router.post("/cart/:id/remove", removeItemsFromUserCart)
router.post("/cart/:id/reduceQuantity", reduceItemQuantityFromCart)

export default router