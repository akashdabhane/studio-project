import { NextResponse } from 'next/server';
import { sendContactEmail } from '@/lib/mailer';

const TOPICS = ['General Inquiry', 'Feature Development', 'Press & Media', 'Distribution'];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Strip CR/LF so user input can't inject extra email headers.
function sanitizeHeaderValue(value: string) {
  return value.replace(/[\r\n]+/g, ' ').trim();
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const { name, email, subject, message } = (body ?? {}) as Record<string, unknown>;

  if (
    typeof name !== 'string' ||
    typeof email !== 'string' ||
    typeof subject !== 'string' ||
    typeof message !== 'string' ||
    !name.trim() ||
    !email.trim() ||
    !message.trim()
  ) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
  }

  if (!TOPICS.includes(subject)) {
    return NextResponse.json({ error: 'Invalid topic' }, { status: 400 });
  }

  if (name.length > 200 || message.length > 5000) {
    return NextResponse.json({ error: 'Input too long' }, { status: 400 });
  }

  try {
    await sendContactEmail({
      name: sanitizeHeaderValue(name),
      email: sanitizeHeaderValue(email),
      subject,
      message: message.trim(),
    });
  } catch (error) {
    console.error('Failed to send contact email:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 502 });
  }

  return NextResponse.json({ success: true });
}
