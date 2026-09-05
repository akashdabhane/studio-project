import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: NextRequest) {
  const { name, email, subject, message } = await request.json();

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email and message are required." },
      { status: 400 }
    );
  }

  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;
  const ownerEmail = process.env.OWNER_EMAIL;

  if (!emailUser || !emailPass || !ownerEmail) {
    console.error("EMAIL_USER / EMAIL_PASS / OWNER_EMAIL are not configured.");
    return NextResponse.json(
      { error: "Email service is not configured." },
      { status: 500 }
    );
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: emailUser,
      pass: emailPass,
    },
  });

  try {
    await transporter.sendMail({
      from: `"${name}" <${emailUser}>`,
      to: ownerEmail,
      replyTo: email,
      subject: subject
        ? `New enquiry: ${subject}`
        : "New enquiry from website (production) contact form",
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject || "-"}\n\n${message || ""}`,
      html: `
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Subject:</strong> ${escapeHtml(subject || "-")}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message || "").replace(/\n/g, "<br/>")}</p>
      `,
    });

    return NextResponse.json({ success: true, message: "Email sent successfully.", status: 200 });
  } catch (error) {
    console.error("Failed to send contact email", error);
    return NextResponse.json(
      { error: "Failed to send email. Please try again later." },
      { status: 500 }
    );
  }
}
