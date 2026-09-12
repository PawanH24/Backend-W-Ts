import stripe from "../config/stripe.config.js";
import ENV_CONFIG from "../config/env.config.js";
import Payment from "../models/payment.model.js";
import { PaymentStatus } from "../types/enum.types.js";
import Booking from "../models/booking.model.js";
import { catchAsync } from "../utils/catchAsync.utils.js";
import AppError from "../utils/appError.utils.js";
import { sendResponse } from "../utils/sendResponse.utils.js";
import { Request, Response } from "express";
import type Stripe from "stripe";
import type { Checkout } from "stripe";

export const initiatePayment = catchAsync(
  async (req: Request, res: Response) => {
    const { booking_id } = req.body;
    const user_id = req.user._id;

    const booking = await Booking.findOne({
      _id: booking_id,
      user: user_id,
    }).populate("property");
    if (!booking) throw new AppError("Booking not found", 404);
    if (booking.payment_status)
      throw new AppError("This booking has already been paid", 400);

    const existingPayment = await Payment.findOne({ booking: booking_id });
    if (existingPayment && existingPayment.status === PaymentStatus.SUCCESS)
      throw new AppError("This booking has already been paid", 400);

    const property = booking.property as any;

    // Stripe wants amount in the SMALLEST currency unit — cents, not dollars.
    // $54.00 becomes 5400. Forgetting this is the #1 beginner mistake.
    const amountInCents = Math.round(booking.total_price * 100);

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: property.name },
            unit_amount: amountInCents,
          },
          quantity: 1,
        },
      ],
      // this is how you tie the Stripe session back to YOUR booking later, in the webhook
      metadata: {
        booking_id: booking._id.toString(),
        user_id: user_id.toString(),
      },
      success_url: `${ENV_CONFIG.CLIENT_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${ENV_CONFIG.CLIENT_URL}/payment/cancel`,
    });

    let payment;
    if (existingPayment) {
      // reuse the stale PENDING/FAILED record instead of creating a duplicate —
      // this is what your unique index on `booking` was blocking
      existingPayment.transaction_id = session.id;
      existingPayment.status = PaymentStatus.PENDING;
      payment = await existingPayment.save();
    } else {
      payment = await Payment.create({
        booking: booking._id,
        user: user_id,
        amount: booking.total_price,
        status: PaymentStatus.PENDING,
        transaction_id: session.id,
      });
    }

    sendResponse(res, {
      message: "Checkout session created",
      statusCode: 201,
      data: { checkout_url: session.url, payment_id: payment._id },
    });
  },
);

export const handleStripeWebhook = async (req: Request, res: Response) => {
  const sig = req.headers["stripe-signature"] as string;

  let event: Stripe.Event;
  try {
    // this verifies the request genuinely came from Stripe, not a spoofed request
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      ENV_CONFIG.STRIPE_WEBHOOK_SECRET,
    );
  } catch (err: any) {
    console.log("Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Checkout.Session;
    const bookingId = session.metadata?.booking_id;

    const payment = await Payment.findOne({ transaction_id: session.id });
    if (payment) {
      payment.status = PaymentStatus.SUCCESS;
      payment.paid_at = new Date();
      await payment.save();
    }

    if (bookingId) {
      await Booking.findByIdAndUpdate(bookingId, { payment_status: true });
    }
  }

  res.json({ received: true });
};

export const getMyPayments = catchAsync(async (req: Request, res: Response) => {
  const payments = await Payment.find({ user: req.user._id }).populate(
    "booking",
    "booking_reference check_in check_out",
  );

  sendResponse(res, {
    message: "Displaying your payments",
    statusCode: 200,
    data: payments,
  });
});
