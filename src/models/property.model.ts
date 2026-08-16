import mongoose from "mongoose";

interface TProperty {
  host: string;
  title: string;
  description: string;
  price: number;
  address: string;
  rooms: string;
  type: string;
}

const propertySchema = new mongoose.Schema<TProperty>({
  host: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  rooms: {
    type: String,
  },
  type: {
    type: String,
  },
});

const Property = mongoose.model<TProperty>("property", propertySchema);
export default Property;
