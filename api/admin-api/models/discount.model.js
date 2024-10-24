import mongoose from "mongoose"

const discountSchema = mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
    },
    discountType: {
      type: String,
      enum: ["percentage", "number"],
      default: "percentage",
      required: true,
    },
    discountValue: {
      type: String,
      required: true,
    },
    specialDiscount: {
      type: Boolean,
      required: true,
    },
    usageLimit: {
      type: Number,
      required: true,
    },
    usageCount: {
      type: Number,
      default: 0
    },
    minimumPriceToAvail: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
)

const Discount = mongoose.model("Discount", discountSchema)
export default Discount
