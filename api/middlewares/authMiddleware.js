import jwt from "jsonwebtoken"
import User from "../models/user.model.js"

export const verifyToken = (roles) => async (req, res, next) => {
  const token = req.cookies.access_token
  if (!token) return res.status(401).json({ message: "Unauthorized" })

  try {
    const decoded = jwt.verify(token, "thisismyjwtsecretkeyforthisapp")
    const user = await User.findById(decoded.id)
    if (!roles.includes(user.role)) {
      return res.status(403).json({ message: "Forbidden" })
    }
    req.user = user
    next()
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" })
  }
}
