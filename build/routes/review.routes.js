"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const review_controller_js_1 = require("../controllers/review.controller.js");
const validator_middleware_js_1 = require("../middlewares/validator.middleware.js");
const review_validator_js_1 = require("../validators/review.validator.js");
const auth_middleware_js_1 = require("../middlewares/auth.middleware.js");
const route = (0, express_1.Router)();
route.get("/", review_controller_js_1.getAll);
route.get("/:id", review_controller_js_1.getById);
route.post("", (0, auth_middleware_js_1.authenticate)(), (0, validator_middleware_js_1.validate)(review_validator_js_1.reviewValidator), review_controller_js_1.create);
route.put("/:id", (0, auth_middleware_js_1.authenticate)(), (0, validator_middleware_js_1.validate)(review_validator_js_1.reviewUpdateValidator), review_controller_js_1.update);
route.delete("/:id", (0, auth_middleware_js_1.authenticate)(), review_controller_js_1.remove);
exports.default = route;
//# sourceMappingURL=review.routes.js.map