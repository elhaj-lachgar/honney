import { check } from "express-validator";
import ValidatorMiddleware from "../../middlewares/validator-middleware.js";
import mongoose from "mongoose";

export const CreateAddressValidator = [
  check("email")
    .notEmpty()
    .withMessage("المرجو ادخال البريد الالكتروني")
    .isEmail()
    .withMessage("بريد الكتروني غير صالح"),

  check("name").notEmpty().withMessage("المرجو ادخال الاسم"),

  check("phone").notEmpty().withMessage("المرجو ادخال رقم الهاتف"),

  check("state").notEmpty().withMessage("المرجو ادخال الجهة"),

  check("city").notEmpty().withMessage("المرجو ادخال المدينة"),

  ValidatorMiddleware,
];

export const UpdateAddressValidator = [
  check("addressId")
    .notEmpty()
    .withMessage("المرجو ادخال عنوان")
    .isMongoId()
    .withMessage("عنوان غير صالح"),
  ValidatorMiddleware,
];

export const DeleteAddressValidator = [
  check("addressId")
    .notEmpty()
    .withMessage("المرجو ادخال عنوان")
    .isMongoId()
    .withMessage("عنوان غير صالح"),
  ValidatorMiddleware,
];

export const GetAddressValidator = [
  check("addressId")
    .notEmpty()
    .withMessage("المرجو ادخال عنوان")
    .isMongoId()
    .withMessage("عنوان غير صالح"),
  ValidatorMiddleware,
];

export const CreateAddressAuthValidator = [
  check("phone").notEmpty().withMessage("المرجو ادخال رقم الهاتف"),

  check("state").notEmpty().withMessage("المرجو ادخال الجهة"),

  check("city").notEmpty().withMessage("المرجو ادخال المدينة"),

  ValidatorMiddleware,
];

export const CreateAddressNotAuthValidator = [
  check("email")
    .notEmpty()
    .withMessage("المرجو ادخال البريد الالكتروني")
    .isEmail()
    .withMessage("بريد الكتروني غير صالح"),

  check("name").notEmpty().withMessage("المرجو ادخال الاسم"),

  check("phone").notEmpty().withMessage("المرجو ادخال رقم الهاتف"),

  check("city").notEmpty().withMessage("المرجو ادخال المدينة"),

  ValidatorMiddleware,
];

export const GetAddressNotAuthValidator = [
  check("addresses")
    .notEmpty()
    .withMessage("المرجو ادخال العنوان")
    .custom((value) => {
      try {
        value.forEach((address) => {
          if (!mongoose.isValidObjectId(address)) {
            throw new Error("عنوان غير صالح");
          }
        });
      } catch (error) {
        throw new Error(error);
      }
      return true;
    }),
  ValidatorMiddleware,
];
