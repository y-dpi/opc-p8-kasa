// Wrappers for the base endpoints of the backend API.
import { type ApiResult, request } from './shared';

// Data returned by 'GET /' when the static handler does not shadow the route.
export interface ApiInfoData {
  name: string;
  version: string;
  docs: string;
  openapi: string;
}

/**
 * Get the API's base information.
 * API endpoint 'GET /'.
 * @returns The base information, or the HTML page that express.static serves in its place.
 */
export function getApiInfo(): Promise<ApiResult<ApiInfoData | string>> {
  return request<ApiInfoData | string>(
    '/'
  );
}

/**
 * Get the API's OpenAPI specification.
 * API endpoint 'GET /openapi.json'.
 * @returns The specification describing every endpoint.
 */
export function getOpenApi(): Promise<ApiResult<unknown>> {
  return request<unknown>(
    '/openapi.json'
  );
}

/**
 * Get the API's documentation page, redirected to '/docs.html'.
 * API endpoint 'GET /docs'.
 * @returns The Swagger UI page as HTML.
 */
export function getDocs(): Promise<ApiResult<string>> {
  return request<string>(
    '/docs'
  );
}

/**
 * Get the response of the stub router the Express generator left behind.
 * API endpoint 'GET /users', unrelated to 'GET /api/users'.
 * @returns The literal string 'respond with a resource'.
 */
export function getUsersStub(): Promise<ApiResult<string>> {
  return request<string>(
    '/users'
  );
}
