import Razorpay from "razorpay"
import crypto from "crypto"

// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_SECRET_KEY,
// })

export const createOrder = async (req, res) => {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET_KEY,
    })

    const options = req.body
    const order = await razorpay.orders.create(options)

    if (!order) {
      return res.status(500).send("Error")
    }

    res.json(order)
  } catch (err) {
    console.log(err)
    res.status(500).send("Error")
  }
}

export const verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body

  const sha = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET)
  //order_id + "|" + razorpay_payment_id
  sha.update(`${razorpay_order_id}|${razorpay_payment_id}`)
  const digest = sha.digest("hex")
  if (digest !== razorpay_signature) {
    return res.status(400).json({ msg: "Transaction is not legit!" })
  }

  res.json({
    msg: "success",
    orderId: razorpay_order_id,
    paymentId: razorpay_payment_id,
  })
}
