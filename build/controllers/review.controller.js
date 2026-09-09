"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.create = exports.getById = exports.getAll = void 0;
const review_model_js_1 = __importDefault(require("../models/review.model.js"));
const booking_model_js_1 = __importDefault(require("../models/booking.model.js"));
const catchAsync_utils_js_1 = require("../utils/catchAsync.utils.js");
const appError_utils_js_1 = __importDefault(require("../utils/appError.utils.js"));
const sendResponse_utils_js_1 = require("../utils/sendResponse.utils.js");
const enum_types_js_1 = require("../types/enum.types.js");
exports.getAll = (0, catchAsync_utils_js_1.catchAsync)(async (req, res) => {
    const { property_id } = req.query;
    const filter = {};
    if (property_id)
        filter.property = property_id;
    const reviews = await review_model_js_1.default.find(filter)
        .populate("user", "fullName profile_image")
        .populate("property", "name address");
    (0, sendResponse_utils_js_1.sendResponse)(res, {
        message: "Displaying all reviews",
        statusCode: 200,
        data: reviews,
    });
});
exports.getById = (0, catchAsync_utils_js_1.catchAsync)(async (req, res) => {
    const id = req.params.id;
    const review = await review_model_js_1.default.findById(id)
        .populate("user", "fullName profile_image")
        .populate("property", "name address");
    if (!review)
        throw new appError_utils_js_1.default("Review not found", 404);
    (0, sendResponse_utils_js_1.sendResponse)(res, {
        message: "Review found successfully",
        statusCode: 200,
        data: review,
    });
});
exports.create = (0, catchAsync_utils_js_1.catchAsync)(async (req, res) => {
    const { property_id, booking_id, rating, comment } = req.body;
    const user_id = req.user._id;
    const booking = await booking_model_js_1.default.findOne({
        _id: booking_id,
        user: user_id,
        property: property_id,
    });
    if (!booking)
        throw new appError_utils_js_1.default("Booking not found for this property", 404);
    if (new Date(booking.check_out) > new Date())
        throw new appError_utils_js_1.default("You can only review after your stay is complete", 400);
    const existingReview = await review_model_js_1.default.findOne({ booking: booking_id });
    if (existingReview)
        throw new appError_utils_js_1.default("You have already reviewed this booking", 409);
    const review = await review_model_js_1.default.create({
        property: property_id,
        user: user_id,
        booking: booking_id,
        rating,
        comment,
    });
    await review.populate("user", "fullName profile_image");
    (0, sendResponse_utils_js_1.sendResponse)(res, {
        message: "Review created successfully",
        statusCode: 201,
        data: review,
    });
});
exports.update = (0, catchAsync_utils_js_1.catchAsync)(async (req, res) => {
    const id = req.params.id;
    const user_id = req.user._id;
    const { rating, comment } = req.body;
    const review = await review_model_js_1.default.findById(id);
    if (!review)
        throw new appError_utils_js_1.default("Review not found", 404);
    if (review.user.toString() !== user_id.toString())
        throw new appError_utils_js_1.default("Only the review author can edit this review", 403);
    if (rating)
        review.rating = rating;
    if (comment !== undefined)
        review.comment = comment;
    await review.save();
    (0, sendResponse_utils_js_1.sendResponse)(res, {
        message: "Review updated successfully",
        statusCode: 200,
        data: review,
    });
});
exports.remove = (0, catchAsync_utils_js_1.catchAsync)(async (req, res) => {
    const id = req.params.id;
    const user = req.user;
    const review = await review_model_js_1.default.findById(id);
    if (!review)
        throw new appError_utils_js_1.default("Review not found", 404);
    if (user.role !== enum_types_js_1.Role.ADMIN &&
        review.user.toString() !== user._id.toString())
        throw new appError_utils_js_1.default("Only admin or the review author can delete this review", 403);
    await review.deleteOne();
    (0, sendResponse_utils_js_1.sendResponse)(res, {
        message: "Review deleted successfully",
        statusCode: 200,
        data: review,
    });
});
//# sourceMappingURL=review.controller.js.map