import { Router } from "express";

import {
  ChangeAvatar,
  UpdateProfile,
  DeleteAvatar,
  GetUser,
  GetUsers,
  getUserReview,
  UpdateRole,
} from "../services/user.service.js";
import { UpdateProfileValidator } from "../utils/validator/user.validator.js";
import {
  local_upload,
  local_single_upload,
} from "../middlewares/multer-middleware.js";

import ProtectMiddleware from "../middlewares/protect-middleware.js";
import AllwodUser from "../utils/allwod-user.js";

import { SingleCloudHandler } from "../middlewares/cloud-handler.js";

const router = Router();

router.get("/get-users", GetUsers);

router.put(
  "/change-avatar",
  ProtectMiddleware,
  local_upload.single("avatar"),
  local_single_upload("avatar", "user"),
  SingleCloudHandler('user'  , 'avatar'),
  ChangeAvatar
);

router.put(
  "/update-profile",
  ProtectMiddleware,
  UpdateProfileValidator,
  UpdateProfile
);

router.get("/review-user/:userId", getUserReview);
router.delete("/delete-avatar", ProtectMiddleware, DeleteAvatar);

router.get("/get-user", ProtectMiddleware, GetUser);

router.put(
  "/admin-update/:userId",
  ProtectMiddleware,
  AllwodUser("admin"),
  UpdateRole
);
export default router;
