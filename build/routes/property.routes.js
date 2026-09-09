"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const property_controller_js_1 = require("../controllers/property.controller.js");
const upload_middleware_js_1 = __importDefault(require("../middlewares/upload.middleware.js"));
const property_validator_js_1 = require("../validators/property.validator.js");
const validator_middleware_js_1 = require("../middlewares/validator.middleware.js");
const auth_middleware_js_1 = require("../middlewares/auth.middleware.js");
const enum_types_js_1 = require("../types/enum.types.js");
const route = (0, express_1.Router)();
const upload = (0, upload_middleware_js_1.default)();
route.get("/", property_controller_js_1.getAll);
route.get("/host/all", (0, auth_middleware_js_1.authenticate)([enum_types_js_1.Role.HOST]), property_controller_js_1.getByHost);
route.get("/:id", property_controller_js_1.getById);
route.post("/", (0, auth_middleware_js_1.authenticate)([enum_types_js_1.Role.HOST]), upload.fields([
    { name: "main_image", maxCount: 1 },
    { name: "gallery_images", maxCount: 10 },
]), (0, validator_middleware_js_1.validate)(property_validator_js_1.propertyValidator), property_controller_js_1.create);
route.put("/:id", (0, auth_middleware_js_1.authenticate)([enum_types_js_1.Role.HOST]), upload.fields([
    { name: "main_image", maxCount: 1 },
    { name: "gallery_images", maxCount: 10 },
]), (0, validator_middleware_js_1.validate)(property_validator_js_1.propertyUpdateValidator), property_controller_js_1.update);
route.delete("/:id", (0, auth_middleware_js_1.authenticate)([enum_types_js_1.Role.ADMIN, enum_types_js_1.Role.HOST]), property_controller_js_1.remove);
exports.default = route;
//# sourceMappingURL=property.routes.js.map