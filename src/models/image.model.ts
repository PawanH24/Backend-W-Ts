import mongoose from "mongoose";
import { ImageType } from "../types/enum.types";

interface TImage {
  url: string;
  type: ImageType;
  owner: mongoose.Types.ObjectId;
}

const imageSchema = new mongoose.Schema<TImage>(
  {
    url: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: Object.values(ImageType),
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true },
);

const Image = mongoose.model<TImage>("Image", imageSchema);
export default Image;
