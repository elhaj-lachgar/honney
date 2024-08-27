import CategoryModule from "../modules/category.module.js";
import ProductModule from "../modules/product.module.js";
import expressAsyncHandler from "express-async-handler";
import ErrorHandler from "../utils/error-handler.js";
import { deleteImage } from "../utils/image-handler.js";
import {
  CreateDoucement,
  UpdateDoucement,
  getDoucement,
} from "./factory.service.js";

export const CreateCategory = CreateDoucement(CategoryModule);

export const UpdateCategory = UpdateDoucement(CategoryModule, "categoryId");

export const GetCategory = getDoucement(CategoryModule, "categoryId", "", "");

export const DeleteCategory = expressAsyncHandler(async (req, res, next) => {
  const category = await CategoryModule.findOne({ _id: req.params.categoryId });
  if (!category) return next(new ErrorHandler("النوع غير موجود", 404));
  if (category.image) {
    try {
      const imageUrl =
        category.image.split("/")[3] + "/" + category.image.split("/")[4];
      deleteImage(imageUrl);
    } catch (error) {
      return next(
        new ErrorHandler(error.message || "خطأ أثناء حذف الصورة", 404)
      );
    }
  }

  const products = await ProductModule.find({ _id: category._id });

  const deleteProduct = products.forEach((product) => {
    if (product.imageUrls.length > 0) {
      product.imageUrls.forEach((img) => {
        try {
          const imageUrl = img.split("/")[3] + "/" + img.split("/")[4];
          deleteImage(imageUrl);
        } catch (error) {
          return next(
            new ErrorHandler(error.message || "خطأ أثناء حذف الصورة", 404)
          );
        }
      });
    }
    product.deleteOne();
  });

  await ProductModule.deleteMany({ category: category._id });

  await category.deleteOne();

  return res.status(200).json({ success: true });
});

export const DeleteCategoryImage = expressAsyncHandler(
  async (req, res, next) => {
    const category = await CategoryModule.findOne({
      _id: req.params.categoryId,
    });

    if (category.image) {
      try {
        const imageUrl =
          category.image.split("/")[3] + "/" + category.image.split("/")[4];
        deleteImage(imageUrl);
        category.image = "";
        await category.save();
      } catch (error) {
        return next(new ErrorHandler(error.message || "خطأ أثناء الحذف", 403));
      }
    }
    return res.status(200).json({
      success: true,
      message: "رسالة الخروج",
    });
  }
);

export const UpdateCatgoryImage = expressAsyncHandler(
  async (req, res, next) => {
    if (req.body.image) {
      const category = await CategoryModule.findOne({
        _id: req.body.categoryId,
      });
      if (!category) return next(new ErrorHandler("النوع غير موجود", 404));
      if (category.image) {
        try {
          const url =
            category.image.split("/")[3] + "/" + category.image.split("/")[4];

          deleteImage(url);
          category.image = req.body.image;
          await category.save();
        } catch (err) {
          return next(new ErrorHandler(err.message || "رسالة خطأ", 400));
        }
      }
    }
    return res.status(200).json({
      success: true,
      message: "رفع الصورة",
    });
  }
);

export const GetCategorys = expressAsyncHandler(async (req, res) => {
  const categorys = await CategoryModule.find({});
  return res.status(200).json({ categorys, success: true });
});
