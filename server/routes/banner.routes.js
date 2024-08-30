import { getBanner } from "../services/banner.service.js";
import { Router } from "express";

const router = Router();

router.get("/", getBanner);

export default router;
