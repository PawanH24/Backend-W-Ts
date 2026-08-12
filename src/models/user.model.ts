import mongoose, { Document } from "mongoose";

enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
}

interface TUserDocument {
  fullName: string;
  email: string;
  password: string;
  phone?: string;
  profile_image: string;
  role: Role;
}

const userSchema = new mongoose.Schema<TUserDocument>(
  {
    fullName: {
      type: String,
      required: [true, "full_name is required"],
      minLength: [3, "full_name must be at least 2 characters long"],
      trim: true,
    },
    email: {
      type: String,
      unique: [true, "User already exists with provided email"],
      required: [true, "email is required"],
      minLength: 7,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "full_name is required"],
    },
    role: {
      type: String,
      enum: Object.values(Role),
      default: Role.USER,
    },
    phone: {
      type: String,
      default: null,
      minLength: 10,
      trim: true,
    },
    profile_image: {
      type: String,
      default: null,
    },
  },
  { timestamps: true },
);

const User = mongoose.model<TUserDocument>("user", userSchema);
export default User;
