import { Router } from "express";
import {
  getAll,
  getById,
  create,
  update,
  remove,
} from "../controllers/review.controller.js";
import { validate } from "../middlewares/validator.middleware.js";
import {
  reviewUpdateValidator,
  reviewValidator,
} from "../validators/review.validator.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const route = Router();

route.get("/", getAll);
route.get("/:id", getById);
route.post("", authenticate(), validate(reviewValidator), create);
route.put("/:id", authenticate(), validate(reviewUpdateValidator), update);
route.delete("/:id", authenticate(), remove);

export default route;
