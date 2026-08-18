import { Router } from "express";
import {
  getAll,
  getById,
  update,
  remove,
} from "../controllers/user.controller.js";

const route = Router();

route.get("/", getAll);
route.get("/:id", getById);
route.put("/:id", update);
route.delete("/:id", remove);

export default route;
