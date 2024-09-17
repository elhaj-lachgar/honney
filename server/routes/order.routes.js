import { Router } from "express";
import {
  CreateOrderValidator,
  getOrderValidator,
  getOrderNotAuthValidator,
} from "../utils/validator/order.validator.js";

import {
  CreateOrder,
  getOrder,
  getOrderNotAuth,
} from "../services/order.service.js";
const router = Router();

router.route("/").post(CreateOrderValidator, CreateOrder);

router.get("/:orderId", getOrderValidator, getOrder);

router.post("/order-status", getOrderNotAuthValidator, getOrderNotAuth);

export default router;
