import BannerModule from "../modules/banner.module.js";
import expressAsyncHandler from "express-async-handler";
import ErrorHandler from "../utils/error-handler.js";
import ProductModule from "../modules/product.module.js";

export const AddToBanner = expressAsyncHandler(async (req, res) => {
  const banner = await BannerModule.find({});
  banner[0].products.push(req.body.productId);
  await banner[0].save();
  return res.status(200).json({ banner: banner[0], success: true });
});

export const getBanner = expressAsyncHandler(async (req, res) => {
  //TO DO
  const banner = await BannerModule.find({}).populate("products");

  if (banner.length <= 0) {
    const virtualBanner = await ProductModule.find({})
      .limit(6)
      .select("_id imageUrls");
    return res.status(200).json({ success: true, banner: virtualBanner });
  }

  if (banner[0]?.products.length <= 0) {
    const virtualBanner = await ProductModule.find({})
      .limit(6)
      .select("_id imageUrls");
    return res.status(200).json({ success: true, banner: virtualBanner });
  }
  const arr = banner[0].products.map((product) => ({
    _id: product._id,
    imageUrls: product.imageUrls,
  }));
  return res.status(200).json({ success: true, banner: arr });
});

export const getBannerOnly = expressAsyncHandler(async (req, res) => {
  const banner = await BannerModule.find({}).populate("products");

  return res.status(200).json({ success: true, banner: banner[0] });
});

export const DeleteElementFromBanner = expressAsyncHandler(async (req, res) => {
  //TO DO
  const banner = await BannerModule.find({}).populate("products");
  const index = banner[0].products.findIndex(
    (product) => product._id.toString() == req.body.productId
  );
  if (index <= -1) return next(new ErrorHandler("منتج غير موجود", 404));
  banner[0].products.splice(index, 1);
  await banner[0].save();
  return res.status(200).json({ success: true });
});

export const setBanner = expressAsyncHandler(async (req, res, next) => {
  const banner = await BannerModule.find({});
  banner[0].products = req.body.productIds;
  await banner[0].save();
  return res.status(200).json({ success: true });
});
