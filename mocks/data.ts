// Hardcoded fixtures backing the mocked endpoints, shaped exactly like the API payloads.
//
// Everything here is local and constant: the pictures are placeholder files served from 'public',
// so a mocked page never reaches the network, and no fixture stands in for a real credential.
import type { AuthUser, Property, PropertyDetail, Rating, User } from '../models/shared';

// Folder of the placeholder pictures, served by NextJS from 'public/mocks'.
const PHOTO = '/mocks';

// Bearer token the mocked auth endpoints hand out, in place of a real JWT.
export const MOCK_TOKEN = 'mock.jwt.token';

// The one user the mocked auth endpoints always sign in, whatever the form was filled with.
export const MOCK_AUTH_USER: AuthUser = {
  id: 1,
  name: 'Camille Voyageuse',
  email: 'camille@kasa.test',
  picture: `${PHOTO}/host-1.jpg`,
  role: 'owner',
};

// Users, as the public user endpoints return them.
export const MOCK_USERS: User[] = [
  { id: 1, name: 'Camille Voyageuse', picture: `${PHOTO}/host-1.jpg`, role: 'owner' },
  { id: 2, name: 'Nathalie Jean', picture: `${PHOTO}/host-2.jpg`, role: 'owner' },
  { id: 3, name: 'Franck Maher', picture: `${PHOTO}/host-3.jpg`, role: 'owner' },
  { id: 4, name: 'Adrien Chiran', picture: null, role: 'client' },
  { id: 5, name: 'Sarah Devit', picture: `${PHOTO}/host-2.jpg`, role: 'client' },
  { id: 6, name: 'Admin Kasa', picture: null, role: 'admin' },
];

