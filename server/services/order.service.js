import asynchandler from "express-async-handler";
import OrderModule from "../modules/order.module.js";
import UserModule from "../modules/user.module.js";
import { OrderClientMail, OrderMail } from "../utils/sendMail.js";
import ErrorHandler from '../utils/error-handler.js';

export const CreateOrder = asynchandler(async (req, res, next) => {
  const order = await (
    await OrderModule.create(req.body)
  ).populate("address products.product");

  await OrderClientMail(order, order.address.name, order.address.email);
  await OrderMail(order, order.address.name);

  if (!order.address.NotAuth) {
    const user = await UserModule.findOne({ email: order.address.email });
    if (user) {
      user.userOrder.push(order._id);
      await user.save();
    }
  }

  return res.status(200).json({ success: true, order });
});


export const getOrder = asynchandler ( async (req , res , next ) => {
  const order  = await OrderModule.findOne({_id:req.params.orderId}).populate("products.product address");
  if(!order) return next( new ErrorHandler("طلبية لاتوجد" , 404));
  return res.status(200).json({order , success : true})
});