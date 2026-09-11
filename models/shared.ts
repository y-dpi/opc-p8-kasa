// Shared wrapper helper for the endpoints of the backend API.
import 'server-only';

// Base URL of the backend REST API.
export const API_BASE_URL = (process.env.API_URL ?? 'http://localhost:3000').replace(/\/+$/, '');

// Generic result format returned by every wrapper, since the API sends payloads unwrapped.
export interface ApiResult<T = undefined> {
  ok: boolean;
  status: number;
  data?: T;
  error?: string;
}

// Enums.
export type Role = 'owner' | 'client' | 'admin';
export type RegisterRole = 'owner' | 'client';
export type UploadPurpose = 'property-cover' | 'property-picture' | 'user-picture' | 'other';

// Acknowledgement payload of the endpoints that have nothing else to send back.
export interface Ok {
  ok: boolean;
}

// Public user object used in user, rating, and favorite endpoints.
export interface User {
  id: number;
  name: string;
  picture: string | null;
  role: Role;
}

// Authentication user object used in auth endpoints, which also carries the email.
export interface AuthUser {
  id: number;
  name: string;
  email: string | null;
  picture: string | null;
  role: Role;
}

// Host object embedded in every property.
export interface PropertyHost {
  id: number;
  name: string;
  picture: string | null;
}

// Property object used in the list endpoints.
export interface Property {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  cover: string | null;
  location: string | null;
  price_per_night: number;
  rating_avg: number;
  ratings_count: number;
  host: PropertyHost;
}

// Property object used in the single-property endpoints, with its collections.
export interface PropertyDetail extends Property {
  pictures: string[];
  equipments: string[];
  tags: string[];
}

// Rating object.
export interface Rating {
  id: number;
  score: number;
  comment: string | null;
  created_at: string;
  user: User;
}

// Aggregate returned after adding a rating.
export interface RatingsSummary {
  rating_avg: number;
  ratings_count: number;
  ratings: Rating[];
}

// Options accepted by the API request helper.
export interface RequestOptions {
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  body?: unknown;
  form?: FormData;
  token?: string;
  query?: Record<string, string | number | undefined>;
}

/**
 * Read a response body, tolerating the empty and non-JSON ones the API also sends.
 * @param response The response to drain.
 * @returns The parsed JSON, the raw text, or undefined when there is no body.
 */
async function readPayload(response: Response): Promise<unknown> {
  const text = await response.text();
  if (!text) return undefined;
  if (!(response.headers.get('Content-Type') ?? '').includes('json')) return text;
  return JSON.parse(text) as unknown;
}

/**
 * Perform a request at the backend API and return its outcome.
 * @param path API path starting with a slash (e.g., '/auth/login').
 * @param options Method, JSON or multipart body, bearer token, and query parameters.
 * @returns The status, and either the payload typed as 'T' or the API error message.
 */
export async function request<T>(path: string, options: RequestOptions = {}): Promise<ApiResult<T>> {
  const { method = 'GET', body, form, token, query } = options;

  let url = `${API_BASE_URL}${path}`;
  if (query) {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(query)) {
      if (value !== undefined) params.set(key, String(value));
    }
    const qs = params.toString();
    if (qs) url += `?${qs}`;
  }

  // Content-Type is left out for multipart bodies, so fetch generates the boundary itself.
  const headers: Record<string, string> = {};
  if (body !== undefined) headers['Content-Type'] = 'application/json';
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const response = await fetch(url, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : form,
    cache: 'no-store',
  });

  const payload = await readPayload(response);
  if (!response.ok) {
    const error = (payload as { error?: string } | undefined)?.error;
    return { ok: false, status: response.status, error: error ?? response.statusText };
  }
  return { ok: true, status: response.status, data: payload as T };
}
