"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestForgotPasswordOtpValidator = exports.verifyForgotPasswordValidator = exports.registerValidator = exports.loginValidator = void 0;
const z = __importStar(require("zod"));
exports.loginValidator = z.object({
    //body
    body: z.object({
        email: z.email(),
        password: z.string(),
        //   .min(6, "password must contain at least 6 characters")
        //   .regex(/[A-Z]/, "password must contain atleast 1 uppercase"),
    }),
    //params
    //query
});
exports.registerValidator = z.object({
    body: z.object({
        fullName: z
            .string()
            .min(2, "Full name must be at least 2 characters")
            .max(50, "Full name cannot exceed 50 characters")
            .trim(),
        email: z.email("Invalid email format").trim(),
        password: z.string().min(6, "Password must contain at least 6 characters"),
        phone: z.string().optional(),
        host: z
            .enum(["true", "false"])
            .transform((value) => value === "true")
            .optional(),
    }),
});
exports.verifyForgotPasswordValidator = z.object({
    body: z.object({
        otp: z.string().toUpperCase(),
        email: z.string(),
        new_password: z
            .string()
            .min(6, "Password must contain atleast 6 characters"),
    }),
});
exports.requestForgotPasswordOtpValidator = z.object({
    body: z.object({
        email: z.string(),
    }),
});
//# sourceMappingURL=auth.validator.js.map