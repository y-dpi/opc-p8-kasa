// Wrappers for the user endpoints of the backend API.
import { type ApiResult, request, type Role, type User } from './shared';

// Body of 'POST /api/users'.
export interface CreateUserInput {
  name: string;
  picture?: string;
  role?: Role;
}

// Body of 'PATCH /api/users/:id'.
export interface UpdateUserInput {
  name?: string;
  picture?: string;
  role?: Role;
}

/**
 * List every user, newest first (admin only).
 * API endpoint 'GET /api/users'.
 * @param token Bearer token of the authenticated user.
 * @returns The users, without their emails or credentials.
 */
export function getUsers(token: string): Promise<ApiResult<User[]>> {
  return request<User[]>(
    '/api/users',
    { token }
  );
}

/**
 * Get a single user (self or admin only).
 * API endpoint 'GET /api/users/:id'.
 * @param token Bearer token of the authenticated user.
 * @param id Target user ID.
 * @returns The user, without their email or credentials.
 */
export function getUser(token: string, id: number | string): Promise<ApiResult<User>> {
  return request<User>(
    `/api/users/${encodeURIComponent(id)}`,
    { token }
  );
}

/**
 * Create a user that cannot sign in, for hosting purposes only (admin only).
 * API endpoint 'POST /api/users'.
 * @param token Bearer token of the authenticated user.
 * @param input Name, and optional picture and role.
 * @returns The newly created user.
 */
export function createUser(token: string, input: CreateUserInput): Promise<ApiResult<User>> {
  return request<User>(
    '/api/users',
    { method: 'POST', body: input, token }
  );
}

/**
 * Update a user profile (self or admin only).
 * API endpoint 'PATCH /api/users/:id'.
 * @param token Bearer token of the authenticated user.
 * @param id Target user ID.
 * @param input Fields to update, the admin role being reserved to admins.
 * @returns The updated user.
 */
export function updateUser(
  token: string,
  id: number | string,
  input: UpdateUserInput,
): Promise<ApiResult<User>> {
  return request<User>(
    `/api/users/${encodeURIComponent(id)}`,
    { method: 'PATCH', body: input, token }
  );
}
