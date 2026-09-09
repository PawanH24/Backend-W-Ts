"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const reviewSchema = new mongoose_1.default.Schema({
    property: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "property",
        required: [true, "property is required"],
    },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "user",
        required: [true, "user is required"],
    },
    booking: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "booking",
        required: [true, "booking is required"],
        unique: [true, "this booking has already been reviewed"],
    },
    rating: {
        type: Number,
        required: [true, "rating is required"],
        min: [1, "rating must be at least 1"],
        max: [5, "rating cannot exceed 5"],
    },
    comment: {
        type: String,
        trim: true,
        maxLength: [500, "comment cannot exceed 500 characters"],
    },
}, { timestamps: true });
const Review = mongoose_1.default.model("review", reviewSchema);
exports.default = Review;
//# sourceMappingURL=review.model.js.map