"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const crypto_1 = __importDefault(require("crypto"));
const bookingSchema = new mongoose_1.default.Schema({
    booking_reference: {
        type: String,
        required: true,
        default: () => crypto_1.default.randomBytes(3).toString("hex").toUpperCase(),
    },
    host: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    property: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "property",
        required: true,
    },
    total_price: {
        type: Number,
        required: true,
    },
    payment_status: {
        type: Boolean,
        default: false,
    },
    check_in: {
        type: Date,
        required: true,
    },
    check_out: {
        type: Date,
        required: true,
    },
}, {
    timestamps: true,
});
const Booking = mongoose_1.default.model("booking", bookingSchema);
exports.default = Booking;
//# sourceMappingURL=booking.model.js.map