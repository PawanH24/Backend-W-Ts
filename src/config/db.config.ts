import mongoose from "mongoose";

export const connectDatabase = (DB_URI: string) =>
  mongoose
    .connect(DB_URI, {
      dbName: "JobSeeker",
      autoCreate: true,
    })
    .then(() => {
      console.log("Database is connected");
    })
    .catch((error) => {
      console.log("Database connection error", error);
    });
