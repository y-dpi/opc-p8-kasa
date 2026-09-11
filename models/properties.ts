// Wrappers for the property endpoints of the backend API.
import { type ApiResult, type Property, type PropertyDetail, request } from './shared';

// Body of 'POST /api/properties'.
export interface CreatePropertyInput {
  title: string;
  id?: string;
  description?: string;
  cover?: string;
  location?: string;
  price_per_night?: number;
  host_id?: number;
  host?: { name: string; picture?: string };
  pictures?: string[];
  equipments?: string[];
  tags?: string[];
}

// Body of 'PATCH /api/properties/:id'.
export interface UpdatePropertyInput {
  title?: string;
  description?: string;
  cover?: string;
  location?: string;
  host_id?: number;
  price_per_night?: number;
}

/**
 * List every property, ordered by title.
 * API endpoint 'GET /api/properties'.
 * @returns The properties with their host, without pictures, equipments, and tags.
 */
export function getProperties(): Promise<ApiResult<Property[]>> {
  return request<Property[]>(
    '/api/properties'
  );
}

/**
 * Get a single property with its collections.
 * API endpoint 'GET /api/properties/:id'.
 * @param id Target property ID.
 * @returns The property with its host, pictures, equipments, and tags.
 */
export function getProperty(id: string): Promise<ApiResult<PropertyDetail>> {
  return request<PropertyDetail>(
    `/api/properties/${encodeURIComponent(id)}`
  );
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
  return request<PropertyDetail>(
    '/api/properties',
    { method: 'POST', body: input, token }
  );
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
  return request<PropertyDetail>(
    `/api/properties/${encodeURIComponent(id)}`,
    { method: 'PATCH', body: input, token }
  );
}

/**
 * Delete a property and everything cascading from it (owner or admin only).
 * API endpoint 'DELETE /api/properties/:id'.
 * @param token Bearer token of the authenticated user.
 * @param id Target property ID.
 * @returns A response with no data payload.
 */
export function deleteProperty(token: string, id: string): Promise<ApiResult<undefined>> {
  return request<undefined>(
    `/api/properties/${encodeURIComponent(id)}`,
    { method: 'DELETE', token }
  );
}
