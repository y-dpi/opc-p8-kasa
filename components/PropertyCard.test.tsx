import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import PropertyCard from './PropertyCard';

// Mock property data.
const PROPERTY = {
  title: 'Appartement cosy',
  location: 'Ile de France - Paris 17e',
  price: 182,
  href: '/properties/c67ab8a7',
};

describe('PropertyCard', () => {
  it('names the property and where it is', () => {
    render(<PropertyCard {...PROPERTY} />);

    expect(screen.getByRole('heading', { level: 2, name: 'Appartement cosy' })).toBeInTheDocument();
    expect(screen.getByText('Ile de France - Paris 17e')).toBeInTheDocument();
  });

  it('prints the price with its unit, defaulting to a night', () => {
    render(<PropertyCard {...PROPERTY} />);

    expect(screen.getByText('182€')).toBeInTheDocument();
    expect(screen.getByText('par nuit')).toBeInTheDocument();
  });

  it('leads to the page of the property', () => {
    render(<PropertyCard {...PROPERTY} />);

    expect(screen.getByRole('link', { name: /Appartement cosy/ })).toHaveAttribute(
      'href',
      '/properties/c67ab8a7',
    );
  });

  it('says so when the property has no picture', () => {
    render(<PropertyCard {...PROPERTY} />);

    expect(screen.getByRole('img', { name: 'Aucune photo disponible' })).toBeInTheDocument();
  });

  it('names the favorite control after what pressing it would do', () => {
    const { rerender } = render(<PropertyCard {...PROPERTY} />);
    expect(screen.getByLabelText('Ajouter Appartement cosy aux favoris')).toBeInTheDocument();

    rerender(<PropertyCard {...PROPERTY} favorite />);
    expect(screen.getByLabelText('Retirer Appartement cosy des favoris')).toBeInTheDocument();
  });

  it('describes the listing to crawlers as an offer of an apartment', () => {
    const { container } = render(<PropertyCard {...PROPERTY} image='/photo.jpg' />);

    const offer = container.querySelector('[itemtype="https://schema.org/Offer"]');
    expect(offer).toBeInTheDocument();
    expect(offer?.querySelector('meta[itemprop="price"]')).toHaveAttribute('content', '182');
    expect(offer?.querySelector('meta[itemprop="priceCurrency"]')).toHaveAttribute('content', 'EUR');

    const apartment = container.querySelector('[itemtype="https://schema.org/Apartment"]');
    expect(apartment).toHaveAttribute('itemprop', 'itemOffered');
    expect(apartment?.querySelector('[itemprop="name"]')).toHaveTextContent('Appartement cosy');
  });
});
