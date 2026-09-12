import { Router } from "express";
import {
  initiatePayment,
  getMyPayments,
} from "../controllers/payment.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const route = Router();

route.get("/", authenticate(), getMyPayments);
route.post("/initiate", authenticate(), initiatePayment);
// note: NO authenticate() here — Stripe itself calls this, not a logged-in browser,
// and it has no cookie/token. Its own signature check IS its authentication.

export default route;
