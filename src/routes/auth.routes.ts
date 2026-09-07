import { Router } from "express";
import {
  register,
  login,
  getProfile,
  updateProfile,
  requestForgotPasswordOtp,
  verifyForgotPassword,
} from "../controllers/auth.controller";
import { validate } from "../middlewares/validator.middleware";
import {
  loginValidator,
  registerValidator,
  requestForgotPasswordOtpValidator,
  verifyForgotPasswordValidator,
} from "../validators/auth.validator";
import uploader from "../middlewares/upload.middleware";
import { logout } from "../controllers/auth.controller";
import { authenticate } from "../middlewares/auth.middleware";

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
  "/requestForgotPasswordOtp",
  validate(requestForgotPasswordOtpValidator),
  requestForgotPasswordOtp,
);
router.post(
  "/verifyForgotPassword",
  validate(verifyForgotPasswordValidator),
  verifyForgotPassword,
);

router.post("/logout", authenticate(), logout);

router.get("/getProfile", authenticate(), getProfile);
router.put(
  "/updateProfile",
  authenticate(),
  upload.single("profile_image"),
  updateProfile,
);

export default router;
