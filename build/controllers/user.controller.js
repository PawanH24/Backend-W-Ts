"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.getById = exports.getAll = void 0;
const user_model_js_1 = __importDefault(require("../models/user.model.js"));
const catchAsync_utils_js_1 = require("../utils/catchAsync.utils.js");
const appError_utils_js_1 = __importDefault(require("../utils/appError.utils.js"));
const sendResponse_utils_js_1 = require("../utils/sendResponse.utils.js");
const cloudinary_utils_js_1 = require("../utils/cloudinary.utils.js");
const folder = "/profile-images";
exports.getAll = (0, catchAsync_utils_js_1.catchAsync)(async (req, res) => {
    const filter = {};
    const { role, name, phone } = req.query;
    role && (filter.role = role);
    name && (filter.name = { $regex: name, $options: "i" });
    phone && (filter.phone = { $regex: phone, $options: "i" });
    const users = await user_model_js_1.default.find(filter).select("-password");
    (0, sendResponse_utils_js_1.sendResponse)(res, {
        message: "Displaying all users",
        statusCode: 200,
        data: users,
    });
});
exports.getById = (0, catchAsync_utils_js_1.catchAsync)(async (req, res) => {
    const id = req.params.id;
    const user = await user_model_js_1.default.findById(id).select("-password");
    if (!user)
        throw new appError_utils_js_1.default("user not found", 404);
    (0, sendResponse_utils_js_1.sendResponse)(res, {
        message: "user found successfully",
        statusCode: 200,
        data: user,
    });
});
exports.update = (0, catchAsync_utils_js_1.catchAsync)(async (req, res) => {
    const id = req.params.id;
    const { fullName, role, phone } = req.body;
    const file = req.file;
    const user = await user_model_js_1.default.findOne({ _id: id });
    if (!user)
        throw new appError_utils_js_1.default("User not found", 400);
    if (fullName)
        user.fullName = fullName;
    if (role)
        user.role = role;
    if (phone)
        user.phone = phone;
    if (file) {
        const { path, public_id } = await (0, cloudinary_utils_js_1.uploadFileToCloudinary)(file, folder);
        await (0, cloudinary_utils_js_1.deleteFileFromCloudinary)(user.profile_image.public_id);
        user.profile_image = {
            path,
            public_id,
        };
    }
    await user.save();
    (0, sendResponse_utils_js_1.sendResponse)(res, {
        message: `${user.role} updated successfully`,
        statusCode: 201,
        data: user,
    });
});
exports.remove = (0, catchAsync_utils_js_1.catchAsync)(async (req, res) => {
    const _id = req.params.id;
    const user = await user_model_js_1.default.findOne({ _id });
    if (!user)
        throw new appError_utils_js_1.default("user not found", 404, "NOT FOUND");
    await (0, cloudinary_utils_js_1.deleteFileFromCloudinary)(user.profile_image.public_id);
    await user.deleteOne();
    (0, sendResponse_utils_js_1.sendResponse)(res, {
        message: "User deleted successsfully",
        statusCode: 200,
        data: user,
    });
});
//# sourceMappingURL=user.controller.js.map