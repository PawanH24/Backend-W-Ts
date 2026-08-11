import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 2,
  },
  lastName: {
    type: String,
    required: true,
    minLength: 2,
  },
  email: {
    type: String,
    required: true,
    minLength: 7,
  },
  number: {
    type: Number,
    minLength: 10,
  },
  address: {
    type: String,
    required: true,
    minLength: 5,
  },
});

const User = mongoose.model("user", userSchema);
export default User;
