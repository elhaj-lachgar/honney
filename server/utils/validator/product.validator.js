import ValidatorMiddleware from "../../middlewares/validator-middleware.js";
import { check } from "express-validator";

export const GetProductValidator = [
  check("productId")
    .notEmpty()
    .withMessage("المحدد ليس موجود")
    .isMongoId()
    .withMessage("المحدد ليس صالح"),
  ValidatorMiddleware,
];

export const UpdateProductValidator = [
  check("productId")
    .notEmpty()
    .withMessage("المحدد ليس موجود")
    .isMongoId()
    .withMessage("المحدد ليس صالح"),
  ValidatorMiddleware,
];

export const DeleteProductValidator = [
  check("productId")
    .notEmpty()
    .withMessage("المحدد ليس موجود")
    .isMongoId()
    .withMessage("المحدد ليس صالح"),
  ValidatorMiddleware,
];

export const CreateProductValidator = [
  check("name").notEmpty().withMessage("المرجو ادخال الاسم"),
  check("category")
    .notEmpty()
    .withMessage()
    .isMongoId()
    .withMessage("المحدد ليس صالح"),
  check("price")
    .notEmpty()
    .withMessage("المرجو ادخال السعر")
    .isNumeric()
    .withMessage("السعر عبارة عن عدد"),

  ValidatorMiddleware,
];

export const UploadImageValidator = [
  check("productId")
    .notEmpty()
    .withMessage("المرجو ادخال محدد المنتج")
    .isMongoId()
    .withMessage("محدد المنتج غير صالح"),
  ValidatorMiddleware,
];

export const DeleteImageValidator = [
  check("productId")
    .notEmpty()
    .withMessage("المرجو ادخال محدد المنتج")
    .isMongoId()
    .withMessage("محدد المنتج غير صالح"),
  check("selectedImage").notEmpty().withMessage("المرجو اختيار الصورة"),
  ValidatorMiddleware,
];
