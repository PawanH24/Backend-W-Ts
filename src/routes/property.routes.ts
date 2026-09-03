import { Router } from "express";
import {
  getAll,
  getById,
  create,
  update,
  remove,
  getByHost,
} from "../controllers/property.controller.js";
import uploader from "../middlewares/upload.middleware.js";
import {
  propertyValidator,
  propertyUpdateValidator,
} from "../validators/property.validator.js";
import { validate } from "../middlewares/validator.middleware.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { Role } from "../types/enum.types.js";

const route = Router();
const upload = uploader();

route.get("/", getAll);
route.get("/:id", authenticate([Role.HOST]), getByHost);
route.get("/:id", getById);
route.post(
  "",
  authenticate([Role.HOST]),
  upload.fields([
    { name: "main_image", maxCount: 1 },
    { name: "gallery_images", maxCount: 10 },
  ]),
  validate(propertyValidator),
  create,
);
route.put(
  "/:id",
  authenticate([Role.HOST]),
  upload.fields([
    { name: "main_image", maxCount: 1 },
    { name: "gallery_images", maxCount: 10 },
  ]),
  validate(propertyUpdateValidator),
  update,
);
route.delete("/:id", authenticate([Role.ADMIN, Role.HOST]), remove);

export default route;
