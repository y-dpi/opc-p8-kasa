import type { Metadata } from 'next';

import AboutPhotograph from '../../../assets/images/kasa-about-photograph-1.png';
import HostPhotograph from '../../../assets/images/kasa-about-photograph-2.png';
import HomePhotograph from '../../../assets/images/kasa-home-photograph.png';
import Button from '../../../components/Button';
import Card from '../../../components/Card';
import Gallery from '../../../components/Gallery';
import HostCard from '../../../components/HostCard';
import Icon from '../../../components/Icon';
import Tag from '../../../components/Tag';

export const metadata: Metadata = { title: 'Appartement cosy' };

// Property shown on the page.
const PROPERTY = {
  title: 'Appartement cosy',
  location: 'Ile de France - Paris 17e',
  description: 'Votre maison loin de chez vous. Que vous veniez de l’autre bout du monde, ou juste de quelques stations de RER, vous vous sentirez chez vous dans notre appartement.',
  images: [HomePhotograph, AboutPhotograph, HostPhotograph, HomePhotograph, AboutPhotograph],
  amenities: ['Cafetière', 'Bouilloire', 'Vaisselle', 'Micro-onde', 'Sèche-linge', 'Sèche Cheveux', 'Lit pour bébé', 'Télévision'],
  categories: ['Batignolle', 'Montmartre'],
  host: { id: 'nathalie-jean', name: 'Nathalie Jean', rating: 3 },
};

// Property page.
export default function PropertyPage() {
  return (
    <main className='mx-auto flex w-full max-w-242.75 flex-1 flex-col gap-6 px-4 py-10 sm:px-8 xl:px-0'>

      {/* Back to the listings */}
      <div className='px-2 pb-4'>
        <span className='inline-flex h-9'>
          <Button label='Retour aux annonces' icon='back' variant='secondary' href='/#listings' />
        </span>
      </div>

      <div className='flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-2.5'>
        <div className='flex min-w-0 flex-1 flex-col gap-6'>

          {/* Pictures */}
          <Gallery images={PROPERTY.images} alt={PROPERTY.title} />

          {/* Details */}
          <Card as='section' className='flex flex-col gap-10 p-6'>
            <div className='flex flex-col gap-8'>
              <div className='flex flex-col gap-4'>
                <h1 className='text-h2 font-medium text-black'>{PROPERTY.title}</h1>
                <p className='flex items-center gap-2 text-body-m font-normal text-dark-grey'>
                  <span className='h-4 w-4 shrink-0'>
                    <Icon name='location' />
                  </span>
                  {PROPERTY.location}
                </p>
              </div>

              <p className='text-body-m font-normal text-black'>{PROPERTY.description}</p>
            </div>

            <div className='flex flex-col gap-4'>
              <h2 className='text-body-m font-medium text-black'>Équipements</h2>
              <ul className='flex flex-wrap gap-2.5'>
                {PROPERTY.amenities.map((amenity) => (
                  <li key={amenity}><Tag label={amenity} /></li>
                ))}
              </ul>
            </div>

            <div className='flex flex-col gap-4'>
              <h2 className='text-body-m font-medium text-black'>Catégorie</h2>
              <ul className='flex flex-wrap gap-4.5'>
                {PROPERTY.categories.map((category) => (
                  <li key={category}><Tag label={category} /></li>
                ))}
              </ul>
            </div>
          </Card>
        </div>

        {/* Host */}
        <HostCard
          name={PROPERTY.host.name}
          rating={PROPERTY.host.rating}
          className='w-full lg:w-86 lg:shrink-0'
        >
          <div className='h-9'>
            <Button label='Contacter l’hôte' />
          </div>
          <div className='h-9'>
            <Button label='Envoyer un message' href={`/messages?user=${PROPERTY.host.id}`} />
          </div>
        </HostCard>
      </div>
    </main>
  );
}
