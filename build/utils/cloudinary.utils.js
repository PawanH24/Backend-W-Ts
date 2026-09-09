"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFileFromCloudinary = exports.uploadFileToCloudinary = void 0;
const appError_utils_1 = __importDefault(require("./appError.utils"));
const cloudinary_config_1 = __importDefault(require("../config/cloudinary.config"));
const fs_1 = __importDefault(require("fs"));
//file upload to cloudinary
const uploadFileToCloudinary = async (file, dir = "/") => {
    try {
        const uploadFolder = "/team_17" + dir;
        const { secure_url, public_id } = await cloudinary_config_1.default.uploader.upload(file.path, {
            folder: uploadFolder,
        });
        //delete file from upload
        if (fs_1.default.existsSync(file.path)) {
            fs_1.default.unlinkSync(file.path);
        }
        return {
            path: secure_url,
            public_id,
        };
    }
    catch (error) {
        throw new appError_utils_1.default("something went wrong", 500, "INTERNAL SERVER ERROR", [
            { message: error.message },
        ]);
    }
};
exports.uploadFileToCloudinary = uploadFileToCloudinary;
//delete file from cloudinary
const deleteFileFromCloudinary = async (public_id) => {
    try {
        await cloudinary_config_1.default.uploader.destroy(public_id);
        return true;
    }
    catch (error) {
        throw new appError_utils_1.default("something went wrong", 500, "INTERNAL SERVER ERROR", [
            { message: error.message },
        ]);
    }
};
exports.deleteFileFromCloudinary = deleteFileFromCloudinary;
//# sourceMappingURL=cloudinary.utils.js.map