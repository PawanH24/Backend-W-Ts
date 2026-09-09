"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.create = exports.getById = exports.getByHost = exports.getAll = void 0;
const property_model_js_1 = __importDefault(require("../models/property.model.js"));
const catchAsync_utils_js_1 = require("../utils/catchAsync.utils.js");
const appError_utils_js_1 = __importDefault(require("../utils/appError.utils.js"));
const sendResponse_utils_js_1 = require("../utils/sendResponse.utils.js");
const cloudinary_utils_js_1 = require("../utils/cloudinary.utils.js");
const enum_types_js_1 = require("../types/enum.types.js");
const folder = "/properties";
exports.getAll = (0, catchAsync_utils_js_1.catchAsync)(async (req, res) => {
    const filter = {};
    const { query, minPrice, maxPrice, page = 1, limit = 10, price_type, rooms, property_type, country, city, street_name, } = req.query;
    const perPage = Number(limit);
    const currentPage = Number(page);
    const skip = (currentPage - 1) * perPage;
    if (query) {
        filter.$or = [
            {
                name: {
                    $regex: query,
                    $options: "i",
                },
            },
            {
                description: {
                    $regex: query,
                    $options: "i",
                },
            },
        ];
    }
    if (minPrice || maxPrice) {
        const floor = Number(minPrice);
        const ceil = Number(maxPrice);
        if (floor) {
            filter.amount = { $gte: floor };
        }
        if (ceil) {
            filter.amount = { $lte: ceil };
        }
        if (floor && ceil) {
            filter.amount = {
                $lte: ceil,
                $gte: floor,
            };
        }
    }
    price_type && (filter.price_type = price_type);
    rooms && (filter.rooms = rooms);
    property_type && (filter.property_type = property_type);
    country && (filter["address.country"] = country);
    city && (filter["address.city"] = city);
    street_name &&
        (filter["address.street_name"] = { $regex: street_name, $options: "i" });
    //name: ?=wifi
    const property = await property_model_js_1.default.find(filter).limit(perPage).skip(skip); //try this using only array functions
    const total = await property_model_js_1.default.countDocuments(filter);
    const totalPage = Math.ceil(total / perPage);
    const pagination = {
        page: currentPage,
        limit: perPage,
        totalPage: totalPage,
        total: total,
        nextPage: currentPage < totalPage ? currentPage + 1 : null,
        pevPage: currentPage > 1 ? currentPage - 1 : null,
    };
    (0, sendResponse_utils_js_1.sendResponse)(res, {
        message: "Displaying all properties",
        statusCode: 200,
        data: { property, pagination },
    });
});
exports.getByHost = (0, catchAsync_utils_js_1.catchAsync)(async (req, res) => {
    const user = req.user._id;
    const property = await property_model_js_1.default.find({ host: user });
    (0, sendResponse_utils_js_1.sendResponse)(res, {
        message: "Displaying all properties",
        statusCode: 200,
        data: property,
    });
});
exports.getById = (0, catchAsync_utils_js_1.catchAsync)(async (req, res) => {
    const id = req.params.id;
    const property = await property_model_js_1.default.findById(id);
    if (!property) {
        throw new appError_utils_js_1.default("Property not found", 404);
    }
    (0, sendResponse_utils_js_1.sendResponse)(res, {
        message: "Property found successfully",
        statusCode: 200,
        data: property,
    });
});
exports.create = (0, catchAsync_utils_js_1.catchAsync)(async (req, res) => {
    const { main_image, gallery_images } = req.files;
    const { name, description, amount, price_type, address, rooms, property_type, } = req.body;
    const { _id } = req.user;
    if (!main_image[0])
        throw new appError_utils_js_1.default("Main image is required", 400);
    if (!gallery_images || gallery_images.length < 2) {
        throw new appError_utils_js_1.default("Gallery image is required", 400);
    }
    const property = new property_model_js_1.default({
        name,
        description,
        amount,
        price_type,
        address,
        rooms,
        property_type,
        host: _id,
    });
    const { path, public_id } = await (0, cloudinary_utils_js_1.uploadFileToCloudinary)(main_image[0], folder);
    property.main_image = {
        path,
        public_id,
    };
    const promises = gallery_images.map((file) => (0, cloudinary_utils_js_1.uploadFileToCloudinary)(file, folder));
    const results = await Promise.allSettled(promises);
    const files = results
        .filter((file) => file.status === "fulfilled")
        .map((file) => {
        return file.value;
    });
    property.gallery_images = files;
    await property.save();
    (0, sendResponse_utils_js_1.sendResponse)(res, {
        message: "Property created successfully",
        statusCode: 201,
        data: property,
    });
});
exports.update = (0, catchAsync_utils_js_1.catchAsync)(async (req, res) => {
    const id = req.params.id;
    const { name, description, amount, price_type, address, rooms, property_type, } = req.body;
    const user = req.user;
    const { main_image, gallery_images } = req.files;
    const property = await property_model_js_1.default.findById(id);
    if (!property)
        throw new appError_utils_js_1.default("Property not found", 404, "NOT FOUND");
    if (property.host.toString() !== user._id.toString())
        throw new appError_utils_js_1.default("Only admin or owner can update this property", 400);
    if (name)
        property.name = name;
    if (description)
        property.description = description;
    if (amount)
        property.amount = amount;
    if (price_type)
        property.price_type = price_type;
    if (address)
        property.address = address;
    if (rooms)
        property.rooms = rooms;
    if (property_type)
        property.property_type = property_type;
    if (main_image?.[0]) {
        const { path, public_id } = await (0, cloudinary_utils_js_1.uploadFileToCloudinary)(main_image[0], folder);
        await (0, cloudinary_utils_js_1.deleteFileFromCloudinary)(property.main_image.public_id);
        property.main_image = {
            path,
            public_id,
        };
    }
    if (gallery_images && gallery_images.length > 0) {
        const promises = gallery_images.map((file) => (0, cloudinary_utils_js_1.uploadFileToCloudinary)(file, folder));
        const results = await Promise.allSettled(promises);
        const files = results
            .filter((file) => file.status === "fulfilled")
            .map((file) => {
            return file.value;
        });
        property.gallery_images = files;
    }
    await property.save();
    (0, sendResponse_utils_js_1.sendResponse)(res, {
        message: "Property updated successfully",
        statusCode: 200,
        data: property,
    });
});
exports.remove = (0, catchAsync_utils_js_1.catchAsync)(async (req, res) => {
    const id = req.params.id;
    const user = req.user;
    const property = await property_model_js_1.default.findOne({ _id: id });
    if (!property) {
        throw new appError_utils_js_1.default("Property not found", 404, "NOT FOUND");
    }
    if (user.role !== enum_types_js_1.Role.ADMIN &&
        property.host.toString() !== user._id.toString())
        throw new appError_utils_js_1.default("Only admin or owner can update this property", 400);
    await (0, cloudinary_utils_js_1.deleteFileFromCloudinary)(property.main_image.public_id);
    const promises = property.gallery_images.map((img) => (0, cloudinary_utils_js_1.deleteFileFromCloudinary)(img.public_id));
    await Promise.all(promises);
    await property.deleteOne();
    (0, sendResponse_utils_js_1.sendResponse)(res, {
        message: "Property deleted successfully",
        statusCode: 200,
        data: property,
    });
});
//# sourceMappingURL=property.controller.js.map