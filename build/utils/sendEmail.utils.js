"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const env_config_1 = __importDefault(require("../config/env.config"));
const nodemailer_config_1 = __importDefault(require("../config/nodemailer.config"));
const sendEmail = async ({ to, subject, html, cc, bcc, attachments, }) => {
    const options = {
        to,
        from: env_config_1.default.SMTP_MAIL_FROM,
        subject,
        html,
    };
    if (cc) {
        options["cc"] = cc;
    }
    if (bcc) {
        options["bcc"] = bcc;
    }
    if (attachments) {
        options["attachments"] = attachments;
    }
    try {
        await nodemailer_config_1.default.sendMail(options);
        console.log("email sent");
    }
    catch (error) { }
};
exports.sendEmail = sendEmail;
//# sourceMappingURL=sendEmail.utils.js.map