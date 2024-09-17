import CouponModule from "../modules/coupon.module.js";
import asynchandler from "express-async-handler";
import ErrorHandler from "../utils/error-handler.js";



export const UseCoupon = asynchandler(async (req, res, next) => {
  const { name } = req.body;
  const coupon = await CouponModule.findOne({ name });
  if (!coupon)
    return next(new ErrorHandler("الخصم ليس موجود أو أنه قد إستنفد", 404));
  const isExiperd = coupon.DeadTime.getTime() < Date.now();
  if (isExiperd)
    return next(new ErrorHandler("الخصم ليس موجود أو أنه قد إستنفد", 404));
  if (coupon?.countUser && coupon.countUser <= 0)
    return next(new ErrorHandler("الخصم ليس موجود أو أنه قد إستنفد", 404));
  if (coupon?.count) {
    coupon.countUser -= 1;
  }

  await coupon.save();

  return res
    .status(200)
    .json({
      success: true,
      coupon: { ...coupon, DeadTime: undefined, countUser: undefined },
    });
});
