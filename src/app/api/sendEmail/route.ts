import { BodySendEmailRequest } from "@/models/bodySendEmailRequest.model";
import { NextRequest, NextResponse } from "next/server";
import { validatorBodySendEmailRequest } from "./validator";
import { sendEmailService } from "@/services/sendEmail/sendEmail.service";

export async function POST(request: NextRequest) {
  const body: BodySendEmailRequest = await request.json();

  const validation = validatorBodySendEmailRequest(body);

  if (!validation.isValid) {
    return NextResponse.json(
      { message: validation.message, success: false },
      { status: 400 }
    );
  }
  // end valiadtion request body

  const result = await sendEmailService(body);

  if (!result.success) {
    return NextResponse.json(result, { status: 500 });
  }

  return NextResponse.json(result, { status: 201 });
}
