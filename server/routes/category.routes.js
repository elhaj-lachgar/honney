import { Router } from "express";
import {
  GetCategoryValidator,
} from "../utils/validator/category.validator.js";

import {
  GetCategory,
  GetCategorys,
} from "../services/category.service.js";


const router = Router();

router.route("/").get(GetCategorys);

router.route("/:categoryId").get(GetCategoryValidator, GetCategory);

export default router;
