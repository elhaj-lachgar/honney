import { check } from "express-validator";
import ValidatotMiddleware from "../../middlewares/validator-middleware.js";

export const AddToBannerValidator = [
  check("productId")
    .notEmpty()
    .withMessage("المرجو ادخال محدد المنتج")
    .isMongoId()
    .withMessage("محدد المنتج غير صالح"),

  ValidatotMiddleware,
];

export const DeleteElementFromBannerValidator = [
  check("productId")
    .notEmpty()
    .withMessage("المرجو ادخال محدد المنتج")
    .isMongoId()
    .withMessage("محدد المنتج غير صالح"),

  ValidatotMiddleware,
];
