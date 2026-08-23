import mongoose from "mongoose";
import { AmenitiesType } from "../types/enum.types";

interface TAmenities {
  name: string;
  category: AmenitiesType;
  icon: mongoose.Types.ObjectId;
}

const amenitiesSchema = new mongoose.Schema<TAmenities>({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  category: {
    type: String,
    enum: Object.values(AmenitiesType),
    required: true,
  },
  icon: {
    type: mongoose.Schema.Types.ObjectId,
    default: null,
    ref: "Image",
  },
});

const Amenities = mongoose.model<TAmenities>("Amenities", amenitiesSchema);
export default Amenities;
//create image module with models wehre its has tpes of mmage with some image type being true for main image oter being for multiple images.
