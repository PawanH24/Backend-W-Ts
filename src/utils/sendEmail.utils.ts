import ENV_CONFIG from "../config/env.config";
import transporter from "../config/nodemailer.config";

export const sendEmail = async () => {
  try {
    await transporter.sendMail({
      to: "user@gmail.com",
      from: ENV_CONFIG.SMTP_MAIL_FROM,
      html: `<div><h1>Smtp Server testing</h1></div>`,
      subject: "Testing mail server",
    });
  } catch (error) {}
};
