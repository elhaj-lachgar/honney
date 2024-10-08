import UserModule from "../modules/user.module.js";
import ErrorHandler from "../utils/error-handler.js";
import expressAsyncHandler from "express-async-handler";
import { deleteImage } from "../utils/image-handler.js";
import userFilter from "../utils/userFilter.js";

export const UpdateProfile = expressAsyncHandler(async (req, res, next) => {
  const user = await UserModule.findOneAndUpdate(
    { _id: req.user._id },
    { $set: { name: req.body.name } },
    { new: true }
  ).select("-role -password");
  if (!user) return next(new ErrorHandler("مستخدم غير موجود", 404));
  const virtual_user = userFilter(user);
  return res.status(200).json({ success: true, user: virtual_user });
});

export const ChangeAvatar = expressAsyncHandler(async (req, res, next) => {
  const currentImage = req.user?.avatar;
  if (req.body.avatar) {
    if (currentImage) {
      const image = [currentImage.split("/")[7], currentImage.split("/")[8]]
        .join("/")
        .split(".")[0];
      try {
        await deleteImage([image]);
      } catch (error) {
        return next(new ErrorHandler("خطأ اثناء حذف الصورة الرمزية", 400));
      }
    }
    const user = await UserModule.findOneAndUpdate(
      { _id: req.user._id },
      { $set: { avatar: req.body.avatar } },
      { new: true }
    ).select("-password -role");
    if (!user) return next(new ErrorHandler("مستخدم غير موجود", 404));
  }
  return res.status(200).json({ success: true });
});

export const DeleteAvatar = expressAsyncHandler(async (req, res, next) => {
  const currentImage = req.user.avatar;
  if (currentImage) {
    const image = [currentImage.split("/")[7], currentImage.split("/")[8]]
      .join("/")
      .split(".")[0];
    try {
      await deleteImage([image]);
    } catch (error) {
      return next(new ErrorHandler("خطأ اثناء حذف الصورة الرمزية", 400));
    }
  }
  req.user.avatar = undefined;
  await req.user.save();

  return res.status(200).json({ success: true });
});

export const GetUser = expressAsyncHandler(async (req, res) => {
  const user = await (
    await UserModule.findOne({ _id: req.user._id }).populate("userOrder")
  ).populate("userOrder.address userOrder.products.product");

  const virtual_user = userFilter(user);
  return res.status(200).json({ user: virtual_user, success: true });
});

export const getUserReview = expressAsyncHandler(async (req, res) => {
  const user = await UserModule.findOne({ _id: req.params.userId });
  const virtual_user = userFilter(user);
  return res.status(200).json({ user: virtual_user, success: true });
});

export const UpdateRole = expressAsyncHandler(async (req, res, next) => {
  const user = await UserModule.updateOne(
    { _id: req.params.userId },
    { role: req.body.role },
    { new: true }
  );
  if (!user) return next(new ErrorHandler("هذا المستخدم غير موجود", 404));

  return res
    .status(200)
    .json({ success: true, message: "تم تحديث المستخدم بنجاح" });
});
