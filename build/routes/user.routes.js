"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_js_1 = require("../controllers/user.controller.js");
const auth_middleware_js_1 = require("../middlewares/auth.middleware.js");
const enum_types_js_1 = require("../types/enum.types.js");
const upload_middleware_js_1 = __importDefault(require("../middlewares/upload.middleware.js"));
const route = (0, express_1.Router)();
const upload = (0, upload_middleware_js_1.default)();
route.get("/", (0, auth_middleware_js_1.authenticate)([enum_types_js_1.Role.ADMIN]), user_controller_js_1.getAll);
route.get("/:id", (0, auth_middleware_js_1.authenticate)([enum_types_js_1.Role.ADMIN]), user_controller_js_1.getById);
route.put("/:id", upload.single("profile_image"), (0, auth_middleware_js_1.authenticate)([enum_types_js_1.Role.ADMIN]), user_controller_js_1.update);
route.delete("/:id", (0, auth_middleware_js_1.authenticate)([enum_types_js_1.Role.ADMIN]), user_controller_js_1.remove);
exports.default = route;
//# sourceMappingURL=user.routes.js.map