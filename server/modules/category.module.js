import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: [true, "اسم ادخال اسم الصنف"],
      required: [true, "الرجاء ادخال الاسم"],
    },
    description: String,
    image: String,
  },
  { timestamps: true }
);

const CategoryModule = mongoose.model("category", CategorySchema);

export default CategoryModule;
