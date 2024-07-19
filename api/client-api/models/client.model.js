import mongoose from "mongoose"

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
  },
  { timestamp: true }
)

const Client = mongoose.model("Client", clientSchema)
export default Client
