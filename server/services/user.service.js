import UserModule from "../modules/user.module.js";
import ErrorHandler from "../utils/error-handler.js";
import expressAsyncHandler from "express-async-handler";
import { deleteImage } from "../utils/image-handler.js";

export const UpdateProfile = expressAsyncHandler(async (req, res, next) => {
  const user = await UserModule.findOneAndUpdate(
    { _id: req.user._id },
    { $set: { name: req.body.name } },
    { new: true }
  ).select("-role -password");
  if (!user) return next(new ErrorHandler("مستخدم غير موجود", 404));

  return res.status(200).json({ success: true, user });
});

export const ChangeAvatar = expressAsyncHandler(async (req, res, next) => {
  const currentImage = req.user?.avatar;
  if (req.body.avatar) {
    if (currentImage) {
      const url = currentImage.split("/")[3] + "/" + currentImage.split("/")[4];
      try {
        deleteImage(url);
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
    const url = currentImage.split("/")[3] + "/" + currentImage.split("/")[4];
    try {
      deleteImage(url);
    } catch (error) {
      return next(new ErrorHandler("خطأ أثناءحذف الصورة الرمزية", 400));
    }
  }
  req.user.avatar = undefined;
  await req.user.save();

  return res.status(200).json({ success: true });
});

export const GetUser = expressAsyncHandler(async (req, res) => {
  const user = await ( await UserModule.findOne({ _id: req.user._id }).select(
    "-role -password"
  ).populate('userOrder')).populate('userOrder.address userOrder.products.product');
  return res.status(200).json({ user, success: true });
});

export const GetUsers = expressAsyncHandler(async (req, res) => {
  const users = await UserModule.find({}).select("-password");
  return res.status(200).json({ users, success: true });
});

export const getUserReview = expressAsyncHandler(async (req, res) => {
  const user = await UserModule.findOne({ _id: req.params.userId }).select(
    "-role -password"
  );
  return res.status(200).json({ user, success: true });
});

export const UpdateRole = expressAsyncHandler(async (req, res, next) => {
  const user = await UserModule.updateOne(
    { _id: req.params.userId },
    { role: req.body.role },
    { new: true }
  );
  if (!user) return next(new ErrorHandler("user not found", 404));

  return res
    .status(200)
    .json({ success: true, message: "user updated successfully" });
});

