"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const enum_types_1 = require("../types/enum.types");
const image_model_1 = __importDefault(require("./image.model"));
const propertySchema = new mongoose_1.default.Schema({
    host: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    name: {
        type: String,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    price_type: {
        type: String,
        required: true,
        enum: Object.values(enum_types_1.PriceType),
        default: enum_types_1.PriceType.PER_DAY,
    },
    address: {
        type: {
            country: { type: String, required: true },
            city: { type: String, required: true },
            street_name: { type: String, required: true },
            zipcode: { type: String, required: true },
        },
        required: true,
    },
    rooms: {
        type: Number,
    },
    property_type: {
        type: String,
        required: true,
        enum: Object.values(enum_types_1.PropertyType),
    },
    main_image: {
        type: image_model_1.default,
        required: true,
    },
    gallery_images: {
        type: [image_model_1.default],
        required: [true, "image is required"],
    },
});
const Property = mongoose_1.default.model("property", propertySchema);
exports.default = Property;
//# sourceMappingURL=property.model.js.map