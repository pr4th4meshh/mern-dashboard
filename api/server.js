import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import userRouter from "./admin-api/routes/user.route.js"
import authRouter from "./admin-api/routes/auth.route.js"
import testRouter from "./admin-api/routes/test.route.js"
import clientRouter from "./client-api/routes/client.route.js"
import orderRouter from "./client-api/routes/order.route.js"
import paymentRouter from "./client-api/routes/payment.route.js"
import productsRouter from "./admin-api/routes/product.route.js"
import cookieParser from "cookie-parser"

import Razorpay from "razorpay"
import crypto from "crypto"
dotenv.config()

const app = express()
mongoose
  .connect(
    "mongodb+srv://prathamesh:prathamesh@cluster0.vzdiphv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Connected to MongoDB!")
  })
  .catch((err) => {
    console.log(err)
  })

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:3000",
  ],
  credentials: true,
}

const PORT = process.env.PORT || 5000

app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500
  const message = err.message || "Internal Server Error"
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  })
})

app.listen(5000, () => {
  console.log(`Server running on port:${PORT}`)
})

app.post("/order", async (req, res) => {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET_KEY,
    });

    const options = req.body;
    const order = await razorpay.orders.create(options);

    if (!order) {
      return res.status(500).send("Error");
    }

    res.json(order);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error");
  }
});

app.post("/api/payment/verify", async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const sha = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
  //order_id + "|" + razorpay_payment_id
  sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  const digest = sha.digest("hex");
  if (digest !== razorpay_signature) {
    return res.status(400).json({ msg: "Transaction is not legit!" });
  }

  res.json({
    msg: "success",
    orderId: razorpay_order_id,
    paymentId: razorpay_payment_id,
  });
});

app.use("/api/user", userRouter)
app.use("/api/auth", authRouter)
app.use("/api/auth/client", clientRouter)
app.use("/api/test", testRouter)
app.use("/api/products", productsRouter)
app.use("/api/orders", orderRouter)
// app.use("/api/payment", paymentRouter )