"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const validator_middleware_1 = require("../middlewares/validator.middleware");
const auth_validator_1 = require("../validators/auth.validator");
const upload_middleware_1 = __importDefault(require("../middlewares/upload.middleware"));
const auth_controller_2 = require("../controllers/auth.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
const upload = (0, upload_middleware_1.default)();
router.post("/register", upload.single("profile_image"), (0, validator_middleware_1.validate)(auth_validator_1.registerValidator), auth_controller_1.register);
router.post("/login", (0, validator_middleware_1.validate)(auth_validator_1.loginValidator), auth_controller_1.login);
router.post("/requestForgotPasswordOtp", (0, validator_middleware_1.validate)(auth_validator_1.requestForgotPasswordOtpValidator), auth_controller_1.requestForgotPasswordOtp);
router.post("/verifyForgotPassword", (0, validator_middleware_1.validate)(auth_validator_1.verifyForgotPasswordValidator), auth_controller_1.verifyForgotPassword);
router.post("/logout", (0, auth_middleware_1.authenticate)(), auth_controller_2.logout);
router.get("/getProfile", (0, auth_middleware_1.authenticate)(), auth_controller_1.getProfile);
router.put("/updateProfile", (0, auth_middleware_1.authenticate)(), upload.single("profile_image"), auth_controller_1.updateProfile);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map