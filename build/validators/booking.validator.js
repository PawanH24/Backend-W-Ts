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
exports.bookingUpdateValidator = exports.bookingValidator = void 0;
const z = __importStar(require("zod"));
exports.bookingValidator = z.object({
    body: z
        .object({
        property_id: z.string(),
        check_in: z.coerce.date(),
        check_out: z.coerce.date(),
        payment_status: z.boolean().optional(),
    })
        .refine((data) => data.check_out > data.check_in, {
        message: "Checkout data must be after check-in date",
        path: ["check_out"],
    }),
});
exports.bookingUpdateValidator = z.object({
    body: z
        .object({
        check_in: z.coerce.date(),
        check_out: z.coerce.date(),
        payment_status: z.boolean().optional(),
    })
        .refine((data) => data.check_out > data.check_in, {
        message: "Checkout data must be after check-in date",
        path: ["check_out"],
    }),
});
//# sourceMappingURL=booking.validator.js.map