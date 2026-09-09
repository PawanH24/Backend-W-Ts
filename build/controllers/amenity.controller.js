"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.create = exports.getById = exports.getAll = void 0;
const amenities_model_1 = __importDefault(require("../models/amenities.model"));
const catchAsync_utils_1 = require("../utils/catchAsync.utils");
const appError_utils_1 = __importDefault(require("../utils/appError.utils"));
const sendResponse_utils_1 = require("../utils/sendResponse.utils");
const cloudinary_utils_1 = require("../utils/cloudinary.utils");
const enum_types_1 = require("../types/enum.types");
const folder = "/amenities";
exports.getAll = (0, catchAsync_utils_1.catchAsync)(async (req, res) => {
    const filter = {};
    const { name } = req.query;
    name && (filter.name = { $regex: name, $options: "i" });
    const amenity = await amenities_model_1.default.find(filter);
    (0, sendResponse_utils_1.sendResponse)(res, {
        message: "Displaying all amenity",
        statusCode: 200,
        data: amenity,
    });
});
exports.getById = (0, catchAsync_utils_1.catchAsync)(async (req, res) => {
    const id = req.params.id;
    const amenity = await amenities_model_1.default.findById(id);
    if (!amenity) {
        throw new appError_utils_1.default("Amenity not found", 404);
    }
    (0, sendResponse_utils_1.sendResponse)(res, {
        message: "Amenity found successfully",
        statusCode: 200,
        data: amenity,
    });
});
exports.create = (0, catchAsync_utils_1.catchAsync)(async (req, res) => {
    const { name, description } = req.body;
    const file = req.file;
    const user = req.user;
    if (!file)
        throw new appError_utils_1.default("Logo is required", 400, "VALIDATION_ERR");
    const amenity = new amenities_model_1.default({ name, description, user: user._id });
    const { path, public_id } = await (0, cloudinary_utils_1.uploadFileToCloudinary)(file, folder);
    amenity.icon = {
        path,
        public_id,
    };
    await amenity.save();
    (0, sendResponse_utils_1.sendResponse)(res, {
        message: "Amenity created successfully",
        statusCode: 201,
        data: amenity,
    });
});
exports.update = (0, catchAsync_utils_1.catchAsync)(async (req, res) => {
    const id = req.params.id;
    const { name, description } = req.body;
    const file = req.file;
    const user = req.user;
    const amenity = await amenities_model_1.default.findOne({ _id: id }).populate("user");
    if (!amenity)
        throw new appError_utils_1.default("Amenity not found", 404, "NOT FOUND");
    //only admin and owner can update
    if (user.role !== enum_types_1.Role.ADMIN && !amenity.user._id.equals(user._id)) {
        throw new appError_utils_1.default("Only admin or owner can update this resource", 400);
    }
    if (!amenity) {
        throw new appError_utils_1.default("Amenity not found", 404);
    }
    if (name)
        amenity.name = name;
    if (description)
        amenity.description = description;
    if (file) {
        const { path, public_id } = await (0, cloudinary_utils_1.uploadFileToCloudinary)(file, folder);
        await (0, cloudinary_utils_1.deleteFileFromCloudinary)(amenity.icon.public_id);
        amenity.icon = {
            path,
            public_id,
        };
    }
    await amenity.save();
    (0, sendResponse_utils_1.sendResponse)(res, {
        message: "Amenity updated successfully",
        statusCode: 200,
        data: amenity,
    });
});
exports.remove = (0, catchAsync_utils_1.catchAsync)(async (req, res) => {
    const id = req.params.id;
    const user = req.user;
    const amenity = await amenities_model_1.default.findOne({ _id: id }).populate("user");
    if (!amenity) {
        throw new appError_utils_1.default("Amenity not found", 404, "NOT FOUND");
    }
    if (user.role !== enum_types_1.Role.ADMIN &&
        amenity.user._id.toString() !== user._id.toString()) {
        throw new appError_utils_1.default("Only admin or owner can update this resource", 400);
    }
    await (0, cloudinary_utils_1.deleteFileFromCloudinary)(amenity.icon.public_id);
    await amenity.deleteOne();
    //image needs to be deleted before deleing amenity itself
    (0, sendResponse_utils_1.sendResponse)(res, {
        message: "Amenity deleted successfully",
        statusCode: 200,
    });
});
//# sourceMappingURL=amenity.controller.js.map