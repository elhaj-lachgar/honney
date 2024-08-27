import mongoose from "mongoose";
import encrypt from "bcryptjs";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "الرجاء ادخال الاسم"],
    },
    email: {
      type: String,
      required: [true, "الرجاء ادخال البريد الالكتروني"],
      unique: [true, "هذا البريد الالكتروني موجود"],
    },
    password: String,
    isValidSign: {
      type: Boolean,
      default: false,
    },
    resetCodeSign: String,
    avatar: String,
    resetCode: String,
    changePassword_At: Date,
    resetCode_At: Date,
    isResetCode: {
      type: Boolean,
      default: false,
    },
    isResetCode_At: Date,
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    product_reviews_allwod: [
      { type: mongoose.Schema.ObjectId, ref: "product" },
    ],
    userOrder: [{ type: mongoose.Schema.ObjectId, ref: "order" }],
  },
  { timestamps: true }
);

UserSchema.pre("save", function (next) {
  if (this.isNew || this.isModified("password")) {
    this.password = encrypt.hashSync(this.password, 12);
  }
  return next();
});

const UserModule = mongoose.model("user", UserSchema);

export default UserModule;
