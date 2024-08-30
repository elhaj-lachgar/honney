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

