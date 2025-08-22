import { Router } from "express";
import { login } from "../controllers/auth.controller.js";
import validate from "../middlewares/validate.middleware.js";
import { loginSchema } from "../validations/auth.validation.js";

/* ====================== Auth Route ====================== */
const router = Router();

router.post("/login", validate(loginSchema), login);

export default router;
