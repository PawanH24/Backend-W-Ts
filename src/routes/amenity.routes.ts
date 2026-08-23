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

const route = Router();
const upload = uploader();

route.get("/", getAll);
route.get("/:id", getById);
route.post("/", upload.single("icon"), validate(amenityValidator), create);
route.put("/:id", update);
route.delete("/:id", remove);

export default route;
