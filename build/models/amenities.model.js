"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const image_model_1 = __importDefault(require("../models/image.model"));
const amenitiesSchema = new mongoose_1.default.Schema({
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
        type: image_model_1.default,
        default: null,
        _id: false,
        required: true,
    },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: [true, "user is required"],
        ref: "user",
    },
}, { timestamps: true });
const Amenities = mongoose_1.default.model("Amenities", amenitiesSchema);
exports.default = Amenities;
//# sourceMappingURL=amenities.model.js.map