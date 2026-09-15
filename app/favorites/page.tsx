import type { Metadata } from 'next';

import { listFavorites, toggleFavorite } from '../../actions/favorites';
import PageHeading from '../../components/PageHeading';
import PropertyCard from '../../components/PropertyCard';

export const metadata: Metadata = {
  title: 'Vos favoris',
  robots: { index: false, follow: true },
};

// Introduction of the page.
const INTRODUCTION = `Retrouvez ici tous les logements que vous avez aimés.
Prêts à réserver ? Un simple clic et votre prochain séjour est en route.`;

// Favorites page, reserved to the signed-in user.
export default async function FavoritesPage() {
  const { properties, error } = await listFavorites();

  return (
    <main className='mx-auto flex w-full max-w-360 flex-1 flex-col gap-10 px-4 py-10 sm:px-8 xl:px-35'>
      <PageHeading title='Vos favoris' description={INTRODUCTION} />

      {error ? (
        <p role='alert' className='text-center text-body-m font-normal text-main-red'>{error}</p>
      ) : properties.length === 0 ? (
        <p className='text-center text-body-m font-normal text-dark-grey'>
          Vous n’avez pas encore de logement favori.
        </p>
      ) : (
        <section
          aria-label='Logements favoris'
          itemScope
          itemType='https://schema.org/ItemList'
          className='grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3'
        >
          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              title={property.title}
              location={property.location ?? ''}
              price={property.price_per_night}
              image={property.cover}
              href={`/properties/${property.id}`}
              favoriteAction={toggleFavorite.bind(null, property.id, true)}
              favorite
            />
          ))}
        </section>
      )}
    </main>
  );
}
