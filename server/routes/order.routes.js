import { Router } from "express";
import {
  CreateOrderValidator,
  DelaiverdOrderValidator,
  DeleteOrderValidator,
} from "../utils/validator/order.validator.js";
import ProtectMiddleware from "../middlewares/protect-middleware.js";
import AllwodUser from "../utils/allwod-user.js";
import {
  CreateOrder,
  getOrders,
  DeleteOrder,
  delaiverdOrder,
  getOrder,
} from "../services/order.service.js";
const router = Router();


router
  .route("/")
  .post(CreateOrderValidator, CreateOrder)
  .get(ProtectMiddleware, AllwodUser("admin"), getOrders);

router
  .route("/:orderId")
  .get(getOrder)
  .post(
    ProtectMiddleware,
    AllwodUser("admin"),
    DelaiverdOrderValidator,
    delaiverdOrder
  )
  .delete(
    ProtectMiddleware,
    AllwodUser("admin"),
    DeleteOrderValidator,
    DeleteOrder
  );
export default router;
