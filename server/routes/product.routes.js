import { Router } from "express";
import {
  CreateProductValidator,
  DeleteProductValidator,
  GetProductValidator,
  UpdateProductValidator,
  UploadImageValidator,
} from "../utils/validator/product.validator.js";

import ProtectMiddleware from "../middlewares/protect-middleware.js";
import AllwodUser from "../utils/allwod-user.js";
import {
  local_multipe_upload,
  local_upload,
} from "../middlewares/multer-middleware.js";
import {
  CreateProduct,
  DeleteProduct,
  UpdateProduct,
  getProduct,
  getProducts,
  UploadImageOfProduct,
  DeleteProductImage,
  getRelatedProducts,
  GetNames,
  getAllProducts,
} from "../services/product.service.js";

const router = Router();

router.get("/all", ProtectMiddleware, AllwodUser("admin"), getAllProducts);

router
  .route("/")
  .get(getProducts)
  .post(
    ProtectMiddleware,
    AllwodUser("admin"),
    CreateProductValidator,
    CreateProduct
  );

router.get("/related-products/:productId", getRelatedProducts);

router.put(
  "/upload-images/:productId",
  ProtectMiddleware,
  AllwodUser("admin"),
  UploadImageValidator,
  local_upload.array("image", 6),
  local_multipe_upload("images", "product"),
  UploadImageOfProduct
);

router.delete(
  "/delete-image/:productId",
  ProtectMiddleware,
  AllwodUser("admin"),
  DeleteProductImage
);

router.get("/get-names", GetNames);

router
  .route("/:productId")
  .put(
    ProtectMiddleware,
    AllwodUser("admin"),
    UpdateProductValidator,
    UpdateProduct
  )
  .delete(
    ProtectMiddleware,
    AllwodUser("admin"),
    DeleteProductValidator,
    DeleteProduct
  )
  .get(GetProductValidator, getProduct);

export default router;
