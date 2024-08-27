import { Router } from "express";
import rateLimiter from "../middlewares/limiter-middleware.js";
import {
  signInValidator,
  signUpValidator,
  GoogleSignInValidator,
  GoogleSignUpValidator,
  VerficationSignUpValidator,
  checkRestVerificationValidator,
  setEmailVerificationValidator,
  setPasswordValidator,
} from "../utils/validator/auth.validator.js";

import {
  signIn,
  signOut,
  signUp,
  VerficationSignUp,
  checkRestVerification,
  setEmailVerification,
  googleSignAuth,
  setPassword,
} from "../services/auth.service.js";

const router = Router();

router.post(
  "/ver-sign",
  rateLimiter(15, 5),
  VerficationSignUpValidator,
  VerficationSignUp
);

router.post("/sign-in", rateLimiter(15, 5), signInValidator, signIn);

router.post("/sign-up", rateLimiter(15, 5), signUpValidator, signUp);

router.post("/sign-out", signOut);

router.post("/google-sign-in", GoogleSignInValidator, googleSignAuth);

router.post("/google-sign-up", GoogleSignUpValidator, googleSignAuth);

router.post(
  "/set-email",
  rateLimiter(15, 5),
  setEmailVerificationValidator,
  setEmailVerification
);

router.post(
  "/check-rest",
  rateLimiter(15, 5),
  checkRestVerificationValidator,
  checkRestVerification
);

router.post(
  "/set-password",
  rateLimiter(15, 5),
  setPasswordValidator,
  setPassword
);

export default router;
