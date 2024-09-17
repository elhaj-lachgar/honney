import mongoose, { Schema } from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    address: {
      type: mongoose.Schema.ObjectId,
      ref: "address",
      required: [true, "الرجاء ادخال البريد الالكتروني"],
    },
    products: [
      {
        product: {
          type: mongoose.Schema.ObjectId,
          ref: "product",
        },
        quantity: {
          type: Number,
          default: 1,
        },
        productQuantity: {
          number: Number,
          quantity: Number,
        },
      },
    ],

    totalePrice: {
      type: Number,
    },
    currency: {
      type: String,
      enum: ["MAD", "EUR", "USD"],
      default: "MAD",
    },
    isDelaiverd: {
      type: Boolean,
      default: false,
    },

    Delaiverd_At: Date,
    coupon: {
      type: Schema.ObjectId,
      ref: "coupon",
    },
    
  },
  { timestamps: true }
);

const OrderModule = mongoose.model("order", OrderSchema);

export default OrderModule;
