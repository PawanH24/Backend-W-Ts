import { Router } from "express";
import {
  getAll,
  getById,
  update,
  remove,
} from "../controllers/user.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { Role } from "../types/enum.types.js";
import uploader from "../middlewares/upload.middleware.js";

const route = Router();
const upload = uploader();

route.get("/", authenticate([Role.ADMIN]), getAll);
route.get("/:id", authenticate([Role.ADMIN]), getById);
route.put(
  "/:id",
  upload.single("profile_image"),
  authenticate([Role.ADMIN]),
  update,
);
route.delete("/:id", authenticate([Role.ADMIN]), remove);

export default route;
