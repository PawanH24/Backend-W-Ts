import mongoose, { Document } from "mongoose";

export interface IImageDocument extends Document {
  path: string;
  public_id: string;
}

const imageSchema = new mongoose.Schema<IImageDocument>({
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
