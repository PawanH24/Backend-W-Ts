import nodemailer from "nodemailer";

//*nodemailer transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  service: "gmail",
  port: 465,
  secure: true,
  auth: { user: "hadapawan20@gmail.com", pass: "brrm tgml gaps sttx" },
});

export const verifySmtpServer = async () => {
  try {
    await transporter.verify();
    console.log("server is ready to send email");
  } catch (error) {
    console.log(error);
  }
};

export default transporter;
