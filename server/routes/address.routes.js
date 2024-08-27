import { Router } from "express";
import {
  CreateAddress,
  DeleteAdress,
  GetAddress,
  UpdateAddress,
  CreateAddressAuthUser,
  CreateAddressNoAuthUser,
  GetAdddressNoAuthUser,
  getAddressOfAuthUser,
} from "../services/address.service.js";

import {
  CreateAddressValidator,
  DeleteAddressValidator,
  GetAddressValidator,
  UpdateAddressValidator,
  CreateAddressNotAuthValidator,
  GetAddressNotAuthValidator,
} from "../utils/validator/address.validator.js";

import ProtectMiddleware from "../middlewares/protect-middleware.js";

const router = Router();

router.post("/create-address-auth", ProtectMiddleware, CreateAddressAuthUser);

router.get("/get-address-auth", ProtectMiddleware, getAddressOfAuthUser);

router.post(
  "/create-address-not-auth",
  CreateAddressNotAuthValidator,
  CreateAddressNoAuthUser
);

router.post(
  "/get-address-not-auth",
  GetAddressNotAuthValidator,
  GetAdddressNoAuthUser
);

router.post("/", CreateAddressValidator, CreateAddress);

router
  .route("/:addressId")
  .put(UpdateAddressValidator, UpdateAddress)
  .delete(DeleteAddressValidator, DeleteAdress)
  .get(GetAddressValidator, GetAddress);

export default router;
