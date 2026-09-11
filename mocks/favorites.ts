// Mocked wrappers for the favorite endpoints of the backend API.
import { MOCK_PROPERTIES, toListShape } from './data';
import { type ApiResult, fail, type Ok, ok, type Property } from './shared';

// Properties the mocked favorite list always reports, newest first.
const FAVORITES: Property[] = [MOCK_PROPERTIES[3], MOCK_PROPERTIES[0], MOCK_PROPERTIES[4]].map(toListShape);

/**
 * Add a property to the favorites of the token owner.
 * API endpoint 'POST /api/properties/:id/favorite'.
 * @param token Bearer token of the authenticated user.
 * @param propertyId Target property ID.
 * @returns An acknowledgement, the call being idempotent.
 */
export function addFavorite(token: string, propertyId: string): Promise<ApiResult<Ok>> {
  if (!token) return fail(401, 'missing token');

  return ok({ ok: true });
}

/**
 * Remove a property from the favorites of the token owner.
 * API endpoint 'DELETE /api/properties/:id/favorite'.
 * @param token Bearer token of the authenticated user.
 * @param propertyId Target property ID.
 * @returns An acknowledgement, even when the favorite did not exist.
 */
export function removeFavorite(token: string, propertyId: string): Promise<ApiResult<Ok>> {
  if (!token) return fail(401, 'missing token');

  return ok({ ok: true });
}

/**
 * List the properties a user favorited, newest first (self or admin only).
 * API endpoint 'GET /api/users/:id/favorites'.
 * @param token Bearer token of the authenticated user.
 * @param userId Target user ID.
 * @returns The favorited properties, in the list shape.
 */
export function getFavorites(token: string, userId: number | string): Promise<ApiResult<Property[]>> {
  if (!token) return fail(401, 'missing token');

  return ok(FAVORITES);
}
