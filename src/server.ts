import express from "express";
import http from "http";
import userRoutes from "./routes/user.route.js";
import { connectDatabase } from "./config/db.config.js";
import { errorHandler } from "./middlewares/errorHandler.middleware.js";

const PORT = 8080;
const DB_URI = "mongodb://localhost:27017/JobSeeker";

const app = express();
app.use(express.json());

app.use("/", (req, res) => {
  res.send("Welcome to website");
});
app.use("/users", userRoutes);

connectDatabase(DB_URI);
app.use(errorHandler);

const server = http.createServer(app);
server.listen(PORT, (): void =>
  console.log(`Server running on http://localhost:${PORT}`),
);
