"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const enum_types_1 = require("../types/enum.types");
const image_model_1 = __importDefault(require("./image.model"));
const userSchema = new mongoose_1.default.Schema({
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
        select: false,
    },
    role: {
        type: String,
        enum: Object.values(enum_types_1.Role),
        default: enum_types_1.Role.USER,
    },
    phone: {
        type: String,
        default: null,
        minLength: 10,
        trim: true,
    },
    profile_image: {
        type: image_model_1.default,
        default: null,
        _id: false,
    },
}, { timestamps: true });
const User = mongoose_1.default.model("user", userSchema);
exports.default = User;
//# sourceMappingURL=user.model.js.map