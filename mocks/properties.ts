// Mocked wrappers for the property endpoints of the backend API.
import type { CreatePropertyInput, UpdatePropertyInput } from '../models/properties';
import { MOCK_PROPERTIES, toListShape } from './data';
import { type ApiResult, fail, ok, type Property, type PropertyDetail } from './shared';

/**
 * Pick the fixture a request is about, so a listed property opens on its own detail page.
 * @param id Target property ID.
 * @returns The matching fixture, falling back to the first one for an unknown ID.
 */
function pickProperty(id: string): PropertyDetail {
  return MOCK_PROPERTIES.find((property) => property.id === id) ?? MOCK_PROPERTIES[0];
}

/**
 * List every property, ordered by title.
 * API endpoint 'GET /api/properties'.
 * @returns The properties with their host, without pictures, equipments, and tags.
 */
export function getProperties(): Promise<ApiResult<Property[]>> {
  const properties = [...MOCK_PROPERTIES]
    .sort((a, b) => a.title.localeCompare(b.title))
    .map(toListShape);
  return ok(properties);
}

/**
 * Get a single property with its collections.
 * API endpoint 'GET /api/properties/:id'.
 * @param id Target property ID.
 * @returns The property with its host, pictures, equipments, and tags.
 */
export function getProperty(id: string): Promise<ApiResult<PropertyDetail>> {
  return ok(pickProperty(id));
}

/**
 * Create a property (owner or admin only).
 * API endpoint 'POST /api/properties'.
 * @param token Bearer token of the authenticated user.
 * @param input Title, optional details, and a host given as host_id or host.
 * @returns The newly created property with its collections.
 */
export function createProperty(
  token: string,
  input: CreatePropertyInput,
): Promise<ApiResult<PropertyDetail>> {
  if (!token) return fail(401, 'missing token');
  if (!input.title) return fail(400, 'title is required');
  if (!input.host_id && !input.host) return fail(400, 'host_id or host is required');

  return ok(MOCK_PROPERTIES[0], 201);
}

/**
 * Update a property (owner or admin only).
 * API endpoint 'PATCH /api/properties/:id'.
 * @param token Bearer token of the authenticated user.
 * @param id Target property ID.
 * @param input Fields to update (omit a field to leave it unchanged).
 * @returns The updated property, whose slug is regenerated when the title changes.
 */
export function updateProperty(
  token: string,
  id: string,
  input: UpdatePropertyInput,
): Promise<ApiResult<PropertyDetail>> {
  if (!token) return fail(401, 'missing token');

  return ok(pickProperty(id));
}

/**
 * Delete a property and everything cascading from it (owner or admin only).
 * API endpoint 'DELETE /api/properties/:id'.
 * @param token Bearer token of the authenticated user.
 * @param id Target property ID.
 * @returns A response with no data payload.
 */
export function deleteProperty(token: string, id: string): Promise<ApiResult<undefined>> {
  if (!token) return fail(401, 'missing token');

  // The API answers 204, which the request helper reads as an empty payload.
  return ok(undefined, 204);
}
