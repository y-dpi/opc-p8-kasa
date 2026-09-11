// Mocked wrappers for the upload endpoints of the backend API.
import type { DeleteImagesData, DeleteImagesInput, UploadData, UploadImageInput } from '../models/uploads';
import { type ApiResult, fail, ok } from './shared';

// Largest file the API accepts, in bytes.
const MAX_UPLOAD_SIZE = 10 * 1024 * 1024;

// Placeholder the mocked upload always answers with, in place of a freshly stored file.
const UPLOADED_URL = '/mocks/property-1.jpg';

/**
 * Store an image and get its public URL (owner or admin only).
 * API endpoint 'POST /api/uploads/image'.
 * @param token Bearer token of the authenticated user.
 * @param input Image file of 10 MB at most, and optional purpose metadata.
 * @returns The public URL and file metadata, with guidance on how to use that URL.
 */
export function uploadImage(token: string, input: UploadImageInput): Promise<ApiResult<UploadData>> {
  if (!token) return fail(401, 'missing token');
  if (!input.file) return fail(400, 'file is required');
  if (input.file.size > MAX_UPLOAD_SIZE) return fail(413, 'File too large');

  return ok({
    url: UPLOADED_URL,
    filename: 'property-1.jpg',
    size: 91553,
    mimetype: 'image/jpeg',
    purpose: null,
    instructions: 'Upload successful. Use the returned URL where appropriate.',
  }, 201);
}

/**
 * Delete uploaded images and the rows referencing them (owner or admin only).
 * API endpoint 'DELETE /api/uploads/images'.
 * @param token Bearer token of the authenticated user.
 * @param input Filenames and/or '/uploads/' URLs to delete.
 * @returns The outcome of every file, ok being false when only part of them succeeded.
 */
export function deleteImages(
  token: string,
  input: DeleteImagesInput,
): Promise<ApiResult<DeleteImagesData>> {
  if (!token) return fail(401, 'missing token');

  const requested = [
    ...(input.filenames ?? []),
    ...(input.urls ?? []),
    ...(input.filename ? [input.filename] : []),
    ...(input.url ? [input.url] : []),
  ];
  if (requested.length === 0) return fail(400, 'no filenames or urls provided');

  return ok({
    ok: true,
    deleted: ['property-1.jpg'],
    not_found: [],
    errors: [],
    results: [{ filename: 'property-1.jpg', status: 'deleted' }],
  });
}
