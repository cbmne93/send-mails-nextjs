import { BodySendEmailRequest } from "@/models/bodySendEmailRequest.model";

export const validatorBodySendEmailRequest = (body: BodySendEmailRequest) => {
  const { from, to, subject, content } = body;
  // Check if the body is empty

  if (!from || from.length === 0) {
    return { isValid: false, message: "From email is required" };
  }else if (!from.includes("@")) {
    return { isValid: false, message: "From email format is not correct" };
  }

  if (!to || to.length === 0) {
    return { isValid: false, message: "Email is required" };
  } else if (!to.includes("@")) {
    return { isValid: false, message: "Email format is not correct" };
  }

  if (!subject) {
    return { isValid: false, message: "Subject is required" };
  }

  if (!content) {
    return { isValid: false, message: "Content is required" };
  }

  return { isValid: true, message: "" };
};
