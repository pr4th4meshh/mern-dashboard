import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import userRouter from "./routes/user.route.js";

dotenv.config();

const app = express()
mongoose
  .connect("mongodb+srv://prathamesh:prathamesh@cluster0.vzdiphv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => {
    console.log("Connected to MongoDB!")
  })
  .catch((err) => {
    console.log(err)
  })

const PORT = process.env.PORT || 5000

app.use(cors())

app.listen(5000, () => {
  console.log(`Server running on port:${PORT}`)
})

app.use("/api/user", userRouter)
