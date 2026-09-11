// Mocked wrappers for the authentication endpoints of the backend API.
//
// No password is ever checked: any input that passes the shape checks signs in the same user,
// since the mocks exist to populate the pages, not to stand in for the real authentication.
import type {
  AuthData,
  LoginInput,
  RegisterInput,
  RequestResetInput,
  ResetPasswordInput,
  ResetRequestData,
} from '../models/auth';
import { MOCK_AUTH_USER, MOCK_TOKEN } from './data';
import { type ApiResult, fail, type Ok, ok } from './shared';

/**
 * Register a new user with the API.
 * API endpoint 'POST /auth/register'.
 * @param input Name, email, password, and optional picture and role.
 * @returns The newly created user info and token.
 */
export function register(input: RegisterInput): Promise<ApiResult<AuthData>> {
  if (!input.name) return fail(400, 'name is required');
  if (!input.email) return fail(400, 'email is required');
  if (!input.password || input.password.length < 6) return fail(400, 'password must be at least 6 characters');

  return ok({ token: MOCK_TOKEN, user: MOCK_AUTH_USER }, 201);
}

/**
 * Authenticate an existing user with the API.
 * API endpoint 'POST /auth/login'.
 * @param input Email and password, only checked for presence.
 * @returns The user info and token.
 */
export function login(input: LoginInput): Promise<ApiResult<AuthData>> {
  if (!input.email || !input.password) return fail(400, 'email and password are required');

  return ok({ token: MOCK_TOKEN, user: MOCK_AUTH_USER });
}

/**
 * Request a password reset token for a user.
 * API endpoint 'POST /auth/request-reset'.
 * @param input Email of the account to reset.
 * @returns An acknowledgement that never reveals whether the email exists,
 *   carrying the token itself only when the API does not run in production.
 */
export function requestPasswordReset(input: RequestResetInput): Promise<ApiResult<ResetRequestData>> {
  if (!input.email) return fail(400, 'email is required');

  const data: ResetRequestData = { ok: true, message: 'If the email exists, a reset link has been sent.' };
  if (process.env.NODE_ENV !== 'production') data.token = MOCK_TOKEN;
  return ok(data);
}

/**
 * Set a new password using a reset token.
 * API endpoint 'POST /auth/reset-password'.
 * @param input Reset token and new password.
 * @returns An acknowledgement with no other data.
 */
export function resetPassword(input: ResetPasswordInput): Promise<ApiResult<Ok>> {
  if (!input.token || !input.password) return fail(400, 'token and password are required');
  if (input.password.length < 6) return fail(400, 'password must be at least 6 characters');

  return ok({ ok: true });
}
