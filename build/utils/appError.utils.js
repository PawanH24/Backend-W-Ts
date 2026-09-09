"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AppError extends Error {
    message;
    statusCode;
    code;
    detail;
    status;
    success;
    constructor(message, statusCode, code, detail) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        this.code = code;
        this.detail = detail;
        this.statusCode = statusCode;
        // this.status = statusCode >= 200 && statusCode < 500 ? "fail" : "error";
        this.status = statusCode.toString().startsWith("4") ? "fail" : "error";
        this.success = false;
        this.code = code ?? "INTERNAL SERVER ERROR";
        this.detail = detail;
        Error.captureStackTrace(this, AppError);
    }
}
exports.default = AppError;
//# sourceMappingURL=appError.utils.js.map