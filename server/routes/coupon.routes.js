import { Router } from "express";

import { useCouponValidator } from "../utils/validator/coupon.validator.js";

import { UseCoupon } from "../services/coupon.service.js";

const router = Router();

router.post("/use-coupon", useCouponValidator , UseCoupon);


export default router ;
