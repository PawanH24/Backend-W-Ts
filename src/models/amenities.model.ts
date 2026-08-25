import mongoose from "mongoose";

interface TAmenities {
  name: string;
  description: string;
  icon: { path: string; public_id: string };
  user: mongoose.Types.ObjectId;
}

const amenitiesSchema = new mongoose.Schema<TAmenities>(
  {
    name: {
      type: String,
      required: true,
      unique: [true, "amenity already exists"],
      trim: true,
    },
    // category: {
    //   type: String,
    //   enum: Object.values(AmenitiesType),
    //   required: true,
    // },
    description: {
      type: String,
      required: [true, "description is required"],
      minLength: [10, "at least 10 characters required"],
    },
    icon: {
      type: {
        path: { type: String, required: true },
        public_id: { type: String, required: true },
      },
      default: null,
      _id: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "user is required"],
      ref: "user",
    },
  },
  { timestamps: true },
);

const Amenities = mongoose.model<TAmenities>("Amenities", amenitiesSchema);
export default Amenities;
//create image module with models wehre its has tpes of mmage with some image type being true for main image oter being for multiple images.
