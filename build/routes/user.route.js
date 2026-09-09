"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_js_1 = require("../controllers/user.controller.js");
const route = (0, express_1.Router)();
route.get("/", user_controller_js_1.getAll);
exports.default = route;
//# sourceMappingURL=user.route.js.map