"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const user_routes_js_1 = __importDefault(require("./routes/user.routes.js"));
const booking_routes_js_1 = __importDefault(require("./routes/booking.routes.js"));
const review_routes_js_1 = __importDefault(require("./routes/review.routes.js"));
const auth_routes_js_1 = __importDefault(require("./routes/auth.routes.js"));
const property_routes_js_1 = __importDefault(require("./routes/property.routes.js"));
const amenity_routes_js_1 = __importDefault(require("./routes/amenity.routes.js"));
const db_config_js_1 = require("./config/db.config.js");
const errorHandler_middleware_js_1 = require("./middlewares/errorHandler.middleware.js");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const env_config_js_1 = __importDefault(require("./config/env.config.js"));
const nodemailer_config_js_1 = require("./config/nodemailer.config.js");
const PORT = env_config_js_1.default.PORT;
const DB_URI = env_config_js_1.default.DB_URI;
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/uploads", express_1.default.static("uploads"));
app.get("/", (req, res) => {
    res.send("Welcome to website");
});
app.use("/users", user_routes_js_1.default);
app.use("/v1/auth", auth_routes_js_1.default);
app.use("/bookings", booking_routes_js_1.default);
app.use("/reviews", review_routes_js_1.default);
app.use("/property", property_routes_js_1.default);
app.use("/amenity", amenity_routes_js_1.default);
(0, db_config_js_1.connectDatabase)(DB_URI);
app.use((req, res, next) => {
    const error = new Error(`cannot get ${req.method} on ${req.path}`);
    error.statusCode = 404;
    error.status = "fail";
    error.success = false;
    next(error);
});
app.use(errorHandler_middleware_js_1.errorHandler);
const server = http_1.default.createServer(app);
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    (0, nodemailer_config_js_1.verifySmtpServer)();
});
//# sourceMappingURL=server.js.map