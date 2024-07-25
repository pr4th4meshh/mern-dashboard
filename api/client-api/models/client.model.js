import mongoose from "mongoose";

const clientSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      unique: true,
    },
    deliveryAddress: {
      type: String,
    },
    avatar: {
      type: String,
      default:
        "https://upload.wikimedia.org/wikipedia/commons/a/af/Default_avatar_profile.jpg",
    },
    cart: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        selectedSize: { type: String, required: true },
        quantity: { type: Number, required: true },
      }
    ],
    wishlist: {
      type: [String],
      default: []
    },
  },
  { timestamps: true }
);

const Client = mongoose.model("Client", clientSchema);
export default Client;
