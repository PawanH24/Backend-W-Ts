import mongoose from "mongoose";
import { AmenitiesType } from "../types/enum.types";

interface TAmenities {
  name: string;
  category: AmenitiesType;
  icon: string;
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
    type: String,
    default: null,
  },
});

const Amenities = mongoose.model("Amenities", amenitiesSchema);
export default Amenities;
//create image module with models wehre its has tpes of mmage with some image type being true for main image oter being for multiple images.
