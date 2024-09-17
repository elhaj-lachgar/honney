import asynchandler from "express-async-handler";
import AdressModule from "../modules/address.module.js";
import ErrorHandler from "../utils/error-handler.js";
import OrderModule from "../modules/order.module.js";
import { CreateDoucement, getDoucement } from "./factory.service.js";
import AddressModule from "../modules/address.module.js";
import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import UserModule from "../modules/user.module.js";

export const CreateAddress = CreateDoucement(AddressModule);

export const UpdateAddress = expressAsyncHandler(async (req, res, next) => {
  let email;

  if (req.cookies?.jwt) {
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
    email = user.email;
  } else email = req.body?.email;

  if (!email) return next(new ErrorHandler("email not found", 404));

  const address = await AddressModule.findOne({
    _id: req.params.addressId,
    email,
  });

  if (!address) return next(new ErrorHandler("address not found", 404));
  const orders = await OrderModule.find({ address: req.params.addressId });

  const value = orders.map((order) => order.isDelaiverd);

  if (value.includes(false))
    return next(new ErrorHandler("address are provide in order", 400));

  address.city = req.body.city || address.city;
  address.streat = req.body.streat || address.streat;
  address.phone = req.body.phone || address.phone;

  await address.save();

  return res
    .status(200)
    .json({ success: true, message: "Address saved successfully" });
});

export const CreateAddressAuthUser = expressAsyncHandler(
  async (req, res, next) => {
    const address = await AddressModule.create({
      email: req.user.email,
      name: req.user.name,
      ...req.body,
    });
    return res.status(200).json({ address, success: true });
  }
);

export const getAddressOfAuthUser = expressAsyncHandler(async (req, res) => {
  const addresses = await AddressModule.find({ email: req.user.email });
  return res.status(200).json({ addresses, success: true });
});

export const CreateAddressNoAuthUser = expressAsyncHandler(async (req, res) => {
  const number = Math.floor(Math.random() * 400000 + 100000);
  const address = await AddressModule.create({ NotAuth: number, ...req.body });
  return res.status(200).json({ address, number, success: true });
});

export const GetAdddressNoAuthUser = expressAsyncHandler(async (req, res) => {
  const addresses = await AddressModule.find({ _id: req.body.addresses });
  return res.status(200).json({ addresses, success: true });
});

export const GetAddress = getDoucement(AddressModule, "addressId", "", "");

export const DeleteAddress = asynchandler(async (req, res, next) => {
  let email;

  if (req.cookies?.jwt) {
    const token = req.cookies.jwt;
    const valid = jwt.verify(token, process.env.SUCRET_KEY_JWT);

    if (!valid) return next(new ErrorHandler("غير مصرح به", 403));
    const { userId } = valid;
    const user = await UserModule.findOne({ _id: userId });

    if (!user) return next(new ErrorHandler("غير مصرح به", 403));
    if (user.changePassword_At) {
      const dure = Math.floor(user.changePassword_At / 1000);
      if (dure > valid.iat)
        return next(new ErrorHandler("الرجاء ،إعادة التسجيل", 400));
    }
    email = user.email;
  } else email = req.body?.email;

  if (!email) return next(new ErrorHandler("email not found", 404));

  const address = await AdressModule.findOne({
    _id: req.params.addressId,
    email,
  });
  if (!address) return next(new ErrorHandler("عنوان غير موجود", 404));

  const orders = await OrderModule.find({ address: req.params.addressId });

  const value = orders.map((order) => order.isDelaiverd);

  if (value.includes(false))
    return next(new ErrorHandler("العنوان مستخدم في لطلب", 400));

  await address.deleteOne();

  return res.status(200).json({ success: true });
});
