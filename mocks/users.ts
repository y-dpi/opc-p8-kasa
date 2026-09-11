// Mocked wrappers for the user endpoints of the backend API.
import type { CreateUserInput, UpdateUserInput } from '../models/users';
import { MOCK_USERS } from './data';
import { type ApiResult, fail, ok, type User } from './shared';

/**
 * Pick the fixture a request is about, so a listed user opens on their own page.
 * @param id Target user ID, arriving as a number or as a path string.
 * @returns The matching fixture, falling back to the first one for an unknown ID.
 */
function pickUser(id: number | string): User {
  return MOCK_USERS.find((user) => String(user.id) === String(id)) ?? MOCK_USERS[0];
}

/**
 * List every user, newest first (admin only).
 * API endpoint 'GET /api/users'.
 * @param token Bearer token of the authenticated user.
 * @returns The users, without their emails or credentials.
 */
export function getUsers(token: string): Promise<ApiResult<User[]>> {
  if (!token) return fail(401, 'missing token');

  return ok([...MOCK_USERS].reverse());
}

/**
 * Get a single user (self or admin only).
 * API endpoint 'GET /api/users/:id'.
 * @param token Bearer token of the authenticated user.
 * @param id Target user ID.
 * @returns The user, without their email or credentials.
 */
export function getUser(token: string, id: number | string): Promise<ApiResult<User>> {
  if (!token) return fail(401, 'missing token');

  return ok(pickUser(id));
}

/**
 * Create a user that cannot sign in, for hosting purposes only (admin only).
 * API endpoint 'POST /api/users'.
 * @param token Bearer token of the authenticated user.
 * @param input Name, and optional picture and role.
 * @returns The newly created user.
 */
export function createUser(token: string, input: CreateUserInput): Promise<ApiResult<User>> {
  if (!token) return fail(401, 'missing token');
  if (!input.name) return fail(400, 'name is required');

  return ok(MOCK_USERS[0], 201);
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
  if (!token) return fail(401, 'missing token');

  return ok(pickUser(id));
}
