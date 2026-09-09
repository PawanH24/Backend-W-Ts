import nodemailer from "nodemailer";
declare const transporter: nodemailer.Transporter<import("nodemailer/lib/smtp-transport").SentMessageInfo, import("nodemailer/lib/smtp-transport").Options>;
export declare const verifySmtpServer: () => Promise<void>;
export default transporter;
//# sourceMappingURL=nodemailer.config.d.ts.map