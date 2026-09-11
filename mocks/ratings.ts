// Mocked wrappers for the rating endpoints of the backend API.
import type { CreateRatingInput } from '../models/ratings';
import { MOCK_RATINGS } from './data';
import { type ApiResult, fail, ok, type Rating, type RatingsSummary } from './shared';

// Aggregate the mocked endpoints report, kept consistent with the fixture ratings.
const SUMMARY: RatingsSummary = {
  rating_avg: 4.5,
  ratings_count: MOCK_RATINGS.length,
  ratings: MOCK_RATINGS,
};

/**
 * List every rating of a property, newest first.
 * API endpoint 'GET /api/properties/:id/ratings'.
 * @param propertyId Target property ID.
 * @returns The ratings with their authors.
 */
export function getRatings(propertyId: string): Promise<ApiResult<Rating[]>> {
  return ok(MOCK_RATINGS);
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
  if (!Number.isInteger(input.score) || input.score < 1 || input.score > 5) {
    return fail(400, 'score must be integer between 1 and 5');
  }
  if (!input.user_id) return fail(400, 'user_id is required');

  return ok(SUMMARY, 201);
}
