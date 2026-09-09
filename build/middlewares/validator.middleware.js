"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const appError_utils_1 = __importDefault(require("../utils/appError.utils"));
const validate = (schema) => {
    return (req, res, next) => {
        console.log(req.body);
        const result = schema.safeParse({
            body: { ...req.body, address: JSON.parse(req.body.address ?? "{}") },
            params: req.params,
            query: req.query,
        });
        if (result.success) {
            req.body = result.data.body;
            Object.assign(req.params, result.data.params);
            Object.assign(req.query, result.data.query);
            next();
        }
        else {
            console.log(result.error);
            const error = result.error.issues.map(({ path, message }) => {
                return { path: path.join("."), message };
            });
            next(new appError_utils_1.default("validation error", 400, "VALIDATION_ERR", error));
        }
    };
};
exports.validate = validate;
//# sourceMappingURL=validator.middleware.js.map