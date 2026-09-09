"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const imageSchema = new mongoose_1.default.Schema({
    path: {
        type: String,
        required: [true, "Image path is requred"],
    },
    public_id: {
        type: String,
        required: [true, "Image public id is requred"],
    },
});
exports.default = imageSchema;
//# sourceMappingURL=image.model.js.map