import { Schema, model } from "mongoose";

const BannerSchema = new Schema(
  {
    products: [{
      type: Schema.ObjectId,
      ref: "product",
    }],
  },
  { timestamps: true }
);

const BannerModule = model("banner", BannerSchema);

export default BannerModule;
