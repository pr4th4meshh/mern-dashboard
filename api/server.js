import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import userRouter from "./routes/user.route.js"
import authRouter from "./routes/auth.route.js"
import testRouter from "./routes/test.route.js"
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

const PORT = process.env.PORT || 5000

app.use(cors())
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
app.use('/api/test', testRouter);
