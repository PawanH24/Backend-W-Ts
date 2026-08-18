import { Router } from "express";
import {
  getAll,
  getById,
  create,
  update,
  remove,
} from "../controllers/booking.controller.js";

const route = Router();

route.get("/", getAll);
route.get("/:id", getById);
route.post("", create);
route.put("/:id", update);
route.delete("/:id", remove);

export default route;
