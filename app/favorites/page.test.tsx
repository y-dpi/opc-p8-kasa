import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import FavoritesPage from './page';

// The page reads its list through this one action, which behind it would reach for a session
// cookie and then the API. Standing in for it keeps the test clear of both, and lets each of the
// three states the page can be in be asked for directly. Nothing here talks to a network.
const { listFavorites } = vi.hoisted(() => ({ listFavorites: vi.fn() }));

vi.mock('../../actions/favorites', () => ({
  listFavorites,
  toggleFavorite: vi.fn(),
}));

// Two favorites are enough to tell a list from a single card.
const FAVORITES = [
  {
    id: 'c67ab8a7',
    slug: 'appartement-cosy',
    title: 'Appartement cosy',
    description: null,
    cover: '/photo-1.jpg',
    location: 'Ile de France - Paris 17e',
    price_per_night: 182,
    rating_avg: 0,
    ratings_count: 0,
    host: { id: 2, name: 'Nathalie Jean', picture: null },
  },
  {
    id: '0979876d',
    slug: 'maison-bord-de-mer',
    title: 'Maison bord de mer',
    description: null,
    cover: null,
    location: 'Bretagne - Saint-Malo',
    price_per_night: 240,
    rating_avg: 0,
    ratings_count: 0,
    host: { id: 3, name: 'Franck Maher', picture: null },
  },
];

describe('FavoritesPage', () => {
  beforeEach(() => {
    listFavorites.mockReset();
  });

  it('names the page and says what it is for', async () => {
    listFavorites.mockResolvedValue({ properties: [] });

    render(await FavoritesPage());

    expect(screen.getByRole('heading', { level: 1, name: 'Vos favoris' })).toBeInTheDocument();
    expect(screen.getByText(/Retrouvez ici tous les logements que vous avez aimés/)).toBeInTheDocument();
  });

  it('shows one card per favorite, each leading to its own page', async () => {
    listFavorites.mockResolvedValue({ properties: FAVORITES });

    render(await FavoritesPage());

    expect(screen.getByRole('heading', { level: 2, name: 'Appartement cosy' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Maison bord de mer' })).toBeInTheDocument();

    expect(screen.getByRole('link', { name: /Appartement cosy/ }))
      .toHaveAttribute('href', '/properties/c67ab8a7');
    expect(screen.getByRole('link', { name: /Maison bord de mer/ }))
      .toHaveAttribute('href', '/properties/0979876d');
  });

  it('shows every card as already favorited, since that is what the page holds', async () => {
    listFavorites.mockResolvedValue({ properties: FAVORITES });

    render(await FavoritesPage());

    expect(screen.getByLabelText('Retirer Appartement cosy des favoris')).toBeInTheDocument();
    expect(screen.getByLabelText('Retirer Maison bord de mer des favoris')).toBeInTheDocument();
  });

  it('gathers the cards into a list a crawler can read', async () => {
    listFavorites.mockResolvedValue({ properties: FAVORITES });

    const { container } = render(await FavoritesPage());

    const list = container.querySelector('[itemtype="https://schema.org/ItemList"]');
    expect(list).toHaveAttribute('aria-label', 'Logements favoris');
    expect(list?.querySelectorAll('[itemprop="itemListElement"]')).toHaveLength(2);
  });

  it('display empty state message when nothing has been favorited yet', async () => {
    listFavorites.mockResolvedValue({ properties: [] });

    render(await FavoritesPage());

    expect(screen.getByText('Vous n’avez pas encore de logement favori.')).toBeInTheDocument();
    expect(screen.queryByRole('heading', { level: 2 })).not.toBeInTheDocument();
  });

  it('reports the trouble the action came back with, as an alert', async () => {
    listFavorites.mockResolvedValue({ properties: [], error: 'Impossible de contacter le serveur.' });

    render(await FavoritesPage());

    expect(screen.getByRole('alert')).toHaveTextContent('Impossible de contacter le serveur.');
    expect(screen.queryByText('Vous n’avez pas encore de logement favori.')).not.toBeInTheDocument();
  });
});
