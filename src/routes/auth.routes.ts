import { Router } from "express";
import {
  register,
  login,
  changePassword,
} from "../controllers/auth.controller";
import { validate } from "../middlewares/validator.middleware";
import {
  loginValidator,
  registerValidator,
  changePasswordValidator,
} from "../validators/auth.validator";
import uploader from "../middlewares/upload.middleware";

const router = Router();
const upload = uploader();

router.post(
  "/register",
  upload.single("profile_image"),
  validate(registerValidator),
  register,
);

router.post("/login", validate(loginValidator), login);

router.post(
  "/resetPassword",
  validate(changePasswordValidator),
  changePassword,
);

export default router;
