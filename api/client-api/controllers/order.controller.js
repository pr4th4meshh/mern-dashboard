import Order from "../models/order.model.js"
import Client from "../models/client.model.js"

// Create a new order
export const createOrder = async (req, res) => {
  try {
    const { user, phoneNumber, deliveryAddress, products } = req.body

    if (
      !user ||
      !phoneNumber ||
      !deliveryAddress ||
      !products ||
      !products.length
    ) {
      return res.status(400).json({ message: "All fields are required" })
    }

    console.log("Received products:", products)

    const newOrder = new Order({ user, phoneNumber, deliveryAddress, products })
    await newOrder.save()

    // Optionally, update user details
    await Client.findByIdAndUpdate(user, { phoneNumber, deliveryAddress })

    res.status(201).json(newOrder)
  } catch (error) {
    res.status(500).json({ message: "Error creating order", error })
  }
}

// Get order status
export const getOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId)
    if (!order) {
      return res.status(404).json({ message: "Order not found" })
    }
    res.json({ status: order.status })
  } catch (error) {
    res.status(500).json({ message: "Error fetching order status", error })
  }
}

// Update order status
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body
    const order = await Order.findByIdAndUpdate(
      req.params.orderId,
      { status },
      { new: true }
    )
    if (!order) {
      return res.status(404).json({ message: "Order not found" })
    }
    res.json(order)
  } catch (error) {
    res.status(500).json({ message: "Error updating order status", error })
  }
}

// Get all orders for admin
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "username")
      .populate("products.product")
      .exec()
    res.status(200).json(orders)
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders", error })
  }
}

export const getAllUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.id })
      .populate({
        path: "products.product",
        select: "name description price category productImages",
      })
      .exec()

    if (!orders.length) {
      return res.status(404).json({ message: "No orders found" })
    }

    res.status(200).json(orders)
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error })
  }
}

export const cancelOrder = async (req, res, next) => {
  const { orderId } = req.body;

  try {
    const orderToBeCancelled = await Order.findByIdAndUpdate(
      orderId,
      { status: "cancelled" },
      { new: true }
    );

    if (!orderToBeCancelled) {
      return res.status(404).json({ message: "Order not found" });
    }

    console.log("Order cancelled:", orderToBeCancelled);
    res.status(200).json({ message: "Order cancelled successfully" });
  } catch (error) {
    next(error);
  }
}

