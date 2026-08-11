import type { Request, Response } from "express";
import User from "../models/user.model.js";

export const getAll = async (req: Request, res: Response) => {
  try {
    const users = await User.find({});
    res.status(200).json({ message: "user path" });
  } catch (error) {
    res.status(500).json(error);
  }
};
