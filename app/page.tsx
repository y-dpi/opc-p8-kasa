import Image from 'next/image';

import { listFavoriteIds, toggleFavorite } from '../actions/favorites';
import { listProperties } from '../actions/properties';
import HomePhotograph from '../assets/images/kasa-home-photograph.png';
import PageHeading from '../components/PageHeading';
import PropertyCard from '../components/PropertyCard';
import StepCard from '../components/StepCard';

// Introduction of the page.
const INTRODUCTION = 'Avec Kasa, vivez des séjours uniques dans des hébergements chaleureux, sélectionnés avec soin par nos hôtes.';

// Steps of the 'how it works' section.
const STEPS = [
  { title: 'Recherchez', description: 'Entrez votre destination, vos dates et laissez Kasa faire le reste' },
  { title: 'Réservez', description: 'Profitez d’une plateforme sécurisée et de profils d’hôtes vérifiés.' },
  { title: 'Vivez l’expérience', description: 'Installez-vous, profitez de votre séjour, et sentez-vous chez vous, partout.' },
];

// Home page.
export default async function Home() {
  const [{ properties, error }, favoriteIds] = await Promise.all([listProperties(), listFavoriteIds()]);

  return (
    <main className='mx-auto flex w-full max-w-360 flex-1 flex-col gap-13 px-4 py-10 sm:px-8 xl:px-35'>

      {/* Hero */}
      <section className='flex flex-col items-center gap-10'>
        <PageHeading title='Chez vous, partout et ailleurs' description={INTRODUCTION} />

        <div className='relative h-120 w-full overflow-hidden rounded-[20px]'>
          <Image src={HomePhotograph} alt='' fill preload sizes='100vw' className='object-cover' />
        </div>
      </section>

      {/* Listings */}
      {error ? (
        <p role='alert' className='text-center text-body-m font-normal text-main-red'>{error}</p>
      ) : properties.length === 0 ? (
        <p className='text-center text-body-m font-normal text-dark-grey'>
          Aucun logement n’est disponible pour le moment.
        </p>
      ) : (
        <section id='listings' aria-label='Nos logements' className='grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3'>
          {properties.map((property) => {
            const favorite = favoriteIds.includes(property.id);

            return (
              <PropertyCard
                key={property.id}
                title={property.title}
                location={property.location ?? ''}
                price={property.price_per_night}
                image={property.cover}
                favorite={favorite}
                favoriteAction={toggleFavorite.bind(null, property.id, favorite)}
                href={`/properties/${property.id}`}
              />
            );
          })}
        </section>
      )}

      {/* How it works */}
      <section className='flex flex-col items-center gap-10 rounded-[10px] bg-white px-4 py-10 lg:px-10'>
        <div className='flex flex-col items-center gap-4 text-center'>
          <h2 className='text-h2 font-semibold text-black'>Comment ça marche ?</h2>
          <p className='text-body-m font-normal text-black'>
            Que vous partiez pour un week-end improvisé, des vacances en famille ou un voyage professionnel,
            Kasa vous aide à trouver un lieu qui vous ressemble.
          </p>
        </div>

        <div className='grid w-full grid-cols-1 gap-4 lg:grid-cols-3'>
          {STEPS.map((step) => (
            <StepCard key={step.title} title={step.title} description={step.description} />
          ))}
        </div>
      </section>
    </main>
  );
}
