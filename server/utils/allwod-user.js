import ErrorHandler from "./error-handler.js";

const allwod_User =
  (...roles) =>
  (req, res, next) => {
    const valid = roles.includes(req.user.role);
    if (!valid) return next(new ErrorHandler("غير مصرح به", 403));
    return next();
  };

export default allwod_User;