"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const appError_utils_1 = __importDefault(require("../utils/appError.utils"));
const jwt_utils_1 = require("../utils/jwt.utils");
const authenticate = (roles) => {
    return (req, res, next) => {
        try {
            //get access token from cookie
            const token = req.cookies["access_token"];
            // console.log(token);
            //if not access token -> throw error unauthorized
            if (!token) {
                throw new appError_utils_1.default("Unauthorized: no token provided", 401, "UNAUTHORIZED");
            }
            //verify token-> jwt.verify() method ->
            const decoded_data = (0, jwt_utils_1.verifyToken)(token);
            if (!decoded_data)
                throw new appError_utils_1.default("unauthorized, access denied", 401, "UNAUTHORIZED");
            //if not verified throw same unAuth error}
            if (roles && !roles.includes(decoded_data.role))
                throw new appError_utils_1.default("forbidden.access denied", 403, "FORBIDDEN");
            req.user = {
                _id: decoded_data._id,
                email: decoded_data.email,
                role: decoded_data.role,
            };
            next();
        }
        catch (error) {
            next(error);
        }
    };
};
exports.authenticate = authenticate;
//# sourceMappingURL=auth.middleware.js.map