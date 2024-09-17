import ProductModule from "../modules/product.module.js";
import expressAsyncHandler from "express-async-handler";
import { getDoucement } from "./factory.service.js";
import UserModule from "../modules/user.module.js";
import jwt from "jsonwebtoken";

export const getProduct = getDoucement(
  ProductModule,
  "productId",
  "category",
  ""
);

export const getProducts = expressAsyncHandler(async (req, res) => {
  const query = {};
  if (req.query?.category) {
    const value = req.query.category;
    query.category = value.split(",");
  }
  if (req.query?.keyword) {
    query.$or = [{ name: { $regex: req.query?.keyword, $options: "i" } }];
  }
  const products = await ProductModule.find(query).limit(6);
  return res.status(200).json({ products, success: true });
});

export const getRelatedProducts = expressAsyncHandler(async (req, res) => {
  let value = false;
  if (req.cookies?.jwt) {
    const token = req.cookies.jwt;
    const valid = jwt.verify(token, process.env.SUCRET_KEY_JWT);
    const { userId } = valid;
    const user = await UserModule.findOne({ _id: userId });
    if (user) {
      const arr = user.product_reviews_allwod.map((vl) => vl.toString());
      value = arr.includes(req.params.productId);
    }
  }
  const product = await (
    await ProductModule.findOne({
      _id: req.params.productId,
    }).populate("category reviews")
  ).populate({ path: "reviews.user", select: "-password -role" });
  const related = await ProductModule.find({ category: product.category });
  return res.status(200).json({ product, related, success: true, value });
});

export const GetNames = expressAsyncHandler(async (req, res, next) => {
  const names = await ProductModule.find({}).select("name -_id");
  return res.status(200).json({ names, success: true });
});

export const getProductPrincipal = expressAsyncHandler(async (req, res) => {
  let product = await ProductModule.findOne({ name: "عسل الزعتر" });
  if (!product) product = await ProductModule.findOne({});
  return res.status(200).json({ product, success: true });
});
