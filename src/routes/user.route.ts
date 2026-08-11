import { Router } from "express";
import { getAll } from "../controllers/user.controller.js";

const route = Router();

route.get("/", getAll);

export default route;
