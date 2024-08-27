import ProductModule from "../modules/product.module.js";
import expressAsyncHandler from "express-async-handler";
import ErrorHandler from "../utils/error-handler.js";
import ReviewModule from "../modules/review.module.js";
import {
  CreateDoucement,
  UpdateDoucement,
  getDoucement,
} from "./factory.service.js";
import { deleteImage } from "../utils/image-handler.js";
import UserModule from "../modules/user.module.js";

import jwt from "jsonwebtoken";

export const CreateProduct = CreateDoucement(ProductModule);

export const UpdateProduct = UpdateDoucement(ProductModule, "productId");

export const DeleteProduct = expressAsyncHandler(async (req, res, next) => {
  const product = await ProductModule.findOne({ _id: req.params.productId });
  if (!product) return next(new ErrorHandler("منتج غير موجود", 404));
  if (product.imageUrls.length > 0) {
    product.imageUrls.forEach((img) => {
      try {
        const url = img.split("/")[3] + "/" + img.split("/")[4];

        deleteImage(url);
      } catch (err) {
        return next(new ErrorHandler("خطأ أثناء حذف الصورة", 403));
      }
    });
  }
  await ReviewModule.deleteMany({_id:product.reviews});
  await product.deleteOne();
  return res.status(200).json({ success: true, product });
});

export const getProduct = getDoucement(
  ProductModule,
  "productId",
  "category",
  ""
);

export const UploadImageOfProduct = expressAsyncHandler(
  async (req, res, next) => {
    const product = await ProductModule.findOne({ _id: req.params.productId });
    if (!product) return next(new ErrorHandler("منتج غير موجود", 404));
    if (product.imageUrls.length > 0) {
      product.imageUrls.forEach((img) => {
        try {
          const url = img.split("/")[3] + "/" + img.split("/")[4];
          deleteImage(url);
        } catch (err) {
          return next(new ErrorHandler("خطأ أثناء حذف الصورة", 403));
        }
      });
    }
    product.imageUrls = req.body.images;
    await product.save();
    return res
      .status(200)
      .json({ success: true, message: "تم حفظ الصورة بنجاح" ,product});
  }
);

export const DeleteProductImage = expressAsyncHandler(
  async (req, res, next) => {
    const product = await ProductModule.findOne({ _id: req.params.productId });
    if (!product) return next(new ErrorHandler("منتج غير موجود", 404));
    const index = product.imageUrls.findIndex(
      (imageUrl) => imageUrl == req.body.selectedImage
    );
    if (index > -1) {
      const url = product.imageUrls[index];
      product.imageUrls.splice(index, 1);
      try {
        const image = url.split("/")[3] + "/" + url.split("/")[4];
        deleteImage(image);
        await product.save();
      } catch (error) {
        return next(
          new ErrorHandler(error.message || "خطأ أثناء حذف الصورة", 400)
        );
      }
    }
    return res.status(200).json({ success: true });
  }
);

export const getProducts = expressAsyncHandler(async (req, res) => {
  const query = {};
  if (req.query?.category) {
    const value = req.query.category;
    query.category = value.split(",");
  }
  if (req.query?.keyword) {
    const query = {};
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
    const arr = user.product_reviews_allwod.map((vl) => vl.toString());
    value = arr.includes(req.params.productId);
  }
  const product = await ProductModule.findOne({
    _id: req.params.productId,
  }).populate("category reviews");
  const related = await ProductModule.find({ category: product.category });
  return res.status(200).json({ product, related, success: true, value });
});

export const GetNames = expressAsyncHandler(async (req, res, next) => {
  const names = await ProductModule.find({}).select("name -_id");
  return res.status(200).json({ names, success: true });
});


export const getAllProducts  = expressAsyncHandler(async( req , res , next ) => {
  const products = await ProductModule.find({});
  return res.status(200).json({ products , success : true });
});