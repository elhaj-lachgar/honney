import { Router } from "express";
import {
  CreateOrderValidator,
  getOrderValidator,
} from "../utils/validator/order.validator.js";

import { CreateOrder, getOrder } from "../services/order.service.js";
const router = Router();

router.route("/").post(CreateOrderValidator, CreateOrder);

router.get("/:orderId", getOrderValidator, getOrder);

export default router;
