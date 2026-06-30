import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Try to forward to Flask backend if configured
    const apiUrl = process.env.FLASK_API_URL;
    if (apiUrl) {
      try {
        const res = await fetch(`${apiUrl}/api/contact`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, subject, message }),
          signal: AbortSignal.timeout(8000),
        });
        const data = await res.json();
        return NextResponse.json(data, { status: res.status });
      } catch {
        // Flask unavailable, fall through to success response
      }
    }

    // Demo mode: log and return success
    console.log('Contact form submission:', { name, email, subject, message: message.slice(0, 50) + '...' });

    // Send to Google Sheet if webhook is configured
    const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'contact',
            timestamp: new Date().toISOString(),
            name, email, subject, message,
          }),
          signal: AbortSignal.timeout(6000),
        });
      } catch {
        // silent fail
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Message received!',
    });
  } catch {
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
