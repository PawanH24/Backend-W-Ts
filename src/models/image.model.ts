import mongoose from "mongoose";
import { TImage } from "../types/global.types";

const imageSchema = new mongoose.Schema<TImage>({
  path: {
    type: String,
    required: [true, "Image path is requred"],
  },
  public_id: {
    type: String,
    required: [true, "Image public id is requred"],
  },
});

export default imageSchema;
