import { Router } from "express";
import {
  getAll,
  getById,
  create,
  update,
  remove,
} from "../controllers/property.controller.js";
import upload from "../middlewares/upload.middleware.js";
import propertyValidator from "../validators/property.validator.js";
import { validate } from "../middlewares/validator.middleware.js";

const route = Router();

route.get("/", getAll);
route.get("/:id", getById);
route.post(
  "",
  upload.fields([
    { name: "property_image", maxCount: 1 },
    { name: "gallery_images", maxCount: 10 },
  ]),
  validate(propertyValidator),
  create,
);
route.put("/:id", update);
route.delete("/:id", remove);

export default route;
