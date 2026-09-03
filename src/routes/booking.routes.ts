import { Router } from "express";
import {
  getAll,
  getById,
  create,
  update,
  remove,
} from "../controllers/booking.controller.js";
import { validate } from "../middlewares/validator.middleware.js";
import { bookingValidator } from "../validators/booking.validator.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const route = Router();

route.get("/", authenticate(), getAll);
route.get("/:id", getById);
route.post("", authenticate(), validate(bookingValidator), create);
route.put("/:id", update);
route.delete("/:id", remove);

export default route;
