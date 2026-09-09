"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.create = exports.getByReference = exports.getAll = void 0;
const booking_model_1 = __importDefault(require("../models/booking.model"));
const catchAsync_utils_1 = require("../utils/catchAsync.utils");
const appError_utils_1 = __importDefault(require("../utils/appError.utils"));
const sendResponse_utils_1 = require("../utils/sendResponse.utils");
const enum_types_1 = require("../types/enum.types");
const property_model_1 = __importDefault(require("../models/property.model"));
const sendEmail_utils_1 = require("../utils/sendEmail.utils");
const emailTemplate_utils_1 = require("../utils/emailTemplate.utils");
exports.getAll = (0, catchAsync_utils_1.catchAsync)(async (req, res) => {
    const user = req.user;
    const filter = {};
    const { property_name } = req.query;
    if (user.role === enum_types_1.Role.USER)
        filter.user = user;
    // else if (user.role === Role.HOST) filter.host = user;
    if (property_name) {
        const properties = await property_model_1.default.find({
            name: { $regex: property_name, $options: "i" },
        }).select("_id");
        filter.property = { $in: properties.map((p) => p._id) };
        //{[1,23,3]}
        //{["name1","name2"]}
    }
    const bookings = await booking_model_1.default.find(filter)
        .populate("property", "name address main_image")
        .populate("user", "fullName email phone profile_image");
    (0, sendResponse_utils_1.sendResponse)(res, {
        message: "Displaying all bookings",
        statusCode: 200,
        data: bookings,
    });
});
exports.getByReference = (0, catchAsync_utils_1.catchAsync)(async (req, res) => {
    const reference = (req.params.reference || "");
    const user = req.user;
    const filter = { booking_reference: reference.toUpperCase() };
    if (user.role === enum_types_1.Role.USER)
        filter.user = user;
    else if (user.role === enum_types_1.Role.HOST)
        filter.host = user;
    const booking = await booking_model_1.default.findOne(filter)
        .populate("property", "name address main_image")
        .populate("user", "fullName email phone profile_image");
    if (!booking) {
        throw new appError_utils_1.default("Booking not found", 404);
    }
    (0, sendResponse_utils_1.sendResponse)(res, {
        message: "Booking found successfully",
        statusCode: 200,
        data: booking,
    });
});
exports.create = (0, catchAsync_utils_1.catchAsync)(async (req, res) => {
    const { property_id, check_in, check_out } = req.body;
    const user_id = req.user._id;
    const property = await property_model_1.default.findById(property_id);
    if (!property)
        throw new appError_utils_1.default("property you are trying to book does not exist", 404);
    if (property.host.equals(user_id))
        throw new appError_utils_1.default("You cannot book your own property", 400);
    let time = 0;
    if (property.price_type === "per_day") {
        time = Math.max(1, Math.round((check_out - check_in) / (1000 * 60 * 60 * 24)));
    }
    else if (property.price_type === "per_hour") {
        time = Math.max(1, Math.round((check_out - check_in) / (1000 * 60 * 60)));
    }
    else if (property.price_type === "per_week") {
        time = Math.max(1, Math.round((check_out - check_in) / (1000 * 60 * 60 * 24 * 7)));
    }
    else if (property.price_type === "per_month") {
        time = Math.max(1, Math.round((check_out - check_in) / (1000 * 60 * 60 * 24 * 30)));
    }
    const booking = await booking_model_1.default.create({
        user: user_id,
        host: property.host,
        property: property_id,
        check_in,
        check_out,
        total_price: property.amount * time,
        payment_status: false,
    });
    await booking.populate("user", "fullName email phone profile_image");
    await booking.populate("host", "fullName email phone profile_image");
    await booking.populate("property", "name address main_image");
    const guest = booking.user;
    const host = booking.host;
    Promise.all([
        (0, sendEmail_utils_1.sendEmail)({
            to: guest.email,
            subject: `Booking Confirmed - ${property.name}`,
            html: (0, emailTemplate_utils_1.generateBookingCreatedHtml)({
                guestName: guest.fullName,
                propertyAddress: property.address,
                propertyName: property.name,
                bookingReference: booking.booking_reference,
                checkIn: booking.check_in,
                checkOut: booking.check_out,
                totalPrice: booking.total_price,
            }),
        }),
        (0, sendEmail_utils_1.sendEmail)({
            to: host.email,
            subject: `New Booking Recieved - ${property.name}`,
            html: (0, emailTemplate_utils_1.generateHostBookingNotificationHtml)({
                hostName: host.fullName,
                guestName: guest.fullName,
                guestEmail: guest.email,
                propertyName: property.name,
                bookingReference: booking.booking_reference,
                checkIn: booking.check_in,
                checkOut: booking.check_out,
                totalPrice: booking.total_price,
            }),
        }),
    ]);
    (0, sendResponse_utils_1.sendResponse)(res, {
        message: "Booking created successfully",
        statusCode: 201,
        data: booking,
    });
});
exports.update = (0, catchAsync_utils_1.catchAsync)(async (req, res) => {
    const reference = (req.params.reference || "");
    const user = req.user;
    const { check_in, check_out } = req.body;
    const booking = await booking_model_1.default.findOne({
        booking_reference: reference.toUpperCase(),
        user: user._id,
    }).populate("property");
    if (!booking)
        throw new appError_utils_1.default("Booking not found", 404);
    if (!booking.property)
        throw new appError_utils_1.default("Property information missing", 404);
    const property = booking.property;
    let time = 0;
    if (property.price_type === "per_day") {
        time = Math.max(1, Math.round((check_out - check_in) / (1000 * 60 * 60 * 24)));
    }
    else if (property.price_type === "per_hour") {
        time = Math.max(1, Math.round((check_out - check_in) / (1000 * 60 * 60)));
    }
    else if (property.price_type === "per_week") {
        time = Math.max(1, Math.round((check_out - check_in) / (1000 * 60 * 60 * 24 * 7)));
    }
    else if (property.price_type === "per_month") {
        time = Math.max(1, Math.round((check_out - check_in) / (1000 * 60 * 60 * 24 * 30)));
    }
    booking.check_in = check_in;
    booking.check_out = check_out;
    booking.total_price = property.amount * time;
    await booking.save();
    (0, sendResponse_utils_1.sendResponse)(res, {
        message: "Booking updated successfully",
        statusCode: 200,
        data: booking,
    });
});
exports.remove = (0, catchAsync_utils_1.catchAsync)(async (req, res) => {
    const reference = (req.params.reference || "");
    const user_id = req.user._id;
    const booking = await booking_model_1.default.findOneAndDelete({
        booking_reference: reference.toUpperCase(),
        user: user_id,
    });
    if (!booking) {
        throw new appError_utils_1.default("Booking not found or you are not authorized to cancel it", 404);
    }
    (0, sendResponse_utils_1.sendResponse)(res, {
        message: "Booking deleted successfully",
        statusCode: 200,
        data: booking,
    });
});
//# sourceMappingURL=booking.controller.js.map