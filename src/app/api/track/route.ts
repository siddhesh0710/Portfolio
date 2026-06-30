import { NextRequest, NextResponse } from 'next/server';
import { createHash } from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // ── Get real IP ──────────────────────────────────────────────
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0].trim() : '0.0.0.0';

    // Hash IP for privacy (SHA-256, one-way)
    const ipHashed = createHash('sha256').update(ip).digest('hex').slice(0, 16);

    // ── Geo lookup via ip-api.com (free, no key needed) ──────────
    let country = 'Unknown', city = 'Unknown', timezone = 'Unknown';
    try {
      const geo = await fetch(
        `http://ip-api.com/json/${ip}?fields=country,city,timezone,status`,
        { signal: AbortSignal.timeout(3000) }
      );
      const geoData = await geo.json();
      if (geoData.status === 'success') {
        country  = geoData.country  ?? 'Unknown';
        city     = geoData.city     ?? 'Unknown';
        timezone = geoData.timezone ?? 'Unknown';
      }
    } catch {
      // geo lookup failed — continue with unknowns
    }

    // ── Build the row ─────────────────────────────────────────────
    const row = {
      sessionId:        body.sessionId        ?? '',
      timestamp:        new Date().toISOString(),
      ipHashed,
      country,
      city,
      timezone,
      browser:          body.browser          ?? '',
      os:               body.os               ?? '',
      deviceType:       body.deviceType       ?? '',
      screenResolution: body.screenResolution ?? '',
      referrer:         body.referrer         ?? '',
      landingPage:      body.landingPage      ?? '',
      currentPage:      body.currentPage      ?? '',
      userAgent:        body.userAgent        ?? '',
      language:         body.language         ?? '',
      firstVisit:       body.firstVisit       ?? '',
      lastVisit:        body.lastVisit        ?? '',
      visitCount:       body.visitCount       ?? 1,
      sessionDuration:  body.sessionDuration  ?? 0,
    };

    // ── Send to Google Sheet via Apps Script webhook ──────────────
    const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type: 'visitor', ...row }),
          signal: AbortSignal.timeout(6000),
        });
      } catch {
        // webhook failed silently — don't break the page
      }
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
