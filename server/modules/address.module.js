import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "الرجاء ادخال البريد الالكتروني"],
    },
    name: String,
    phone: {
      type: String,
      required: [true, "الرجاء ادخال رقم الهاتف"],
    },
    city: {
      type: String,
      required: [true, "الرجاء ادخال المدينة"],
    },
    codePostal: Number,
    NotAuth: Number,
  },
  { timestamps: true }
);

const AddressModule = mongoose.model("address", AddressSchema);

export default AddressModule;
