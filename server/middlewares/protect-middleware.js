import jwt from "jsonwebtoken";
import asynchandler from "express-async-handler";
import ErrorHandler from "../utils/error-handler.js";
import UserModule from "../modules/user.module.js";

const ProtectMiddleware = asynchandler(async (req, res, next) => {
  if (!req.cookies?.jwt) return next(new ErrorHandler("غير مصرح به", 403));
  const token = req.cookies.jwt;
  const valid = jwt.verify(token, process.env.SUCRET_KEY_JWT);

  if (!valid) return next(new ErrorHandler("غير مصرح به", 403));
  const { userId } = valid;
  const user = await UserModule.findOne({ _id: userId });

  if (!user) return next(new ErrorHandler("غير مصرح به", 403));
  if (user.changePassword_At) {
    const dure = Math.floor(user.changePassword_At / 1000);
    if (dure > valid.iat)
      return next(new ErrorHandler("please login again", 400));
  }
  req.user = user;
  return next();
});

export default ProtectMiddleware;
