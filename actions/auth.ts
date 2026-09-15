'use server';

// Server actions bridging the auth forms and the auth API models.
import { redirect } from 'next/navigation';

import { createSession, deleteSession, getSession } from '../middleware/session';
import type { AuthUser } from '../models/shared';
import { auth } from '../utils/api';
import { type FormState, UNREACHABLE } from './shared';

// Keep only a same-site path, so a crafted 'from' cannot bounce the visitor off the site.
function safeRedirect(from: string): string {
  return from.startsWith('/') && !from.startsWith('//') ? from : '/';
}

// Read the signed-in user, or null when the visitor is a guest.
export async function getCurrentUser(): Promise<AuthUser | null> {
  const session = await getSession();
  return session?.user ?? null;
}

// Authenticate an existing user and open a session.
export async function login(_prev: FormState | undefined, formData: FormData): Promise<FormState> {
  const email = String(formData.get('email') ?? '').trim();
  const password = String(formData.get('password') ?? '');
  const from = safeRedirect(String(formData.get('from') ?? '/'));

  if (!email || !password) return { error: 'L’email et le mot de passe sont requis.' };

  let result;
  try {
    result = await auth.login({ email, password });
  } catch {
    return { error: UNREACHABLE };
  }

  if (!result.ok || !result.data) {
    return { error: result.status === 401 ? 'Email ou mot de passe incorrect.' : result.error ?? 'Impossible de se connecter.' };
  }

  // Open a session, then leave the form for wherever the visitor was headed.
  await createSession(result.data);
  redirect(from);
}

// Register a new user and open a session.
export async function register(_prev: FormState | undefined, formData: FormData): Promise<FormState> {
  const firstName = String(formData.get('firstName') ?? '').trim();
  const lastName = String(formData.get('lastName') ?? '').trim();
  const email = String(formData.get('email') ?? '').trim();
  const password = String(formData.get('password') ?? '');
  const terms = formData.get('terms') != null;

  const name = [firstName, lastName].filter(Boolean).join(' ');
  if (!name) return { error: 'Le nom et le prénom sont requis.' };
  if (!email) return { error: 'L’email est requis.' };
  if (password.length < 6) return { error: 'Le mot de passe doit faire au moins 6 caractères.' };
  if (!terms) return { error: 'Vous devez accepter les conditions générales d’utilisation.' };

  let result;
  try {
    result = await auth.register({ name, email, password, role: 'owner' });
  } catch {
    return { error: UNREACHABLE };
  }

  if (!result.ok || !result.data) {
    return { error: result.status === 409 ? 'Un compte existe déjà avec cet email.' : result.error ?? 'Impossible de s’inscrire.' };
  }

  // Open a session, then leave the form for the home page.
  await createSession(result.data);
  redirect('/');
}

// End the session and return to the login page.
export async function logout(): Promise<void> {
  await deleteSession();
  redirect('/login');
}
