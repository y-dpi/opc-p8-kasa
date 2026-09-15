import { describe, expect, it } from 'vitest';

import * as favoritesMock from '../mocks/favorites';
import * as propertiesMock from '../mocks/properties';
import { favorites, IS_API_MOCK, properties } from './api';

describe('API testing implementation', () => {
  it('runs against the mocked API', () => {
    expect(IS_API_MOCK).toBe(true);
  });

  it('resolves the endpoint wrappers to the mocked functions rather than the real models', () => {
    expect(favorites).toBe(favoritesMock);
    expect(properties).toBe(propertiesMock);
  });

  it('serves the favourites of a signed-in user from the fixtures, with no request made', async () => {
    const result = await favorites.getFavorites('any-token', 1);

    expect(result.ok).toBe(true);
    expect(result.data?.length).toBeGreaterThan(0);
  });
});
