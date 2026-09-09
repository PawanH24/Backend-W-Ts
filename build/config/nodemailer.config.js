"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifySmtpServer = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const env_config_1 = __importDefault(require("./env.config"));
//*nodemailer transporter
const transporter = nodemailer_1.default.createTransport({
    host: env_config_1.default.SMTP_HOST,
    service: env_config_1.default.SMTP_SERVICE,
    port: env_config_1.default.SMTP_PORT,
    secure: env_config_1.default.SMTP_PORT === 465,
    auth: { user: env_config_1.default.SMTP_USER, pass: env_config_1.default.SMTP_PASS },
});
const verifySmtpServer = async () => {
    try {
        await transporter.verify();
        console.log("server is ready to send email");
    }
    catch (error) {
        console.log(error);
    }
};
exports.verifySmtpServer = verifySmtpServer;
exports.default = transporter;
//# sourceMappingURL=nodemailer.config.js.map