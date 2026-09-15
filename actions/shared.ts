// Shared helpers for the server actions.
import 'server-only';

import { getSession, requireSession } from '../middleware/session';
import type { FormState } from '../utils/formState';

export type { FormState };

// Message shown whenever the API cannot be reached at all.
export const UNREACHABLE = 'Impossible de contacter le serveur.';

// Return the current session JWT, redirecting to login when it is missing.
export async function requireToken(): Promise<string> {
  const { token } = await requireSession();
  return token;
}

// Return the current session JWT, or null when the visitor is not signed in.
export async function optionalToken(): Promise<string | null> {
  const session = await getSession();
  return session?.token ?? null;
}
