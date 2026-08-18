import express, { Request, Response, NextFunction } from "express";
import http from "http";
import userRoutes from "./routes/user.routes.js";
import bookingRoutes from "./routes/booking.routes.js";
import reviewRoutes from "./routes/review.routes.js";
import authRoutes from "./routes/auth.routes.js";
import { connectDatabase } from "./config/db.config.js";
import { errorHandler } from "./middlewares/errorHandler.middleware.js";

const PORT = 8080;
const DB_URI = "mongodb://localhost:27017/Airbnb";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to website");
});
app.use("/users", userRoutes);
// app.use("/v2/auth", authRoutes);
app.use("/v1/auth", authRoutes);
app.use("/bookings", bookingRoutes);
app.use("/reviews", reviewRoutes);

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
server.listen(PORT, (): void =>
  console.log(`Server running on http://localhost:${PORT}`),
);
