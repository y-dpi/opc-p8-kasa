'use server';

// Server actions bridging the favorite controls and the favorite API models.
import { revalidatePath } from 'next/cache';

import { requireSession } from '../middleware/session';
import type { Property } from '../models/shared';
import { favorites } from '../utils/api';
import { optionalToken, requireToken, UNREACHABLE } from './shared';

// List the favorites of the signed-in user, redirecting to login for a guest.
export async function listFavorites(): Promise<{ properties: Property[]; error?: string }> {
  const { token, user } = await requireSession();

  let result;
  try {
    result = await favorites.getFavorites(token, user.id);
  } catch {
    return { properties: [], error: UNREACHABLE };
  }

  if (!result.ok || !result.data) {
    return { properties: [], error: result.error ?? 'Impossible de charger vos favoris.' };
  }
  return { properties: result.data };
}

// List the IDs a guest or a signed-in user has favorited, so cards can render their state.
export async function listFavoriteIds(): Promise<string[]> {
  const token = await optionalToken();
  if (!token) return [];

  // The session is known to exist here, so the user ID comes from it without a second guard.
  const { user } = await requireSession();
  try {
    const result = await favorites.getFavorites(token, user.id);
    return result.ok && result.data ? result.data.map((property) => property.id) : [];
  } catch {
    return [];
  }
}

// Add or remove a favorite, then refresh the pages that show them.
export async function toggleFavorite(propertyId: string, isFavorite: boolean): Promise<void> {
  const token = await requireToken();

  try {
    if (isFavorite) await favorites.removeFavorite(token, propertyId);
    else await favorites.addFavorite(token, propertyId);
  } catch {
    // The control is optimistic: a failed toggle simply leaves the list unchanged.
  }

  revalidatePath('/');
  revalidatePath('/favorites');
  revalidatePath(`/properties/${propertyId}`);
}
