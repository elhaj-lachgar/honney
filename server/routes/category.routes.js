import { Router } from "express";
import {
  CreateCategoryValidator,
  DeleteCategoryValidator,
  GetCategoryValidator,
  UpdateCategoryValidator,
  DeleteImageValidator,
  UploadImageValidator,
} from "../utils/validator/category.validator.js";

import {
  CreateCategory,
  DeleteCategory,
  GetCategory,
  UpdateCategory,
  DeleteCategoryImage,
  UpdateCatgoryImage,
  GetCategorys
} from "../services/category.service.js";

import ProtectMiddleware from "../middlewares/protect-middleware.js";
import AllwodUser from "../utils/allwod-user.js";

import {
  local_upload,
  local_single_upload,
} from "../middlewares/multer-middleware.js";

const router = Router();

router
  .route("/")
  .get(GetCategorys)
  .post(
    // ProtectMiddleware,
    // AllwodUser("admin"),
    CreateCategoryValidator,
    CreateCategory
  );

router.put(
  "/upload-image/:categoryId",
  ProtectMiddleware,
  AllwodUser("admin"),
  UploadImageValidator,
  local_upload.single("image"),
  local_single_upload("image", "category"),
  UpdateCatgoryImage
);

router.delete(
  "/delete-image/:categoryId",
  ProtectMiddleware,
  AllwodUser("admin"),
  DeleteImageValidator,
  DeleteCategoryImage
);

router
  .route("/:categoryId")
  .put(
    // ProtectMiddleware,
    // AllwodUser("admin"),
    UpdateCategoryValidator,
    UpdateCategory
  )
  .delete(
    // ProtectMiddleware,
    // AllwodUser("admin"),
    DeleteCategoryValidator,
    DeleteCategory
  )
  .get(GetCategoryValidator, GetCategory);

export default router;
