import asynchandler from "express-async-handler";
import AdressModule from "../modules/address.module.js";
import ErrorHandler from "../utils/error-handler.js";
import encrypt from "crypto";
import {
  CreateDoucement,
  UpdateDoucement,
  getDoucement,
} from "./factory.service.js";
import AddressModule from "../modules/address.module.js";
import expressAsyncHandler from "express-async-handler";

export const CreateAddress = CreateDoucement(AddressModule);

export const UpdateAddress = UpdateDoucement(AddressModule, "addressId");

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
  const addresses = await AddressModule.find({ _id : req.body.addresses });
  return res.status(200).json({ addresses, success: true });
});

export const GetAddress = getDoucement(AddressModule, "addressId", "", "");

export const DeleteAdress = asynchandler(async (req, res, next) => {
  const address = await AdressModule.findOneAndDelete({
    _id: req.params.addressId,
    email: req.user.email,
  });
  if (!address) return next(new ErrorHandler("عنوان غير موجود", 404));

  return res.status(200).json({ success: true });
});
