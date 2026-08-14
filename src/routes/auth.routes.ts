import { Router } from "express";
import {
  register,
  login,
  changePassword,
} from "../controllers/auth.controller";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/resetPassword", changePassword);

export default router;
