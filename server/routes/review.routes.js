import { Router } from "express";

import {
  CreateCommentValidator,
  UpdateCommentValidator,
  deleteCommentValidator,
} from "../utils/validator/review.validator.js";

import {
  createComment,
  deleteComment,
  updateComment,
} from "../services/review.service.js";

import ProtectMiddleware from "../middlewares/protect-middleware.js";

const router = Router();

router.post(
  "/create-review",
  ProtectMiddleware,
  CreateCommentValidator,
  createComment
);

router.put(
  "/update-review/:reviewId",
  ProtectMiddleware,
  UpdateCommentValidator,
  updateComment
);

router.delete(
  "/delete-review/:reviewId",
  ProtectMiddleware,
  deleteCommentValidator,
  deleteComment
);


export default router;