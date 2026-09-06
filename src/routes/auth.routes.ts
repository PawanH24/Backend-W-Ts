import { Router } from "express";
import {
  register,
  login,
  getProfile,
  updateProfile,
  requestChangePasswordOtp,
  verifyChangePassword,
} from "../controllers/auth.controller";
import { validate } from "../middlewares/validator.middleware";
import {
  loginValidator,
  registerValidator,
  verifyChangePasswordValidator,
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
  "/requestChangePasswordOtp",
  authenticate(),
  requestChangePasswordOtp,
);
router.post(
  "/verifyChangePassword",
  authenticate(),
  validate(verifyChangePasswordValidator),
  verifyChangePassword,
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
