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

const route = Router();

route.get("/", getAll);
route.get("/:id", getById);
route.post("", validate(amenityValidator), create);
route.put("/:id", update);
route.delete("/:id", remove);

export default route;
