import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cache } from 'react';

import { getPropertyDetail } from '../../../actions/properties';
import Button from '../../../components/Button';
import Card from '../../../components/Card';
import Gallery from '../../../components/Gallery';
import HostCard from '../../../components/HostCard';
import Icon from '../../../components/Icon';
import Tag from '../../../components/Tag';
import { siteUrl } from '../../../utils/site';

// Props of the page, the route parameters arriving as a promise.
type PropertyPageProps = { params: Promise<{ id: string }> };

// Cache property details for repeated calls.
const getProperty = cache(getPropertyDetail);

// Name the tab after the property itself.
export async function generateMetadata({ params }: PropertyPageProps): Promise<Metadata> {
  const { id } = await params;
  const property = await getProperty(id);
  if (!property) return { title: 'Logement introuvable', robots: { index: false } };

  // Fall back to the facts of the listing when the host wrote no description of their own.
  const description = property.description
    ?? `${property.title} à ${property.location ?? 'louer'}, ${property.price_per_night} € par nuit sur Kasa.`;
  const path = `/properties/${property.id}`;

  return {
    title: property.title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      title: property.title,
      description,
      url: path,
      images: property.cover ? [property.cover] : undefined,
    },
  };
}

// Property page.
export default async function PropertyPage({ params }: PropertyPageProps) {
  const { id } = await params;
  const property = await getProperty(id);
  if (!property) notFound();

  // The API serves the cover apart from the gallery, which may hold nothing else.
  const pictures = property.pictures.length > 0 ? property.pictures : [property.cover].filter((url) => url != null);

  return (
    <main className='mx-auto flex w-full max-w-242.75 flex-1 flex-col gap-6 px-4 py-10 sm:px-8 xl:px-0'>

      {/* Back to the listings */}
      <div className='px-2 pb-4'>
        <span className='inline-flex h-9'>
          <Button label='Retour aux annonces' icon='back' variant='secondary' href='/#listings' />
        </span>
      </div>

      <div
        itemScope
        itemType='https://schema.org/Offer'
        className='flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-2.5'
      >
        {/* Machine-readable copy of the price shown among the details below */}
        <meta itemProp='price' content={String(property.price_per_night)} />
        <meta itemProp='priceCurrency' content='EUR' />
        <meta itemProp='availability' content='https://schema.org/InStock' />
        <link itemProp='url' href={siteUrl(`/properties/${property.id}`)} />

        <div
          itemProp='itemOffered'
          itemScope
          itemType='https://schema.org/Apartment'
          className='flex min-w-0 flex-1 flex-col gap-6'
        >
          {/* The gallery serves optimised copies, so name the originals for crawlers */}
          {pictures.map((picture) => <meta key={picture} itemProp='image' content={picture} />)}

          {/* Pictures */}
          <Gallery images={pictures} />

          {/* Details */}
          <Card as='section' className='flex flex-col gap-10 p-6'>
            <div className='flex flex-col gap-8'>
              <div className='flex flex-col gap-4'>
                <h1 itemProp='name' className='text-h2 font-medium text-black'>{property.title}</h1>
                {property.location && (
                  <p itemProp='address' className='flex items-center gap-2 text-body-m font-normal text-dark-grey'>
                    <span className='h-4 w-4 shrink-0'>
                      <Icon name='location' />
                    </span>
                    {property.location}
                  </p>
                )}
              </div>

              {property.description && (
                <p itemProp='description' className='text-body-m font-normal text-black'>{property.description}</p>
              )}

              <p className='flex items-center gap-1.5'>
                <span className='text-h4 font-medium text-black'>{property.price_per_night}€</span>
                <span className='text-body-m font-normal text-dark-grey'>par nuit</span>
              </p>

              {/* Rating of the listing, which the host card shows further down the page */}
              {property.ratings_count > 0 && (
                <div
                  hidden
                  itemProp='aggregateRating'
                  itemScope
                  itemType='https://schema.org/AggregateRating'
                >
                  <meta itemProp='ratingValue' content={String(property.rating_avg)} />
                  <meta itemProp='reviewCount' content={String(property.ratings_count)} />
                  <meta itemProp='worstRating' content='0' />
                  <meta itemProp='bestRating' content='5' />
                </div>
              )}
            </div>

            {property.equipments.length > 0 && (
              <div className='flex flex-col gap-4'>
                <h2 className='text-body-m font-medium text-black'>Équipements</h2>
                <ul className='flex flex-wrap gap-2.5'>
                  {property.equipments.map((equipment) => (
                    <li
                      key={equipment}
                      itemProp='amenityFeature'
                      itemScope
                      itemType='https://schema.org/LocationFeatureSpecification'
                    >
                      <meta itemProp='name' content={equipment} />
                      <meta itemProp='value' content='true' />
                      <Tag label={equipment} />
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {property.tags.length > 0 && (
              <div className='flex flex-col gap-4'>
                <h2 className='text-body-m font-medium text-black'>Catégorie</h2>
                <ul className='flex flex-wrap gap-4.5'>
                  {property.tags.map((tag) => (
                    <li
                      key={tag}
                      itemProp='additionalProperty'
                      itemScope
                      itemType='https://schema.org/PropertyValue'
                    >
                      <meta itemProp='name' content='Catégorie' />
                      <meta itemProp='value' content={tag} />
                      <Tag label={tag} />
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Card>
        </div>

        {/* Host */}
        <HostCard
          name={property.host.name}
          rating={property.rating_avg}
          avatar={property.host.picture ?? undefined}
          className='w-full lg:w-86 lg:shrink-0'
        >
          <div className='h-9'>
            <Button label='Contacter l’hôte' href={`/messages?user=${property.host.id}`} />
          </div>
          <div className='h-9'>
            <Button label='Envoyer un message' href={`/messages?user=${property.host.id}`} />
          </div>
        </HostCard>
      </div>
    </main>
  );
}
