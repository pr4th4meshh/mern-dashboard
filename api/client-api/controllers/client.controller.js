import Client from "../models/client.model.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { errorHandler } from "../../utils/error.js"

export const signupClient = async (req, res, next) => {
  const { username, email, password, role } = req.body
  const hashedPassword = bcrypt.hashSync(password, 10)
  const newClient = new Client({
    username,
    email,
    password: hashedPassword,
    role,
  })
  try {
    await newClient.save()
    res.status(201).json("New user created successfully")
  } catch (error) {
    next(error)
  }
}

export const signinClient = async (req, res, next) => {
  const { email, password } = req.body
  try {
    const validClient = await Client.findOne({ email })
    if (!validClient) return next(errorHandler(404, "User not found"))
    const validPassword = bcrypt.compareSync(password, validClient.password)
    if (!validPassword) return next(errorHandler(404, "Invalid Credentials"))
    const token = jwt.sign(
      { id: validClient._id },
      "thisismyjwtsecretkeyforthisapp"
    )
    const { password: pass, ...rest } = validClient._doc
    res.cookie("access_token", token, { httpOnly: true }).status(200).json(rest)
  } catch (error) {
    next(error)
  }
}

export const signoutClient = async (req, res, next) => {
  try {
    res.clearCookie("access_token")
    res.status(200).json({ message: "User has been signed out..." })
  } catch (error) {
    next(error)
  }
}

export const getClientDetails = async (req, res, next) => {
  try {
    const user = await Client.findById(req.params.id)

    if (!user) return next(errorHandler(404, "User not found!"))

    const { password: pass, ...rest } = user._doc

    res.status(200).json(rest)
  } catch (error) {
    next(error)
  }
}

export const editClient = async (req, res) => {
  const userId = req.params.id
  const { username, email, password, avatar } = req.body

  try {
    // Prepare the update object
    const updateFields = {}
    if (username) updateFields.username = username
    if (email) updateFields.email = email
    if (avatar) updateFields.avatar = avatar
    if (password) {
      updateFields.password = await bcrypt.hash(password, 10)
    }

    // Update the client document using $set
    const updatedClient = await Client.findByIdAndUpdate(
      userId,
      { $set: updateFields },
      { new: true }
    ).select("-password") // Exclude the password field

    if (!updatedClient) {
      return res.status(404).json({ message: "User not found" })
    }

    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedClient })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const google = async (req, res, next) => {
  try {
    const user = await Client.findOne({ email: req.body.email })
    if (user) {
      const token = jwt.sign({ id: user._id }, "thisismyjwtsecretkeyforthisapp")
      const { password, ...rest } = user._doc
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json({ ...rest, token })
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8)
      const hashedPassword = bcrypt.hashSync(generatedPassword, 10)
      const newUser = new Client({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      })
      await newUser.save()
      const token = jwt.sign(
        { id: newUser._id },
        "thisismyjwtsecretkeyforthisapp"
      )
      const { password, ...rest } = newUser._doc
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json({ ...rest, token })
    }
  } catch (error) {
    next(error)
  }
}

export const addItemInUsersCart = async (req, res) => {
  try {
    const id = req.params.id
    const item = req.body

    console.log(`Received userId: ${id}`)
    console.log(`Received item: ${JSON.stringify(item)}`)

    const user = await Client.findById(id)

    if (!user) {
      console.log(`User not found with userId: ${id}`)
      return res.status(404).send("User not found")
    }

    const existingItemIndex = user.cart.findIndex(
      (cartItem) =>
        cartItem.productId.equals(item.productId) &&
        cartItem.selectedSize === item.selectedSize
    )

    if (existingItemIndex !== -1) {
      user.cart[existingItemIndex].quantity += item.quantity
    } else {
      user.cart.push(item)
    }

    await user.save()
    res.json(user)
  } catch (error) {
    console.error("Error updating user cart:", error)
    res.status(500).send("Server error")
  }
}


export const clearUserCart = async (req, res) => {
  try {
    const userId = req.params.id
    const user = await Client.findById(userId)
    if (!user) {
      return res.status(404).send("User not found")
    }
    user.cart = []
    await user.save()
    res.json({ msg: "Cart cleared successfully", cart: user.cart })
  } catch (error) {
    console.error("Error clearing user cart:", error)
    res.status(500).send("Server error")
  }
}

export const removeItemsFromUserCart = async (req, res) => {
  try {
    const userId = req.params.id
    const { productId, selectedSize } = req.body

    const user = await Client.findById(userId)
    if (!user) {
      return res.status(404).send("User not found")
    }

    const itemIndex = user.cart.findIndex(
      (cartItem) =>
        cartItem.productId === productId &&
        cartItem.selectedSize === selectedSize
    )

    if (itemIndex === -1) {
      return res.status(404).send("Item not found in cart")
    }

    user.cart.splice(itemIndex, 1)
    await user.save()
    res.json({ msg: "Item removed successfully", cart: user.cart })
  } catch (error) {
    console.error("Error removing item from user cart:", error)
    res.status(500).send("Server error")
  }
}
