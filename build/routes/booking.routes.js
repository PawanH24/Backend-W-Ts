"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const booking_controller_js_1 = require("../controllers/booking.controller.js");
const validator_middleware_js_1 = require("../middlewares/validator.middleware.js");
const booking_validator_js_1 = require("../validators/booking.validator.js");
const auth_middleware_js_1 = require("../middlewares/auth.middleware.js");
const enum_types_js_1 = require("../types/enum.types.js");
const route = (0, express_1.Router)();
route.get("/", (0, auth_middleware_js_1.authenticate)(), booking_controller_js_1.getAll);
route.get("/:reference", (0, auth_middleware_js_1.authenticate)(), booking_controller_js_1.getByReference);
route.post("", (0, auth_middleware_js_1.authenticate)(), (0, validator_middleware_js_1.validate)(booking_validator_js_1.bookingValidator), booking_controller_js_1.create);
route.put("/:reference", (0, auth_middleware_js_1.authenticate)([enum_types_js_1.Role.USER]), (0, validator_middleware_js_1.validate)(booking_validator_js_1.bookingUpdateValidator), booking_controller_js_1.update);
route.delete("/:reference", (0, auth_middleware_js_1.authenticate)([enum_types_js_1.Role.USER]), booking_controller_js_1.remove);
exports.default = route;
//# sourceMappingURL=booking.routes.js.map