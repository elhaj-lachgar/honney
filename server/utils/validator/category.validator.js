import { check } from "express-validator";
import ValidatorMiddleware from "../../middlewares/validator-middleware.js";

export const CreateCategoryValidator = [
  check("name").notEmpty().withMessage("المرجو ادخال الاسم"),
  ValidatorMiddleware,
];

export const UpdateCategoryValidator = [
  check("categoryId")
    .notEmpty()
    .withMessage("المحدد ليس موجود")
    .isMongoId()
    .withMessage("المحدد ليس صالح"),
  ValidatorMiddleware,
];

export const DeleteCategoryValidator = [
  check("categoryId")
    .notEmpty()
    .withMessage("المحدد ليس موجود")
    .isMongoId()
    .withMessage("المحدد ليس صالح"),
  ValidatorMiddleware,
];

export const GetCategoryValidator = [
  check("categoryId")
    .notEmpty()
    .withMessage("المحدد ليس موجود")
    .isMongoId()
    .withMessage("المحدد ليس صالح"),
  ValidatorMiddleware,
];

export const UploadImageValidator = [
  check("categoryId")
    .notEmpty()
    .withMessage("المرجو ادخال محدد النوع")
    .isMongoId()
    .withMessage("محدد النوع غير صالح"),
  ValidatorMiddleware,
];

export const DeleteImageValidator = [
  check("categoryId")
    .notEmpty()
    .withMessage("المرجو ادخال محدد النوع")
    .isMongoId()
    .withMessage("محدد النوع غير صالح"),
  ValidatorMiddleware,
];
