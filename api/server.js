import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import userRouter from "./admin-api/routes/user.route.js"
import authRouter from "./admin-api/routes/auth.route.js"
import testRouter from "./admin-api/routes/test.route.js"
import clientRouter from "./client-api/routes/client.route.js"
import productsRouter from "./admin-api/routes/product.route.js"
import cookieParser from "cookie-parser"

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
    origin: 'http://localhost:5173',
    credentials: true,
  };

const PORT = process.env.PORT || 5000

app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser());

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
app.use('/api/test', testRouter);
app.use('/api/products', productsRouter)