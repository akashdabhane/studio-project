import nodemailer from 'nodemailer';

let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }
  return transporter;
}

export type ContactMessage = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export async function sendContactEmail({ name, email, subject, message }: ContactMessage) {
  const ownerEmail = process.env.CONTACT_RECEIVER_EMAIL;
  if (!ownerEmail) {
    throw new Error('CONTACT_RECEIVER_EMAIL is not configured');
  }

  await getTransporter().sendMail({
    from: process.env.SMTP_FROM ?? process.env.SMTP_USER,
    to: ownerEmail,
    replyTo: email,
    subject: `[Website Contact] ${subject} — ${name}`,
    text: `From: ${name} <${email}>\nTopic: ${subject}\n\n${message}`,
    html: `
      <p><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p>
      <p><strong>Topic:</strong> ${escapeHtml(subject)}</p>
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(message).replace(/\n/g, '<br />')}</p>
    `,
  });
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
