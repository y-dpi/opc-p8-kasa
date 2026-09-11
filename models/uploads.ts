// Wrappers for the upload endpoints of the backend API.
import { type ApiResult, request, type UploadPurpose } from './shared';

// Body of 'POST /api/uploads/image', sent as multipart form data.
export interface UploadImageInput {
  file: Blob;
  filename?: string;
  purpose?: UploadPurpose;
  property_id?: string;
}

// Body of 'DELETE /api/uploads/images', each field taking a filename or an '/uploads/' URL.
export interface DeleteImagesInput {
  filenames?: string[];
  urls?: string[];
  filename?: string;
  url?: string;
}

// Data returned by 'POST /api/uploads/image'.
export interface UploadData {
  url: string;
  filename: string;
  size: number;
  mimetype: string;
  purpose: UploadPurpose | null;
  property_id?: string;
  instructions: string;
}

// Per-file outcome returned by 'DELETE /api/uploads/images'.
export interface DeleteImageResult {
  filename: string;
  status: 'deleted' | 'not_found' | 'error';
  error?: string;
}

// Data returned by 'DELETE /api/uploads/images'.
export interface DeleteImagesData {
  ok: boolean;
  deleted: string[];
  not_found: string[];
  errors: { filename: string; error: string }[];
  results: DeleteImageResult[];
}

/**
 * Store an image and get its public URL (owner or admin only).
 * API endpoint 'POST /api/uploads/image'.
 * @param token Bearer token of the authenticated user.
 * @param input Image file of 10 MB at most, and optional purpose metadata.
 * @returns The public URL and file metadata, with guidance on how to use that URL.
 */
export function uploadImage(token: string, input: UploadImageInput): Promise<ApiResult<UploadData>> {
  const form = new FormData();
  form.append('file', input.file, input.filename);
  if (input.purpose) form.append('purpose', input.purpose);
  if (input.property_id) form.append('property_id', input.property_id);

  return request<UploadData>(
    '/api/uploads/image',
    { method: 'POST', form, token }
  );
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
  return request<DeleteImagesData>(
    '/api/uploads/images',
    { method: 'DELETE', body: input, token }
  );
}
