'use server';

// Server actions bridging the property pages and the property API models.
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import type { Property, PropertyDetail } from '../models/shared';
import { properties } from '../utils/api';
import { type FormState, requireToken, UNREACHABLE } from './shared';

// Split a textarea or repeated field into trimmed, non-empty lines.
function parseList(values: string[]): string[] {
  return values.flatMap((value) => value.split(/[,\n]/)).map((value) => value.trim()).filter(Boolean);
}

// List every property, with an error instead of an empty catalogue when the API is unreachable.
export async function listProperties(): Promise<{ properties: Property[]; error?: string }> {
  let result;
  try {
    result = await properties.getProperties();
  } catch {
    return { properties: [], error: UNREACHABLE };
  }

  if (!result.ok || !result.data) {
    return { properties: [], error: result.error ?? 'Impossible de charger les logements.' };
  }
  return { properties: result.data };
}

// Read a single property, or null when it does not exist.
export async function getPropertyDetail(id: string): Promise<PropertyDetail | null> {
  try {
    const result = await properties.getProperty(id);
    return result.ok && result.data ? result.data : null;
  } catch {
    return null;
  }
}

// Create a property from the host form, then open its page.
export async function createProperty(_prev: FormState | undefined, formData: FormData): Promise<FormState> {
  const token = await requireToken();

  const title = String(formData.get('title') ?? '').trim();
  const description = String(formData.get('description') ?? '').trim();
  const postalCode = String(formData.get('postalCode') ?? '').trim();
  const location = String(formData.get('location') ?? '').trim();
  const price = Number(formData.get('price') ?? 0);
  const cover = String(formData.get('cover') ?? '').trim();
  const hostName = String(formData.get('hostName') ?? '').trim();
  const hostPicture = String(formData.get('hostPicture') ?? '').trim();

  const pictures = parseList(formData.getAll('pictures').map(String));
  const equipments = parseList(formData.getAll('amenities').map(String));
  const tags = parseList(formData.getAll('category').map(String));

  if (!title) return { error: 'Le titre est requis.' };
  if (!hostName) return { error: 'Le nom de l’hôte est requis.' };
  if (!Number.isFinite(price) || price < 0) return { error: 'Le prix par nuit est invalide.' };

  const gallery = cover ? [cover, ...pictures.filter((url) => url !== cover)] : pictures;

  let result;
  try {
    result = await properties.createProperty(token, {
      title,
      description: description || undefined,
      cover: cover || undefined,
      location: [postalCode, location].filter(Boolean).join(' ') || undefined,
      price_per_night: price,
      host: { name: hostName, picture: hostPicture || undefined },
      pictures: gallery.length ? gallery : undefined,
      equipments: equipments.length ? equipments : undefined,
      tags: tags.length ? tags : undefined,
    });
  } catch {
    return { error: UNREACHABLE };
  }

  if (!result.ok || !result.data) {
    return { error: result.error ?? 'Impossible d’ajouter le logement.' };
  }

  revalidatePath('/');
  redirect(`/properties/${result.data.id}`);
}
