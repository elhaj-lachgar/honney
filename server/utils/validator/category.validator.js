import { check } from "express-validator";
import ValidatorMiddleware from "../../middlewares/validator-middleware.js";



export const GetCategoryValidator = [
  check("categoryId")
    .notEmpty()
    .withMessage("المحدد ليس موجود")
    .isMongoId()
    .withMessage("المحدد ليس صالح"),
  ValidatorMiddleware,
];

