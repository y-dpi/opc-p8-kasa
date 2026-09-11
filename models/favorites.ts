// Wrappers for the favorite endpoints of the backend API.
import { type ApiResult, type Ok, type Property, request } from './shared';

/**
 * Add a property to the favorites of the token owner.
 * API endpoint 'POST /api/properties/:id/favorite'.
 * @param token Bearer token of the authenticated user.
 * @param propertyId Target property ID.
 * @returns An acknowledgement, the call being idempotent.
 */
export function addFavorite(token: string, propertyId: string): Promise<ApiResult<Ok>> {
  return request<Ok>(
    `/api/properties/${encodeURIComponent(propertyId)}/favorite`,
    { method: 'POST', token }
  );
}

/**
 * Remove a property from the favorites of the token owner.
 * API endpoint 'DELETE /api/properties/:id/favorite'.
 * @param token Bearer token of the authenticated user.
 * @param propertyId Target property ID.
 * @returns An acknowledgement, even when the favorite did not exist.
 */
export function removeFavorite(token: string, propertyId: string): Promise<ApiResult<Ok>> {
  return request<Ok>(
    `/api/properties/${encodeURIComponent(propertyId)}/favorite`,
    { method: 'DELETE', token }
  );
}

/**
 * List the properties a user favorited, newest first (self or admin only).
 * API endpoint 'GET /api/users/:id/favorites'.
 * @param token Bearer token of the authenticated user.
 * @param userId Target user ID.
 * @returns The favorited properties, in the list shape.
 */
export function getFavorites(token: string, userId: number | string): Promise<ApiResult<Property[]>> {
  return request<Property[]>(
    `/api/users/${encodeURIComponent(userId)}/favorites`,
    { token }
  );
}
