import { check } from "express-validator";
import ValidatorMiddleware from "../../middlewares/validator-middleware.js";

export const signInValidator = [
  check("email")
    .notEmpty()
    .withMessage("المرجو ادخال البريد الالكتروني")
    .isEmail()
    .withMessage("البريد الالكتروني غير صالح"),

  check("password")
    .notEmpty()
    .withMessage("الرجاء ادخال كلمة المرور")
    .isLength({ min: 8, max: 16 })
    .withMessage("كلمة المرور غير صالحة"),

  ValidatorMiddleware,
];

export const signUpValidator = [
  check("email")
    .notEmpty()
    .withMessage("الرجاء ادخال البريد الالكتروني")
    .isEmail()
    .withMessage("البريد الالكتروني غير صالح"),

  check("name").notEmpty().withMessage("الرجاء ادخال الاسم"),

  check("password")
    .notEmpty()
    .withMessage("المرجو ادخال كلمة المرور")
    .isLength({ min: 8, max: 16 })
    .withMessage("كلمة المرور غير صالحة"),

  ValidatorMiddleware,
];

export const GoogleSignInValidator = [
  check("email")
    .notEmpty()
    .withMessage("الرجاء ادخال البريد الالكتروني")
    .isEmail()
    .withMessage("البريد الالكتروني غير صالح"),
  ValidatorMiddleware,
];

export const GoogleSignUpValidator = [
  check("email")
    .notEmpty()
    .withMessage("الرجاء ادخال البريد الالكتروني")
    .isEmail()
    .withMessage("البريد الالكتروني غير صالح"),

  check("avatar").optional().isString().withMessage("not valid avatar"),

  check("name")
    .notEmpty()
    .withMessage("المرجو ادخال الاسم")
    .isString()
    .withMessage("الاسم غير صالح"),

  ValidatorMiddleware,
];

export const VerficationSignUpValidator = [
  check("email")
    .notEmpty()
    .withMessage("المرجو ادخال البريد الالكتروني")
    .isEmail()
    .withMessage("البريد الالكتروني غير صالح"),
  check("restCode").notEmpty().withMessage("restCode is required"),
  ValidatorMiddleware,
];

export const setEmailVerificationValidator = [
  check("email")
    .notEmpty()
    .withMessage("الرجاء ادخال البريد الالكتروني")
    .isEmail()
    .withMessage("البريد الالكتروني غير صالح"),
  ValidatorMiddleware,
];

export const checkRestVerificationValidator = [
  check("email")
    .notEmpty()
    .withMessage("الرجاء ادخال البريد الالكتروني")
    .isEmail()
    .withMessage("البريد الالكتروني غير صالح"),
  check("restCode").notEmpty().withMessage("المرجو ادخال رمز اعادة التعيين"),

  ValidatorMiddleware,
];

export const setPasswordValidator = [
  check("email")
    .notEmpty()
    .withMessage("الرجاء ادخال البريد الالكتروني")
    .isEmail()
    .withMessage("البريد الالكتروني غير صالح"),

  check("new_password")
    .notEmpty()
    .withMessage("الرجاء ادخال كلمة المرور")
    .isLength({ min: 8, max: 16 })
    .withMessage("كلمة المرور غير صالحة"),

  check("confirm_password").custom((value, { req }) => {
    const valid = value == req.body.new_password;
    if (!valid) throw new Error("كلمة المرور غير متطابقة");
    return true;
  }),
];
