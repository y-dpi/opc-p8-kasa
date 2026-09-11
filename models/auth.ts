// Wrappers for the authentication endpoints of the backend API.
import { type ApiResult, type AuthUser, type Ok, type RegisterRole, request } from './shared';

// Body of 'POST /auth/register'.
export interface RegisterInput {
  name: string;
  email: string;
  password: string;
  picture?: string;
  role?: RegisterRole;
}

// Body of 'POST /auth/login'.
export interface LoginInput {
  email: string;
  password: string;
}

// Body of 'POST /auth/request-reset'.
export interface RequestResetInput {
  email: string;
}

// Body of 'POST /auth/reset-password'.
export interface ResetPasswordInput {
  token: string;
  password: string;
}

// Data returned by 'POST /auth/register' and 'POST /auth/login'.
export interface AuthData {
  token: string;
  user: AuthUser;
}

// Data returned by 'POST /auth/request-reset'.
export interface ResetRequestData {
  ok: boolean;
  message: string;
  token?: string;
}

/**
 * Register a new user with the API.
 * API endpoint 'POST /auth/register'.
 * @param input Name, email, password, and optional picture and role.
 * @returns The newly created user info and token.
 */
export function register(input: RegisterInput): Promise<ApiResult<AuthData>> {
  return request<AuthData>(
    '/auth/register',
    { method: 'POST', body: input }
  );
}

/**
 * Authenticate an existing user with the API.
 * API endpoint 'POST /auth/login'.
 * @param input Email and password.
 * @returns The user info and token.
 */
export function login(input: LoginInput): Promise<ApiResult<AuthData>> {
  return request<AuthData>(
    '/auth/login',
    { method: 'POST', body: input }
  );
}

/**
 * Request a password reset token for a user.
 * API endpoint 'POST /auth/request-reset'.
 * @param input Email of the account to reset.
 * @returns An acknowledgement that never reveals whether the email exists,
 *   carrying the token itself only when the API does not run in production.
 */
export function requestPasswordReset(input: RequestResetInput): Promise<ApiResult<ResetRequestData>> {
  return request<ResetRequestData>(
    '/auth/request-reset',
    { method: 'POST', body: input }
  );
}

/**
 * Set a new password using a reset token.
 * API endpoint 'POST /auth/reset-password'.
 * @param input Reset token and new password.
 * @returns An acknowledgement with no other data.
 */
export function resetPassword(input: ResetPasswordInput): Promise<ApiResult<Ok>> {
  return request<Ok>(
    '/auth/reset-password',
    { method: 'POST', body: input }
  );
}
