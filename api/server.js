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
import discountRouter from "./admin-api/routes/discount.route.js"
import cookieParser from "cookie-parser"
import path from "path"

dotenv.config()

const app = express()
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB!")
  })
  .catch((err) => {
    console.log(err)
  })

const __dirname = path.resolve()

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:3002",
    "http://localhost:3003",
    "http://localhost:3004",
    "http://localhost:8000",
  ],
  credentials: true,
}

const PORT = process.env.PORT || 5000

app.use(express.urlencoded({ extended: false }))
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

app.use("/api/user", userRouter)
app.use("/api/auth", authRouter)
app.use("/api/auth/client", clientRouter)
app.use("/api/test", testRouter)
app.use("/api/products", productsRouter)
app.use("/api/orders", orderRouter)
app.use("/api/payment", paymentRouter)
app.use('/api/discount', discountRouter)

app.use(express.static(path.join(__dirname, "/client/dist")))

app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"))
})
