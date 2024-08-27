import {
  AddToBanner,
  DeleteElementFromBanner,
  getBanner,
  getBannerOnly,
  setBanner,
} from "../services/banner.service.js";
import { Router } from "express";
import {
  AddToBannerValidator,
  DeleteElementFromBannerValidator,
} from "../utils/validator/banner.validator.js";
import ProtectMiddleware from "../middlewares/protect-middleware.js";
import AllwodUser from "../utils/allwod-user.js";

const router = Router();

router.get("/", getBanner);

router.get("/only", getBannerOnly);

router.delete(
  "/delete-element",
  ProtectMiddleware,
  AllwodUser("admin"),
  DeleteElementFromBannerValidator,
  DeleteElementFromBanner
);

router.put(
  "/add-element",
  ProtectMiddleware,
  AllwodUser("admin"),
  AddToBannerValidator,
  AddToBanner
);

router.put("/set-banner", ProtectMiddleware, AllwodUser("admin"), setBanner);

export default router;
