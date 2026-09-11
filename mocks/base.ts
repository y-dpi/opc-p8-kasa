// Mocked wrappers for the base endpoints of the backend API.
import type { ApiInfoData } from '../models/base';
import { type ApiResult, ok } from './shared';

// Page 'express.static' serves at the root, shadowing the JSON the API would otherwise send.
const WELCOME_PAGE = `<html>

<head>
  <title>Express</title>
  <link rel="stylesheet" href="/stylesheets/style.css">
</head>

<body>
  <h1>Express</h1>
  <p>Welcome to Express</p>
</body>

</html>
`;

/**
 * Get the API's base information.
 * API endpoint 'GET /'.
 * @returns The base information, or the HTML page that express.static serves in its place.
 */
export function getApiInfo(): Promise<ApiResult<ApiInfoData | string>> {
  return ok<ApiInfoData | string>(WELCOME_PAGE);
}

/**
 * Get the API's OpenAPI specification.
 * API endpoint 'GET /openapi.json'.
 * @returns The specification describing every endpoint.
 */
export function getOpenApi(): Promise<ApiResult<unknown>> {
  return ok<unknown>({
    openapi: '3.0.0',
    info: { title: 'Kasa API', version: '1.0.0' },
    paths: {},
  });
}

/**
 * Get the API's documentation page, redirected to '/docs.html'.
 * API endpoint 'GET /docs'.
 * @returns The Swagger UI page as HTML.
 */
export function getDocs(): Promise<ApiResult<string>> {
  return ok('<html><head><title>Kasa API</title></head><body><div id="swagger-ui"></div></body></html>');
}

/**
 * Get the response of the stub router the Express generator left behind.
 * API endpoint 'GET /users', unrelated to 'GET /api/users'.
 * @returns The literal string 'respond with a resource'.
 */
export function getUsersStub(): Promise<ApiResult<string>> {
  return ok('respond with a resource');
}
