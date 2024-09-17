import { check } from "express-validator";
import ValidatorMiddleware from "../../middlewares/validator-middleware.js";

export const useCouponValidator = [
  check("name").notEmpty().withMessage("name is required"),

  ValidatorMiddleware,
];
