import { Router } from "express";
import {
  register,
  login,
  changePassword,
} from "../controllers/auth.controller";
import { validate } from "../middlewares/validator.middleware";
import { loginValidator } from "../validators/auth.validator";

const router = Router();

router.post("/register", register);
router.post("/login", validate(loginValidator), login);
router.post("/resetPassword", changePassword);

export default router;
