import { Router } from "express";
import {
  getAll,
  getByReference,
  create,
  update,
  remove,
} from "../controllers/booking.controller.js";
import { validate } from "../middlewares/validator.middleware.js";
import {
  bookingValidator,
  bookingUpdateValidator,
} from "../validators/booking.validator.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { Role } from "../types/enum.types.js";

const route = Router();

route.get("/", authenticate(), getAll);
route.get("/:reference", authenticate(), getByReference);
route.post("", authenticate(), validate(bookingValidator), create);
route.put(
  "/:reference",
  authenticate([Role.USER]),
  validate(bookingUpdateValidator),
  update,
);
route.delete("/:reference", authenticate([Role.USER]), remove);

export default route;
