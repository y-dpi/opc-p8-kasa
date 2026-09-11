// Wrappers for the rating endpoints of the backend API.
import { type ApiResult, type Rating, type RatingsSummary, request } from './shared';

// Body of 'POST /api/properties/:id/ratings'.
export interface CreateRatingInput {
  user_id: number;
  score: number;
  comment?: string;
}

/**
 * List every rating of a property, newest first.
 * API endpoint 'GET /api/properties/:id/ratings'.
 * @param propertyId Target property ID.
 * @returns The ratings with their authors.
 */
export function getRatings(propertyId: string): Promise<ApiResult<Rating[]>> {
  return request<Rating[]>(
    `/api/properties/${encodeURIComponent(propertyId)}/ratings`
  );
}

/**
 * Add a rating to a property and refresh its average.
 * API endpoint 'POST /api/properties/:id/ratings'.
 * @param propertyId Target property ID.
 * @param input Author ID, score from 1 to 5, and optional comment.
 * @returns The recomputed average and count, with the full rating list.
 */
export function createRating(
  propertyId: string,
  input: CreateRatingInput,
): Promise<ApiResult<RatingsSummary>> {
  return request<RatingsSummary>(
    `/api/properties/${encodeURIComponent(propertyId)}/ratings`,
    { method: 'POST', body: input }
  );
}
