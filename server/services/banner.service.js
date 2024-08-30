import BannerModule from "../modules/banner.module.js";
import expressAsyncHandler from "express-async-handler";
import ErrorHandler from "../utils/error-handler.js";
import ProductModule from "../modules/product.module.js";


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


