import CategoryModule from "../modules/category.module.js";
import expressAsyncHandler from "express-async-handler";
import {
  getDoucement,
} from "./factory.service.js";


export const GetCategory = getDoucement(CategoryModule, "categoryId", "", "");


export const GetCategorys = expressAsyncHandler(async (req, res) => {
  const categorys = await CategoryModule.find({});
  return res.status(200).json({ categorys, success: true });
});
