import asynchandler from "express-async-handler";
import OrderModule from "../modules/order.module.js";
import ErrorHandler from "../utils/error-handler.js";
import ProductModule from "../modules/product.module.js";
import UserModule from "../modules/user.module.js";
import { OrderClientMail, OrderMail } from "../utils/sendMail.js";

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

export const getOrders = asynchandler(async (req, res, next) => {
  const orders = await OrderModule.find({}).populate(
    "address products.product"
  );
  return res.status(200).json({ success: true, orders });
});

export const delaiverdOrder = asynchandler(async (req, res, next) => {
  const order = await OrderModule.findOne({ _id: req.params.orderId }).populate(
    "address"
  );
  if (!order) return next(new ErrorHandler("طلبية غير موجودة", 404));
  if (order.isDelaiverd) {
    order.isDelaiverd = false;
    order.Delaiverd_At = undefined;

    if (!order.address?.NotAuth) {
      const user = await UserModule.findOne({ email: order.address.email });

      if (user) {
        const orderProducts = order.products.map((product) =>
          product.product._id.toString()
        );

        const arr = user.product_reviews_allwod.filter(
          (product) => !orderProducts.includes(product.toString())
        );

        user.product_reviews_allwod = arr;

        await user.save();
      }
    }
  } else {
    if (!req.body.Delaiverd_At)
      return next(new ErrorHandler("المرجو ادخال تاريخ الشحن", 404));
    order.Delaiverd_At = req.body.Delaiverd_At;
    order.isDelaiverd = true;
    if (!order.address?.NotAuth) {
      const user = await UserModule.findOne({ email: order.address.email });
      if (user) {
        const orderProducts = order.products.map((product) =>
          product.product._id.toString()
        );

        const arr = Array.from(
          new Set(
            [...orderProducts],
            [...user.product_reviews_allwod.map((vl) => vl.toString())]
          )
        );

        user.product_reviews_allwod = arr;

        await user.save();
      }
    }
  }

  await order.save();

  return res.status(200).json({ success: true, order });
});

export const DeleteOrder = asynchandler(async (req, res, next) => {
  const order = await OrderModule.findOne({ _id: req.params.orderId });
  if (!order) return next(new ErrorHandler("طلبية غير موجودة", 404));
  if (!order.isDelaiverd)
    return next(new ErrorHandler("طلبية لم تشحن بعد", 404));
  await order.deleteOne();
  return res
    .status(200)
    .json({ success: true, message: "تم حذف الطلبية بنجاح" });
});

export const getOrder = asynchandler(async (req, res, next) => {
  const order = await OrderModule.findOne({ _id: req.params.orderId }).populate(
    "address products.product"
  );
  return res.status(200).json({ success: true, order });
});

export const getUserOrders = asynchandler(async (req, res, next) => {});
