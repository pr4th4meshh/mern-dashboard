import Discount from "../models/discount.model.js"

export const createDiscount = async (req, res, next) => {
  const {
    code,
    discountType,
    discountValue,
    specialDiscount,
    specialDiscountCode,
    usageLimit,
    minimumPriceToAvail,
    active,
  } = req.body
  const createdBy = req.user._id

  try {
    // check for existing discount code to avoid multiple coupons with same code
    const existingCouponCode = await Discount.findOne({ code })
    if (existingCouponCode) {
      return res.status(400).json({ message: "Coupon code already exists" })
    }

    // check for existing special discount code to avoid multiple coupons with same code
    const existingSpecialCouponCode = await Discount.findOne({
      specialDiscountCode,
    })
    if (existingSpecialCouponCode) {
      return res
        .status(400)
        .json({ message: "Special coupon code already exists" })
    }

    const newDiscount = new Discount({
      code,
      discountType,
      discountValue,
      specialDiscount,
      specialDiscountCode,
      usageLimit,
      minimumPriceToAvail,
      active,
      createdBy,
    })
    await newDiscount.save()
    res.status(200).json(newDiscount)
  } catch (error) {
    next(error)
  }
}

export const getAllDiscounts = async (req, res, next) => {
  try {
    const discounts = await Discount.find()
      .populate("createdBy", "username")
      .exec()
    res.status(200).json(discounts)
  } catch (error) {
    next(error)
  }
}

export const getDiscountByCode = async (req, res, next) => {
  const { code } = req.params
  try {
    const discount = await Discount.findOne({
      code: { $regex: code, $options: "i" },
    })
      .populate("createdBy", "username")
      .exec()

    if (!discount) {
      res.status(404).json({ message: "Discount code not found" })
    }
    res.status(200).json(discount)
  } catch (error) {
    next(error)
  }
}

export const getDiscountById = async (req, res, next) => {
  const discountId = req.params.id
  try {
    const discount = await Discount.findById(discountId)
      .populate("createdBy", "username")
      .exec()

    if (!discount) {
      res.status(404).json({ message: "Discount id not found" })
    }
    res.status(200).json(discount)
  } catch (error) {
    next(error)
  }
}

export const deleteDiscountCode = async (req, res, next) => {
  const discountId = req.params.id

  try {
    const discountToBeDeleted = await Discount.findByIdAndDelete(discountId)
    if (!discountToBeDeleted) {
      return res.status(404).json({ message: "Discount code not found" })
    }
    res
      .status(200)
      .json({ message: "Discount code has been successfully deleted" })
  } catch (error) {
    next(error)
  }
}

export const updateDiscountCode = async (req, res, next) => {
  const discountId = req.params.id
  const updatedBy = req.user._id
  const {
    code,
    discountType,
    discountValue,
    specialDiscount,
    specialDiscountCode,
    usageLimit,
    minimumPriceToAvail,
    active,
  } = req.body

  try {
    const discountCodeToBeUpdated = await Discount.findByIdAndUpdate(
      discountId,
      {
        code,
        discountType,
        discountValue,
        specialDiscount,
        specialDiscountCode,
        usageLimit,
        minimumPriceToAvail,
        active,
        updatedBy,
        updatedAt: Date.now(),
      },
      {
        new: true,
      }
    )
      .populate("updatedBy", "username")
      .exec()

    if (!discountCodeToBeUpdated) {
      return res.status(404).json({ message: "Product not found" })
    }

    res.status(200).json(discountCodeToBeUpdated)
  } catch (error) {
    next(error)
  }
}
