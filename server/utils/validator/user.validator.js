import { check } from "express-validator";
import ValidatorMiddleware from "../../middlewares/validator-middleware.js";



export const UpdateProfileValidator=[
    check('name')
    .notEmpty()
    .withMessage("المرجو ادخال الاسم"),
    ValidatorMiddleware
]