import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { cache } from 'react';

import type { AuthUser } from '../models/shared';
import { SESSION_COOKIE } from './cookie';

// Session lifetime in seconds (mirrors the API's 7-day JWT).
const SESSION_MAX_AGE = 60 * 60 * 24 * 7;

// NextJS session holding the API JWT and the authenticated user.
interface Session {
  token: string;
  user: AuthUser;
}

/**
 * Parse a raw cookie value into a session object.
 * @param raw The raw cookie value.
 * @returns The parsed session object, or null when absent or malformed.
 */
function parseSession(raw: string | undefined): Session | null {
  if (!raw) return null;
  try {
    const value = JSON.parse(raw) as Partial<Session>;
    if (typeof value.token === 'string' && value.user != null && typeof value.user.id === 'number')
      return value as Session;
  } catch { } // Malformed cookie, treat as no session.
  return null;
}

// Cookie options shared by every session write.
function sessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    maxAge: SESSION_MAX_AGE,
    path: '/',
  };
}

// Persist the session in an httpOnly cookie (server-managed, hidden from client JS).
export async function createSession(session: Session): Promise<void> {
  const store = await cookies();
  store.set(SESSION_COOKIE, JSON.stringify(session), sessionCookieOptions());
}

// Read the current session from the cookie store.
export async function getSession(): Promise<Session | null> {
  const store = await cookies();
  return parseSession(store.get(SESSION_COOKIE)?.value);
}

// Delete the session cookie.
export async function deleteSession(): Promise<void> {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
}

// Require authenticated session, or redirect.
export const requireSession = cache(async () => {
  const session = await getSession();
  if (!session) redirect('/login');
  return session;
});
