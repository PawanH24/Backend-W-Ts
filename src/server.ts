import express, { Request, Response, NextFunction } from "express";
import http from "http";
import userRoutes from "./routes/user.routes.js";
import bookingRoutes from "./routes/booking.routes.js";
import reviewRoutes from "./routes/review.routes.js";
import authRoutes from "./routes/auth.routes.js";
import propertyRoutes from "./routes/property.routes.js";
import amenityRoutes from "./routes/amenity.routes.js";
import { connectDatabase } from "./config/db.config.js";
import { errorHandler } from "./middlewares/errorHandler.middleware.js";
import cookieParser from "cookie-parser";

import ENV_CONFIG from "./config/env.config.js";
import { verifySmtpServer } from "./config/nodemailer.config.js";

const PORT = ENV_CONFIG.PORT;
const DB_URI = ENV_CONFIG.DB_URI;

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("Welcome to website");
});
app.use("/users", userRoutes);
// app.use("/v2/auth", authRoutes);
app.use("/v1/auth", authRoutes);
app.use("/bookings", bookingRoutes);
app.use("/reviews", reviewRoutes);
app.use("/property", propertyRoutes);
app.use("/amenity", amenityRoutes);

connectDatabase(DB_URI);

app.use((req: Request, res: Response, next: NextFunction) => {
  const error: any = new Error(`cannot get ${req.method} on ${req.path}`);
  error.statusCode = 404;
  error.status = "fail";
  error.success = false;
  next(error);
});

app.use(errorHandler);

const server = http.createServer(app);
server.listen(PORT, (): void => {
  console.log(`Server running on http://localhost:${PORT}`);
  verifySmtpServer();
});
