import { Router } from "express";
import {
  getAll,
  getById,
  create,
  update,
  remove,
} from "../controllers/review.controller.js";
import { validate } from "../middlewares/validator.middleware.js";
import { reviewValidator } from "../validators/review.validator.js";

const route = Router();

route.get("/", getAll);
route.get("/:id", getById);
route.post("", validate(reviewValidator), create);
route.put("/:id", update);
route.delete("/:id", remove);

export default route;