// Properties with their collections, from which the list shape is derived.
export const MOCK_PROPERTIES: PropertyDetail[] = [
  {
    id: 'c67ab8a7',
    slug: 'appartement-cosy',
    title: 'Appartement cosy',
    description: 'Votre maison loin de chez vous. Que vous veniez de l’autre bout du monde, ou juste de quelques stations de RER, vous vous sentirez chez vous dans notre appartement.',
    cover: `${PHOTO}/property-1.jpg`,
    location: 'Ile de France - Paris 17e',
    price_per_night: 182,
    rating_avg: 4.5,
    ratings_count: 2,
    host: { id: 2, name: 'Nathalie Jean', picture: `${PHOTO}/host-2.jpg` },
    pictures: [
      `${PHOTO}/property-1.jpg`,
      `${PHOTO}/property-2.jpg`,
      `${PHOTO}/property-3.jpg`,
      `${PHOTO}/property-4.jpg`,
      `${PHOTO}/property-5.jpg`,
    ],
    equipments: ['Douche italienne', 'Frigo', 'Micro-Ondes', 'WIFI', 'Équipements de base'],
    tags: ['Batignolle', 'Montmartre'],
  },
  {
    id: '0979876d',
    slug: 'appartement-de-standing-10e',
    title: 'Appartement de Standing - 10e',
    description: 'Ce loft entièrement rénové, et équipé de meubles de luxe saura vous séduire. Idéalement situé, vous serez à deux pas des plus beaux commerces du quartier.',
    cover: `${PHOTO}/property-2.jpg`,
    location: 'Ile de France - Paris 10e',
    price_per_night: 133,
    rating_avg: 5,
    ratings_count: 2,
    host: { id: 3, name: 'Franck Maher', picture: `${PHOTO}/host-3.jpg` },
    pictures: [
      `${PHOTO}/property-2.jpg`,
      `${PHOTO}/property-3.jpg`,
      `${PHOTO}/property-6.jpg`,
      `${PHOTO}/property-1.jpg`,
    ],
    equipments: ['Chambre Séparée', 'Frigo Américain', 'Parking', 'Sèche Cheveux', 'Wi-fi'],
    tags: ['Goncourt', 'Proche commerces'],
  },
  {
    id: 'd60ca600',
    slug: 'appartement-moderne-sur-parc',
    title: 'Appartement moderne sur parc',
    description: 'Respirer en plein coeur de Paris ? C’est possible ! Avec vue sur un parc résidentiel, vous profiterez du calme en pleine ville sans renoncer aux transports.',
    cover: `${PHOTO}/property-3.jpg`,
    location: 'Ile de France - Paris 11e',
    price_per_night: 103,
    rating_avg: 3.5,
    ratings_count: 2,
    host: { id: 1, name: 'Camille Voyageuse', picture: `${PHOTO}/host-1.jpg` },
    pictures: [
      `${PHOTO}/property-3.jpg`,
      `${PHOTO}/property-4.jpg`,
      `${PHOTO}/property-5.jpg`,
    ],
    equipments: ['Ascenseur', 'Chauffage', 'Sèche Cheveux', 'Sèche linge', 'Vue Parc', 'Wi-fi'],
    tags: ['11e', 'Metro 2', 'Metro 3', 'Père Lachaise'],
  },
  {
    id: 'af6d2d48',
    slug: 'bungalow-dans-la-foret',
    title: 'Bungalow dans la forêt',
    description: 'Quittez Paris pour vous mettre au vert. À seulement 30 minutes de la Gare du Nord, venez profiter du calme de la forêt d’Ecouen et de son musée.',
    cover: `${PHOTO}/property-4.jpg`,
    location: 'Ile de France - Ecouen',
    price_per_night: 246,
    rating_avg: 5,
    ratings_count: 2,
    host: { id: 5, name: 'Sarah Devit', picture: `${PHOTO}/host-2.jpg` },
    pictures: [
      `${PHOTO}/property-4.jpg`,
      `${PHOTO}/property-5.jpg`,
      `${PHOTO}/property-6.jpg`,
      `${PHOTO}/property-1.jpg`,
      `${PHOTO}/property-2.jpg`,
    ],
    equipments: ['Bouilloire', 'Cuisine équipée', 'Frigo', 'SDB', 'Toilettes sèches'],
    tags: ['Forêt', 'Musée d’Ecouen', 'Nature'],
  },
  {
    id: '2cf259e1',
    slug: 'charmant-studio-marais',
    title: 'Charmant Studio Marais',
    description: 'Un studio lumineux au coeur du Marais, idéal pour un séjour à deux. Tous les commerces et musées du quartier sont accessibles à pied.',
    cover: `${PHOTO}/property-5.jpg`,
    location: 'Ile de France - Paris 11e',
    price_per_night: 122,
    rating_avg: 4,
    ratings_count: 2,
    host: { id: 3, name: 'Franck Maher', picture: `${PHOTO}/host-3.jpg` },
    pictures: [
      `${PHOTO}/property-5.jpg`,
      `${PHOTO}/property-6.jpg`,
      `${PHOTO}/property-2.jpg`,
    ],
    equipments: ['Chauffage', 'Cuisine équipée', 'Lave-linge', 'Wi-fi'],
    tags: ['Marais', 'Proche commerces'],
  },
  {
    id: '1e180563',
    slug: 'charmant-apt-aux-portes-de-paris',
    title: 'Charmant apt aux portes de Paris',
    description: 'À deux pas de Paris, cet appartement récemment rénové vous accueille dans un quartier calme et parfaitement desservi par les transports.',
    cover: `${PHOTO}/property-6.jpg`,
    location: 'Ile de France - Levallois',
    price_per_night: 170,
    rating_avg: 4,
    ratings_count: 2,
    host: { id: 2, name: 'Nathalie Jean', picture: `${PHOTO}/host-2.jpg` },
    pictures: [
      `${PHOTO}/property-6.jpg`,
      `${PHOTO}/property-1.jpg`,
      `${PHOTO}/property-3.jpg`,
      `${PHOTO}/property-4.jpg`,
    ],
    equipments: ['Ascenseur', 'Balcon', 'Frigo', 'Parking', 'Wi-fi'],
    tags: ['Levallois', 'Metro 3'],
  },
];

// Ratings the mocked rating endpoints return for every property, newest first.
export const MOCK_RATINGS: Rating[] = [
  {
    id: 1,
    score: 5,
    comment: 'Appartement très agréable et parfaitement situé, nous reviendrons sans hésiter.',
    created_at: '2026-09-08 18:24:11',
    user: { id: 4, name: 'Adrien Chiran', picture: null, role: 'client' },
  },
  {
    id: 2,
    score: 4,
    comment: 'Un séjour très calme, l’accueil était chaleureux et le logement conforme aux photos.',
    created_at: '2026-09-02 09:47:53',
    user: { id: 5, name: 'Sarah Devit', picture: `${PHOTO}/host-2.jpg`, role: 'client' },
  },
];

/**
 * Reduce a property to the shape the list endpoints return.
 * @param property The full property.
 * @returns The property without its pictures, equipments, and tags.
 */
export function toListShape(property: PropertyDetail): Property {
  return {
    id: property.id,
    slug: property.slug,
    title: property.title,
    description: property.description,
    cover: property.cover,
    location: property.location,
    price_per_night: property.price_per_night,
    rating_avg: property.rating_avg,
    ratings_count: property.ratings_count,
    host: property.host,
  };
}
