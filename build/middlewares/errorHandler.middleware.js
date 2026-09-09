"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (error, req, res, next) => {
    const message = error?.message ?? "Something went wrong";
    const status = error?.status ?? "error";
    const success = error?.success ?? false;
    const statusCode = error?.statusCode ?? 500;
    res.status(statusCode).json({
        message,
        status,
        success,
        data: null,
        code: error?.code ?? null,
        details: error?.detail ?? null,
        stack: error?.stack ?? null,
    });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.middleware.js.map