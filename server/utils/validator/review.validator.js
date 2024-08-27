import ValidatorMiddleware from "../../middlewares/validator-middleware.js";
import { check } from "express-validator";

export const CreateCommentValidator = [
  check("productId")
    .notEmpty()
    .withMessage("المحدد ليس موجود")
    .isMongoId()
    .withMessage("المحدد ليس صالح"),

  check("rate")
    .notEmpty()
    .withMessage("rate is required")
    .isInt({ min: 1, max: 5 })
    .withMessage("rate is number"),

  check("content").notEmpty().withMessage("content is required"),

  ValidatorMiddleware,
];

export const UpdateCommentValidator = [
  check("productId")
    .notEmpty()
    .withMessage("المحدد ليس موجود")
    .isMongoId()
    .withMessage("المحدد ليس صالح"),

  check("reviewId")
    .notEmpty()
    .withMessage("reviewId is required")
    .isMongoId()
    .withMessage("reviewId not valid"),

  check("rate")
    .notEmpty()
    .withMessage("rate is required")
    .isInt({ min: 1, max: 5 })
    .withMessage("rate is number"),

  check("content").notEmpty().withMessage("content is required"),

  ValidatorMiddleware,
];

export const deleteCommentValidator = [
  check("productId")
    .notEmpty()
    .withMessage("المحدد ليس موجود")
    .isMongoId()
    .withMessage("المحدد ليس صالح"),

  check("reviewId")
    .notEmpty()
    .withMessage("reviewId is required")
    .isMongoId()
    .withMessage("reviewId not valid"),
  ValidatorMiddleware,
];
