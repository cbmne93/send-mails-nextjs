import nodemailer from "nodemailer";

import { BodySendEmailRequest } from "@/models/bodySendEmailRequest.model";

const trasporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "cbmne.93@gmail.com",
    pass: "mdvi htyu zkav duws",
  },
});

export const sendEmailService = async (body: BodySendEmailRequest) => {
  const { to, subject, content } = body;

  try {
    await trasporter.sendMail({
      from: body.from,
      to: to,
      subject: subject,
      text: content,
    });

    return { success: true, message: "Email sent successfully" };
  } catch (error) {
    return { success: false, message: error };
  }
};
