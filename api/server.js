import express from "express"
import mongoose from "mongoose"
import cors from "cors"

const app = express()

const PORT = 5000

app.use(cors())

app.listen(PORT, () => {console.log(`Server running on port:${PORT}`)})
