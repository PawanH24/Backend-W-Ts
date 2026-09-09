"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.verifyForgotPassword = exports.requestForgotPasswordOtp = exports.changePassword = exports.updateProfile = exports.getProfile = exports.login = exports.register = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const appError_utils_1 = __importDefault(require("../utils/appError.utils"));
const bcrypt_utils_1 = require("../utils/bcrypt.utils");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const sendResponse_utils_1 = require("../utils/sendResponse.utils");
const catchAsync_utils_1 = require("../utils/catchAsync.utils");
const jwt_utils_1 = require("../utils/jwt.utils");
const cloudinary_utils_1 = require("../utils/cloudinary.utils");
const env_config_1 = __importDefault(require("../config/env.config"));
const enum_types_1 = require("../types/enum.types");
const sendEmail_utils_1 = require("../utils/sendEmail.utils");
const emailTemplate_utils_1 = require("../utils/emailTemplate.utils");
const crypto_1 = __importDefault(require("crypto"));
const otp_model_1 = __importDefault(require("../models/otp.model"));
const folder = "/profile-images";
//register
exports.register = (0, catchAsync_utils_1.catchAsync)(async (req, res) => {
    const { fullName, email, password, phone, host = false } = req.body;
    const file = req.file;
    // if (!fullName) {
    //   //   const error: any = new Error("full_name required");
    //   //   error.statusCode = 400;
    //   //   error.status = "fail";
    //   //   error.success = false;
    //   throw new AppError("full_name is required", 400);
    // }
    // if (!email) throw new AppError("email is required", 400);
    // if (!password) throw new AppError("password is required", 400);
    const existingUser = await user_model_1.default.findOne({ email });
    if (existingUser)
        throw new appError_utils_1.default("User already exists with this email", 409);
    const hashedPassword = await (0, bcrypt_utils_1.hashPassword)(password);
    //user instance
    const user = new user_model_1.default({ fullName, email, password: hashedPassword, phone });
    if (host) {
        user.role = enum_types_1.Role.HOST;
    }
    //upload profile image
    if (file) {
        // user.profile_image = file.path;
        //upload file to cloudinary
        const { path, public_id } = await (0, cloudinary_utils_1.uploadFileToCloudinary)(file, folder);
        user.profile_image = {
            path,
            public_id,
        };
    }
    await user.save();
    (0, sendEmail_utils_1.sendEmail)({
        to: user.email,
        subject: "Account created",
        html: (0, emailTemplate_utils_1.generateAccountCreatedHtml)({
            email: user.email,
            fullName: user.fullName,
            created_at: new Date(Date.now()),
            agent: req.headers["user-agent"] ?? "",
        }),
    });
    const { password: _, ...userWithoutPassword } = user.toObject();
    (0, sendResponse_utils_1.sendResponse)(res, {
        message: "registered succesfully",
        statusCode: 201,
        data: userWithoutPassword,
    });
});
//login
exports.login = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email)
        throw new appError_utils_1.default("email is required", 400);
    if (!password)
        throw new appError_utils_1.default("password is required", 400);
    const user = await user_model_1.default.findOne({ email }).select("+password");
    if (!user)
        throw new appError_utils_1.default("Invalid email or password", 401);
    const isPasswordValid = await bcryptjs_1.default.compare(password, user.password);
    if (!isPasswordValid) {
        throw new appError_utils_1.default("Wrong password", 401);
    }
    //jws token
    const access_token = (0, jwt_utils_1.generateJwtToken)({
        _id: user._id,
        email: user.email,
        role: user.role,
    });
    //cookie
    res.cookie("access_token", access_token, {
        httpOnly: env_config_1.default.NODE_ENV === "development" ? false : true,
        secure: env_config_1.default.NODE_ENV === "development" ? false : true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        sameSite: env_config_1.default.NODE_ENV === "development" ? "lax" : "strict",
    });
    (0, sendEmail_utils_1.sendEmail)({
        to: user.email,
        subject: "New Login Detected",
        html: (0, emailTemplate_utils_1.generateAccountLoggedInHtml)({
            fullName: user.fullName,
            email: user.email,
            logged_in_at: new Date(),
            agent: req.get("user-agent") ?? "Unknown Device",
        }),
    });
    const { password: _, ...userWithoutPassword } = user.toObject();
    // 3. If password is correct, send success
    // response
    (0, sendResponse_utils_1.sendResponse)(res, {
        message: "Logged in successfully",
        statusCode: 200,
        data: {
            user: userWithoutPassword, //access_token
        },
    });
});
//get profile
exports.getProfile = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    const { _id } = req.user;
    const profile = await user_model_1.default.findOne({ _id });
    if (!profile)
        throw new appError_utils_1.default("something went wrong", 500);
    (0, sendResponse_utils_1.sendResponse)(res, {
        message: "profile fetched",
        data: profile,
        statusCode: 200,
    });
});
//updateProfile
exports.updateProfile = (0, catchAsync_utils_1.catchAsync)(async (req, res) => {
    const user = req.user;
    const file = req.file;
    const { fullName, phone } = req.body;
    const profile = await user_model_1.default.findOne({ _id: user._id });
    if (!profile)
        throw new appError_utils_1.default("Profile not found", 404, "NOT FOUND");
    if (fullName)
        profile.fullName = fullName;
    if (phone)
        profile.phone = phone;
    if (file) {
        const { path, public_id } = await (0, cloudinary_utils_1.uploadFileToCloudinary)(file, folder);
        await (0, cloudinary_utils_1.deleteFileFromCloudinary)(profile.profile_image.public_id);
        profile.profile_image = {
            path,
            public_id,
        };
    }
    await profile.save();
    (0, sendResponse_utils_1.sendResponse)(res, {
        message: "Profile updated successfully",
        statusCode: 200,
        data: profile,
    });
});
//change password
exports.changePassword = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    const { email } = req.user;
    const { password, new_password } = req.body;
    if (!email)
        throw new appError_utils_1.default("email is required", 400);
    if (!password)
        throw new appError_utils_1.default("password is required", 400);
    if (!new_password)
        throw new appError_utils_1.default("new password is required", 400);
    if (password === new_password)
        throw new appError_utils_1.default("New password must be different from current password", 400);
    const user = await user_model_1.default.findOne({ email: email }).select("+password");
    if (!user)
        throw new appError_utils_1.default("User not found", 404);
    const isPasswordValid = await bcryptjs_1.default.compare(password, user.password);
    if (!isPasswordValid)
        throw new appError_utils_1.default("Password incorrect", 401);
    user.password = await (0, bcrypt_utils_1.hashPassword)(new_password);
    await user.save();
    (0, sendResponse_utils_1.sendResponse)(res, {
        message: "Changed Password successfully",
        statusCode: 200,
    });
});
exports.requestForgotPasswordOtp = (0, catchAsync_utils_1.catchAsync)(async (req, res) => {
    const { email } = req.body;
    const OTP = crypto_1.default.randomBytes(3).toString("hex").toUpperCase();
    const user = await user_model_1.default.findOne({ email });
    if (!user)
        throw new appError_utils_1.default("User not found", 404);
    const hasOtp = await otp_model_1.default.findOne({ user: user._id }).sort({
        createdAt: -1,
    });
    //console.log(hasOtp);
    if (hasOtp) {
        const fivemin = 5 * 60 * 1000;
        const timePassed = Date.now() - hasOtp.createdAt.getTime();
        if (timePassed <= fivemin)
            throw new appError_utils_1.default("OTP already created plese wait for 5 minutes", 404);
    }
    await otp_model_1.default.deleteMany({
        user: user._id,
        action: enum_types_1.OtpAction.FORGOT_PASSWORD,
    });
    const otp = await otp_model_1.default.create({
        user: user._id,
        otp: await (0, bcrypt_utils_1.hashPassword)(OTP),
        action: enum_types_1.OtpAction.FORGOT_PASSWORD,
        expiresAt: Date.now() + 5 * 60 * 1000,
    });
    (0, sendEmail_utils_1.sendEmail)({
        to: email,
        subject: "OTP for changing password",
        html: (0, emailTemplate_utils_1.generateForgotPasswordOtpHtml)({
            fullName: user.fullName,
            otp: OTP,
            expiresAt: otp.expiresAt,
        }),
    });
    (0, sendResponse_utils_1.sendResponse)(res, {
        message: "OTP has been sent to your email",
        statusCode: 201,
    });
});
exports.verifyForgotPassword = (0, catchAsync_utils_1.catchAsync)(async (req, res) => {
    const { email, new_password, otp } = req.body;
    const user = await user_model_1.default.findOne({ email });
    if (!user)
        throw new appError_utils_1.default("User not found", 404);
    const otpVerification = await otp_model_1.default.findOne({
        user: user._id,
        action: enum_types_1.OtpAction.FORGOT_PASSWORD,
    }).select("+otp");
    if (!otpVerification)
        throw new appError_utils_1.default("invalid OTP", 404);
    if (otpVerification.expiresAt.getTime() < Date.now())
        throw new appError_utils_1.default("OTP has expired", 404);
    const isOtpValid = await (0, bcrypt_utils_1.comparePassword)(otp, otpVerification.otp);
    if (!isOtpValid)
        throw new appError_utils_1.default("Invalid OTP", 404);
    user.password = await (0, bcrypt_utils_1.hashPassword)(new_password);
    await user.save();
    await otpVerification.deleteOne();
    res.clearCookie("access_token", {
        httpOnly: env_config_1.default.NODE_ENV === "development" ? false : true,
        secure: env_config_1.default.NODE_ENV === "development" ? false : true,
        sameSite: env_config_1.default.NODE_ENV === "development" ? "lax" : "strict",
    });
    (0, sendResponse_utils_1.sendResponse)(res, {
        message: "Password changed successfully",
        statusCode: 200,
    });
});
//forgot password
//logout
exports.logout = (0, catchAsync_utils_1.catchAsync)(async (req, res) => {
    res.clearCookie("access_token", {
        httpOnly: env_config_1.default.NODE_ENV === "development" ? false : true,
        secure: env_config_1.default.NODE_ENV === "development" ? false : true,
        sameSite: env_config_1.default.NODE_ENV === "development" ? "lax" : "strict",
    });
    (0, sendResponse_utils_1.sendResponse)(res, {
        message: "Logged out successfully",
        statusCode: 200,
    });
});
//# sourceMappingURL=auth.controller.js.map