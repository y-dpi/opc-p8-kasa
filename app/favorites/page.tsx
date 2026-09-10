import type { Metadata } from 'next';

import AboutPhotograph from '../../assets/images/kasa-about-photograph-1.png';
import HostPhotograph from '../../assets/images/kasa-about-photograph-2.png';
import HomePhotograph from '../../assets/images/kasa-home-photograph.png';
import PageHeading from '../../components/PageHeading';
import PropertyCard from '../../components/PropertyCard';

export const metadata: Metadata = { title: 'Vos favoris' };

// Introduction of the page.
const INTRODUCTION = `Retrouvez ici tous les logements que vous avez aimés.
Prêts à réserver ? Un simple clic et votre prochain séjour est en route.`;

// Properties saved by the user.
const FAVORITES = [
  { id: '1', title: 'Appartement cosy', location: 'Ile de France - Paris 17e', price: 100, image: HomePhotograph },
  { id: '2', title: 'Magnifique appartement proche Canal Saint Martin', location: 'Ile de France - Paris 10e', price: 110, image: AboutPhotograph },
  { id: '3', title: 'Studio de charme - Buttes Chaumont', location: 'Ile de France - Paris 20e', price: 120, image: HostPhotograph },
];

// Favorites page.
export default function FavoritesPage() {
  return (
    <main className='mx-auto flex w-full max-w-360 flex-1 flex-col gap-10 px-4 py-10 sm:px-8 xl:px-35'>
      <PageHeading title='Vos favoris' description={INTRODUCTION} />

      {FAVORITES.length === 0 ? (
        <p className='text-center text-body-m font-normal text-dark-grey'>
          Vous n’avez pas encore de logement favori.
        </p>
      ) : (
        <section aria-label='Logements favoris' className='grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3'>
          {FAVORITES.map((property) => (
            <PropertyCard
              key={property.id}
              title={property.title}
              location={property.location}
              price={property.price}
              image={property.image}
              href={`/properties/${property.id}`}
              favorite
            />
          ))}
        </section>
      )}
    </main>
  );
}
