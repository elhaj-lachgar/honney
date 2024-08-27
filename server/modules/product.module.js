import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "الرجاء ادخال الاسم"],
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "category",
      required: [true, "الرجاء ادخال اسم الصنف"],
    },
    imageUrls: [String],
    subDescription: {
      type: String,
    },
    description: String,
    price: {
      type: Number,
      required: [true, "الرجاء ادخال السعر"],
    },
    discountPercentage: {
      type: Number,
      default: 0,
    },
    discountPrice: Number,
    currency: {
      type: String,
      enum: ["MAD", "USD", "EUR"],
      default: "MAD",
    },
    stock: {
      type: Number,

      default: 0,
    },
    productQuantity: [
      {
        quantity: {
          type: Number,
          default: 250,
        },
        number: {
          type: Number,
          default: 1,
        },
      },
    ],
    productRate: {
      type: Number,
      default: 0,
    },
    rating_info: {
      five_star: {
        type: Number,
        default: 0,
      },
      four_star: {
        type: Number,
        default: 0,
      },
      three_star: {
        type: Number,
        default: 0,
      },
      two_star: {
        type: Number,
        default: 0,
      },
      one_star: {
        type: Number,
        default: 0,
      },
    },
    reviews: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "review",
      },
    ],
  },
  { timestamps: true }
);

const ProductModule = mongoose.model("product", ProductSchema);

export default ProductModule;
