import { Router } from "express";
import {
  GetProductValidator,
} from "../utils/validator/product.validator.js";

import {
  getProduct,
  getProducts,
  getRelatedProducts,
  GetNames,
} from "../services/product.service.js";



const router = Router();



router.route("/").get(getProducts);

router.get(
  "/related-products/:productId",
  getRelatedProducts
);


router.get("/get-names", GetNames);

router
  .route("/:productId")
  .get(GetProductValidator, getProduct);

export default router;
