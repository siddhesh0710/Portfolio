'use client';

import { useEffect } from 'react';

// ── Tiny helpers ────────────────────────────────────────────────────────────

function generateSessionId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
}

function detectBrowser(ua: string): string {
  if (/Edg\//.test(ua))     return 'Edge';
  if (/OPR\/|Opera/.test(ua)) return 'Opera';
  if (/Chrome\//.test(ua))  return 'Chrome';
  if (/Firefox\//.test(ua)) return 'Firefox';
  if (/Safari\//.test(ua))  return 'Safari';
  return 'Unknown';
}

function detectOS(ua: string): string {
  if (/Windows NT 10/.test(ua)) return 'Windows 10/11';
  if (/Windows NT/.test(ua))   return 'Windows';
  if (/Mac OS X/.test(ua))     return 'macOS';
  if (/Android/.test(ua))      return 'Android';
  if (/iPhone|iPad/.test(ua))  return 'iOS';
  if (/Linux/.test(ua))        return 'Linux';
  return 'Unknown';
}

function detectDevice(ua: string): string {
  if (/Mobi|Android.*Mobile|iPhone/.test(ua)) return 'Mobile';
  if (/iPad|Android(?!.*Mobile)/.test(ua))    return 'Tablet';
  return 'Desktop';
}

// ── Hook ────────────────────────────────────────────────────────────────────

export function useTracker() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const STORAGE_KEY = 'st_visitor';
    const SESSION_KEY = 'st_session';
    const now = new Date().toISOString();

    // ── Session (tab-scoped, sessionStorage) ──────────────────────
    let sessionId = sessionStorage.getItem(SESSION_KEY);
    const isNewSession = !sessionId;
    if (!sessionId) {
      sessionId = generateSessionId();
      sessionStorage.setItem(SESSION_KEY, sessionId);
    }

    // ── Visitor persistence (localStorage) ────────────────────────
    type VisitorStore = { firstVisit: string; lastVisit: string; visitCount: number };
    const raw = localStorage.getItem(STORAGE_KEY);
    const stored: VisitorStore = raw
      ? JSON.parse(raw)
      : { firstVisit: now, lastVisit: now, visitCount: 0 };

    const visitCount = stored.visitCount + (isNewSession ? 1 : 0);
    const updated: VisitorStore = {
      firstVisit: stored.firstVisit,
      lastVisit:  now,
      visitCount,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    // Only fire once per new session
    if (!isNewSession) return;

    // ── Collect client data ────────────────────────────────────────
    const ua       = navigator.userAgent;
    const browser  = detectBrowser(ua);
    const os       = detectOS(ua);
    const device   = detectDevice(ua);
    const screen   = `${window.screen.width}x${window.screen.height}`;
    const lang     = navigator.language || 'Unknown';
    const referrer = document.referrer || 'Direct';
    const landing  = window.location.href;

    const sessionStart = Date.now();

    // ── Send on page load ─────────────────────────────────────────
    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId,
        browser,
        os,
        deviceType:       device,
        screenResolution: screen,
        referrer,
        landingPage:      landing,
        currentPage:      window.location.pathname,
        userAgent:        ua,
        language:         lang,
        firstVisit:       updated.firstVisit,
        lastVisit:        updated.lastVisit,
        visitCount,
        sessionDuration:  0,
      }),
    }).catch(() => {});

    // ── Send session duration on tab close ────────────────────────
    const sendDuration = () => {
      const duration = Math.round((Date.now() - sessionStart) / 1000); // seconds
      navigator.sendBeacon(
        '/api/track',
        JSON.stringify({
          sessionId,
          browser, os,
          deviceType:       device,
          screenResolution: screen,
          referrer,
          landingPage:      landing,
          currentPage:      window.location.pathname,
          userAgent:        ua,
          language:         lang,
          firstVisit:       updated.firstVisit,
          lastVisit:        new Date().toISOString(),
          visitCount,
          sessionDuration:  duration,
        })
      );
    };

    window.addEventListener('beforeunload', sendDuration);
    return () => window.removeEventListener('beforeunload', sendDuration);
  }, []);
}
