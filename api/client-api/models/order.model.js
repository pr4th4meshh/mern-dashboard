import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
    required: true,
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      selectedSize: {
        type: String,
        required: true,
      }
    },
  ],
  phoneNumber: {
    type: String,
    required: true,
  },
  deliveryAddress: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: [
      "order confirmed",
      "processing order",
      "order out for delivery",
      "order delivered",
      "cancelled" // only on client side
    ],
    default: "order confirmed",
  },
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
export default Order;