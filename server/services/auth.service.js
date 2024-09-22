import UserModule from "../modules/user.module.js";
import ErrorHandler from "../utils/error-handler.js";
import asynchandler from "express-async-handler";
import encrypt from "bcryptjs";
import GenerateToken from "../utils/generate-token.js";
import crypt from "crypto";
import { VerficationMail } from "../utils/sendMail.js";
import userFilter from "../utils/userFilter.js";

export const signIn = asynchandler(async (req, res, next) => {
  const { password, email } = req.body;
  const user = await UserModule.findOne({ email });
  if (!user)
    return next(
      new ErrorHandler("البريد الالكتروني او كلمة المرور غير صحيحة", 403)
    );

  if (!user.isValidSign)
    return next(
      new ErrorHandler("البريد الالكتروني او كلمة المرور غير صحيحة", 403)
    );

  const valid = encrypt.compareSync(password, user.password);

  if (!valid)
    return next(
      new ErrorHandler("البريد الالكتروني او كلمة المرور غير صحيحة", 403)
    );

  GenerateToken(user._id.toString(), res);

  const virtual_user = userFilter(user);

  return res.status(200).json({ success: true, user: virtual_user });
});

export const signUp = asynchandler(async (req, res, next) => {
  const user_v = await UserModule.findOne({ email: req.body.email });
  if (!user_v) {
    const restCode = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedCode = crypt
      .createHash("sha256")
      .update(restCode)
      .digest("hex");
    const user = await UserModule.create({
      resetCodeSign: hashedCode,
      ...req.body,
    });
    try {
      await VerficationMail(user, restCode);
      return res.status(200).json({ success: true });
    } catch (error) {
      await user.deleteOne();
      return next(new ErrorHandler("خطأ ارسال رمز اعادة التعيين", 404));
    }
  }
  if (user_v.isValidSign)
    return next(new ErrorHandler("هذا البريد الإلكتروني مستعمل", 404));
  return res.status(200).json({ success: true });
});

export const signOut = asynchandler(async (req, res) => {
  return res
    .clearCookie("jwt")
    .status(200)
    .json({ success: true, message: "تم تسجيل الخروج بنجاح" });
});

export const googleSignAuth = asynchandler(async (req, res, next) => {
  let user = await UserModule.findOne({
    email: req.body.email,
  })

  if (!user) {
    req.body.password = Math.floor(100000 + Math.random() * 900000)
      .toString()
      .toString();
    req.body.isValidSign = true;
    user = await UserModule.create(req.body);
  }

  user = userFilter(user);

  GenerateToken(user._id.toString(), res);
  return res.status(200).json({ user, success: true });
});

export const setEmailVerification = asynchandler(async (req, res, next) => {
  const user = await UserModule.findOne({ email: req.body.email });
  if (!user) return next(new ErrorHandler("البريد الالكتروني غير موجود", 404));
  const restCode = Math.floor(100000 + Math.random() * 900000).toString();
  const hashCode = crypt.createHash("sha256").update(restCode).digest("hex");
  user.resetCode = hashCode;
  user.resetCode_At = new Date(Date.now() + 10 * 60 * 1000);
  try {
    await VerficationMail(user, restCode);
    await user.save();
  } catch (error) {
    return next(new ErrorHandler("خطأ ارسال رمز اعادة التعيين", 404));
  }
  return res
    .status(200)
    .json({ success: true, message: "المرجو التحقق من بريدك الالكتروني" });
});

export const checkRestVerification = asynchandler(async (req, res, next) => {
  const { restCode } = req.body;
  const user = await UserModule.findOne({ email: req.body.email });
  if (!user) return next(new ErrorHandler("البريد الالكتروني غير موجود", 404));
  const hashedCode = crypt.createHash("sha256").update(restCode).digest("hex");
  const valid = hashedCode == user.resetCode;
  if (!valid) return next(new ErrorHandler("غير مصرح به", 403));
  const isValid = Date.now() < new Date(user.resetCode_At).getTime();
  if (!isValid)
    return next(new ErrorHandler("انتهت صلاحية رمز اعادة التعيين", 404));
  user.isResetCode = true;
  user.isResetCode_At = new Date(Date.now() + 10 * 60 * 1000);
  await user.save();
  return res
    .status(200)
    .json({ success: true, message: "تم اعادة تعيين الرمز بنجاح" });
});

export const setPassword = asynchandler(async (req, res, next) => {
  const user = await UserModule.findOne({ email: req.body.email });
  if (!user) return next(new ErrorHandler("البريد الالكتروني غير موجود", 404));
  if (!user.isResetCode) return next(new ErrorHandler("غير مصرح به", 403));
  const dure = Date.now() < new Date(user.isResetCode_At).getTime();
  if (!dure) return next(new ErrorHandler("غير مصرح به", 403));
  user.password = req.body.new_password;
  user.resetCode = undefined;
  user.isResetCode = false;
  user.isResetCode_At = undefined;
  user.resetCode_At = undefined;
  user.changePassword_At = Date.now();
  await user.save();

  return res.status(200).json({
    success: true,
    message: "تم تغيير كلمة المرور بنجاح, الرجاء اعادة تسجيل الدخول",
  });
});

export const VerficationSignUp = asynchandler(async (req, res, next) => {
  const { restCode, email } = req.body;
  const user = await UserModule.findOne({ email });
  if (!user) return next(new ErrorHandler("البريد الالكتروني غير موجود", 404));
  const hashedCode = crypt.createHash("sha256").update(restCode).digest("hex");
  const valid = hashedCode == user.resetCodeSign;
  if (!valid) return next(new ErrorHandler("غير مصرح به", 403));
  user.isValidSign = true;
  await user.save();
  GenerateToken(user._id.toString(), res);
  const virtual_user = userFilter(user);
  return res.status(200).json({ success: true, user: virtual_user });
});
