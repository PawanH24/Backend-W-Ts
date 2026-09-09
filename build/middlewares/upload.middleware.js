"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
const appError_utils_1 = __importDefault(require("../utils/appError.utils"));
const path_1 = __importDefault(require("path"));
const uploader = () => {
    const folder = "uploads/";
    const fileSize = 5 * 1024 * 1024;
    const allowed_exts = [
        ".png",
        ".jpg",
        "jpeg",
        ".webp",
        ".svg",
        ".pdf",
        ".jfif",
    ];
    const allowed_mime_types = [
        "image/png",
        "image/jpg",
        "image/jpeg",
        "image/svg+xml",
        "application/pdf",
        "application/octet-stream",
    ];
    //create upload folder is not exixts
    if (!fs_1.default.existsSync(folder)) {
        fs_1.default.mkdirSync(folder);
    }
    //multer disk storage
    const storage = multer_1.default.diskStorage({
        destination: (req, file, callback) => {
            callback(null, "uploads/");
        },
        filename: (req, file, callback) => {
            const fileName = Date.now() + "-" + file.originalname;
            callback(null, fileName);
        },
    });
    const fileFilter = (req, file, cb) => {
        //check if file extension is allowed
        if (!allowed_exts.includes(path_1.default.extname(file.originalname).toLowerCase())) {
            cb(new appError_utils_1.default(`only ${allowed_exts.join(",")} type is allowed`, 422));
        }
        //check if file mimetype is allowed
        if (!allowed_mime_types.includes(file.mimetype)) {
            cb(new appError_utils_1.default(`invalid file type.only image & pdf is allowed`, 422));
            return;
        }
        cb(null, true);
    };
    //multer upload instance
    const upload = (0, multer_1.default)({
        storage: storage,
        fileFilter: fileFilter,
        limits: {
            fileSize: fileSize,
        },
    });
    return upload;
};
exports.default = uploader;
//# sourceMappingURL=upload.middleware.js.map