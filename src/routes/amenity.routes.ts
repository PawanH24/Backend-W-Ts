import { Router } from "express";
import {
  getAll,
  getById,
  create,
  update,
  remove,
} from "../controllers/amenity.controller.js";
import { validate } from "../middlewares/validator.middleware.js";
import { amenityValidator } from "../validators/amenity.validator.js";
import uploader from "../middlewares/upload.middleware.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { Role } from "../types/enum.types.js";

const route = Router();
const upload = uploader();

route.get("/", authenticate([Role.HOST, Role.ADMIN, Role.USER]), getAll);
route.get("/:id", getById);
route.post("/", upload.single("icon"), validate(amenityValidator), create);
route.put("/:id", update);
route.delete("/:id", remove);
//logout just clear cookie
export default route;
