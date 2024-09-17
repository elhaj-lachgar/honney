import { Schema, model } from "mongoose";

const CouponSchema = new Schema(
  {
    name: {
      type: String,
      unique: [true, "coupon must be unique"],
      required : [true , "coupon name is required"]
    },
    DeadTime: Date,
    discountPercentage: Number,
    countUser  : Number,
  },
  { timestamps: true }
);

const CouponModule = model("coupon", CouponSchema);

export default CouponModule;
