"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const enum_types_1 = require("../types/enum.types");
const otpSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    otp: {
        type: String,
        required: true,
        select: false,
    },
    action: {
        type: String,
        enum: Object.values(enum_types_1.OtpAction),
        required: true,
    },
    active: {
        type: Boolean,
        default: true,
        required: true,
    },
    expiresAt: {
        type: Date,
        required: true,
    },
}, { timestamps: true });
const Otp = mongoose_1.default.model("otp", otpSchema);
exports.default = Otp;
//# sourceMappingURL=otp.model.js.map