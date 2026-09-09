"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const amenity_controller_js_1 = require("../controllers/amenity.controller.js");
const validator_middleware_js_1 = require("../middlewares/validator.middleware.js");
const amenity_validator_js_1 = require("../validators/amenity.validator.js");
const upload_middleware_js_1 = __importDefault(require("../middlewares/upload.middleware.js"));
const auth_middleware_js_1 = require("../middlewares/auth.middleware.js");
const enum_types_js_1 = require("../types/enum.types.js");
const route = (0, express_1.Router)();
const upload = (0, upload_middleware_js_1.default)();
route.get("/", (0, auth_middleware_js_1.authenticate)([enum_types_js_1.Role.HOST, enum_types_js_1.Role.ADMIN]), amenity_controller_js_1.getAll);
route.get("/:id", (0, auth_middleware_js_1.authenticate)([enum_types_js_1.Role.HOST, enum_types_js_1.Role.ADMIN]), amenity_controller_js_1.getById);
route.post("/", (0, auth_middleware_js_1.authenticate)([enum_types_js_1.Role.HOST]), upload.single("icon"), (0, validator_middleware_js_1.validate)(amenity_validator_js_1.amenityValidator), amenity_controller_js_1.create);
route.put("/:id", (0, auth_middleware_js_1.authenticate)([enum_types_js_1.Role.HOST]), upload.single("icon"), amenity_controller_js_1.update);
route.delete("/:id", (0, auth_middleware_js_1.authenticate)([enum_types_js_1.Role.HOST, enum_types_js_1.Role.ADMIN]), amenity_controller_js_1.remove);
exports.default = route;
//# sourceMappingURL=amenity.routes.js.map