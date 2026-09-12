import Stripe from "stripe";
import ENV_CONFIG from "./env.config";

const stripe: Stripe = new Stripe(ENV_CONFIG.STRIPE_SECRET_KEY, {
  apiVersion: "2026-08-26.dahlia",
});

export default stripe;
