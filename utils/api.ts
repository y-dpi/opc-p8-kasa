// Single place where the frontend picks the API implementation its server actions talk to.
//
// Set 'API_MOCK=true' in the environment to serve every page from the hardcoded fixtures in
// '/mocks' instead of the real backend, so the frontend can be worked on without the API running.
import 'server-only';

import * as authMock from '../mocks/auth';
import * as baseMock from '../mocks/base';
import * as favoritesMock from '../mocks/favorites';
import * as propertiesMock from '../mocks/properties';
import * as ratingsMock from '../mocks/ratings';
import * as uploadsMock from '../mocks/uploads';
import * as usersMock from '../mocks/users';
import * as authModel from '../models/auth';
import * as baseModel from '../models/base';
import * as favoritesModel from '../models/favorites';
import * as propertiesModel from '../models/properties';
import * as ratingsModel from '../models/ratings';
import * as uploadsModel from '../models/uploads';
import * as usersModel from '../models/users';

// Whether the pages run against the mocked API instead of the real one.
export const IS_API_MOCK = process.env.API_MOCK === 'true';

// Endpoint wrappers, each resolved once to the mocked or the real implementation.
export const auth = IS_API_MOCK ? authMock : authModel;
export const base = IS_API_MOCK ? baseMock : baseModel;
export const favorites = IS_API_MOCK ? favoritesMock : favoritesModel;
export const properties = IS_API_MOCK ? propertiesMock : propertiesModel;
export const ratings = IS_API_MOCK ? ratingsMock : ratingsModel;
export const uploads = IS_API_MOCK ? uploadsMock : uploadsModel;
export const users = IS_API_MOCK ? usersMock : usersModel;
