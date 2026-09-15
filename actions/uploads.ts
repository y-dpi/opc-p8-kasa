'use server';

// Server actions bridging the image pickers and the upload API models.
import type { UploadPurpose } from '../models/shared';
import { uploads } from '../utils/api';
import { requireToken, UNREACHABLE } from './shared';

// Largest file the API accepts, checked here so an oversized pick fails without a round trip.
const MAX_UPLOAD_SIZE = 10 * 1024 * 1024;

/**
 * Store one picked image and return the URL the API filed it under.
 * @param purpose What the image is meant for, which the API echoes back.
 * @param formData Form data carrying the picked file under 'file'.
 * @returns The public URL of the stored image, or the reason it was refused.
 */
export async function uploadImage(
  purpose: UploadPurpose,
  formData: FormData,
): Promise<{ url?: string; error?: string }> {
  const token = await requireToken();

  const file = formData.get('file');
  if (!(file instanceof File) || file.size === 0) return { error: 'Aucun fichier sélectionné.' };
  if (!file.type.startsWith('image/')) return { error: `« ${file.name} » n’est pas une image.` };
  if (file.size > MAX_UPLOAD_SIZE) return { error: `« ${file.name} » dépasse 10 Mo.` };

  let result;
  try {
    result = await uploads.uploadImage(token, { file, filename: file.name, purpose });
  } catch {
    return { error: UNREACHABLE };
  }

  if (!result.ok || !result.data) {
    return { error: result.error ?? 'Impossible d’envoyer l’image.' };
  }
  return { url: result.data.url };
}
