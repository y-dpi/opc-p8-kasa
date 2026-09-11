// Shared helper for the mocked endpoints of the backend API.
//
// Every wrapper here mirrors the signature of its 'models' counterpart and resolves to the same
// 'ApiResult' shape, so a module can swap one folder for the other without any other change.
// The fixtures are constant: a mocked call answers with the same payload every time, whatever the
// caller passes, so the pages can be laid out against populated data without a backend.
import type { ApiResult } from '../models/shared';

// Re-exported so the mocks can import their types from './shared', exactly like the models do.
export type {
  ApiResult,
  AuthUser,
  Ok,
  Property,
  PropertyDetail,
  PropertyHost,
  Rating,
  RatingsSummary,
  RegisterRole,
  Role,
  UploadPurpose,
  User,
} from '../models/shared';

/**
 * Build the result the request helper returns for a successful response.
 * @param data Payload to hand back, undefined for the endpoints that answer with an empty body.
 * @param status HTTP status the API would have replied with.
 * @returns The successful result, typed as 'T'.
 */
export function ok<T>(data: T, status = 200): Promise<ApiResult<T>> {
  return Promise.resolve({ ok: true, status, data });
}

/**
 * Build the result the request helper returns for a failed response.
 * @param status HTTP status the API would have replied with.
 * @param error Error message, worded like the one the API sends.
 * @returns The failed result, carrying no data.
 */
export function fail<T>(status: number, error: string): Promise<ApiResult<T>> {
  return Promise.resolve({ ok: false, status, error });
}
