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
exports.propertyUpdateValidator = exports.propertyValidator = void 0;
const z = __importStar(require("zod"));
const enum_types_1 = require("../types/enum.types");
const addressSchema = z.object({
    country: z.string().trim().min(1, "Country is required"),
    city: z.string().trim().min(1, "City is required"),
    street_name: z.string().trim().min(1, "Street name is required"),
    zipcode: z.string().trim().min(1, "Zipcode is required"),
});
const propertyBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    amount: z.coerce
        .number("Amount is required")
        .positive("Amount must be a positive number"),
    price_type: z.enum(enum_types_1.PriceType, {
        message: "Price type must be one of: per_hour, per_day, per_week, per_month",
    }),
    property_type: z.enum(enum_types_1.PropertyType, {
        message: "Invalid property type selection",
    }),
    address: addressSchema,
    rooms: z.coerce.number(),
});
exports.propertyValidator = z.object({
    body: propertyBodySchema,
});
exports.propertyUpdateValidator = z.object({
    body: propertyBodySchema.partial().extend({
        address: addressSchema.partial().optional(),
    }),
});
//# sourceMappingURL=property.validator.js.map