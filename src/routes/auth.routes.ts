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
} from "../validators/auth.validator";
import { Request } from "express";
import multer from "multer";
import fs from "fs";

const folder = "uploads/";

//create upload folder is not exixts
if (!fs.existsSync(folder)) {
  fs.mkdirSync(folder);
}

//multer disk storage
const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, callback) => {
    callback(null, "uploads/");
  },
  filename: (req: Request, file: Express.Multer.File, callback) => {
    const fileName = Date.now() + "-" + file.originalname;
    callback(null, fileName);
  },
});

//multer upload instance
const upload = multer({
  storage: storage,
});

const router = Router();

router.post(
  "/register",
  upload.single("profile_image"),
  validate(registerValidator),
  register,
);
router.post("/login", validate(loginValidator), login);
router.post("/resetPassword", changePassword);

export default router;
