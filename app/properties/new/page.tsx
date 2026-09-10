import type { Metadata } from 'next';

import Button from '../../../components/Button';
import Card from '../../../components/Card';
import Checkbox from '../../../components/Checkbox';
import IconButton from '../../../components/IconButton';
import Input from '../../../components/Input';
import Tag from '../../../components/Tag';
import TextArea from '../../../components/TextArea';

export const metadata: Metadata = { title: 'Ajouter une propriété' };

// Amenities the host can tick.
const AMENITIES = [
  'Micro-Ondes', 'Clic-clac', 'Douche italienne', 'Four', 'Frigo', 'Rangements',
  'WIFI', 'Lit', 'Parking', 'Bouilloire', 'Sèche Cheveux', 'SDB',
  'Machine à laver', 'Toilettes sèches', 'Cuisine équipée', 'Cintres',
  'Télévision', 'Baie vitrée', 'Chambre Séparée', 'Hotte',
  'Climatisation', 'Baignoire', 'Frigo Américain', 'Vue Parc',
];

// Categories the host can pick from.
const CATEGORIES = [
  'Parc', 'Night Life', 'Culture', 'Nature', 'Touristique',
  'Vue sur mer', 'Pour les couples', 'Famille', 'Forêt',
];

// Add property page.
export default function NewPropertyPage() {
  return (
    <main className='mx-auto w-full max-w-360 flex-1 px-4 py-10 sm:px-8 xl:px-35'>
      <form className='flex flex-col gap-10'>

        {/* Heading */}
        <div className='flex flex-col gap-10'>
          <div className='h-9 self-start'>
            <Button label='Retour aux annonces' icon='back' variant='secondary' href='/' />
          </div>

          <div className='flex flex-wrap items-center justify-between gap-4'>
            <h1 className='text-h3 font-medium text-black lg:text-h2'>Ajouter une propriété</h1>
            <div className='h-9'>
              <Button label='Ajouter' type='submit' />
            </div>
          </div>
        </div>

        {/* Description and pictures */}
        <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
          <Card className='flex flex-col gap-4 p-4 lg:p-20'>
            <Input
              label='Titre de la propriété'
              name='title'
              placeholder='Ex : Appartement cosy au coeur de paris'
              required
            />
            <TextArea
              label='Description'
              name='description'
              placeholder='Décrivez votre propriété en détail...'
              required
            />
            <Input label='Code postal' name='postalCode' required />
            <Input label='Localisation' name='location' required />
          </Card>

          <div className='flex flex-col gap-4'>
            <Card className='flex flex-col gap-4 p-4 lg:px-20 lg:py-12'>
              <Input
                label='Image de couverture'
                name='cover'
                trailing={<IconButton icon='plus' label='Ajouter l’image de couverture' className='h-9 w-9 rounded-md' />}
              />

              <div className='flex flex-col gap-1'>
                <Input
                  label='Image du logement'
                  name='pictures'
                  trailing={<IconButton icon='plus' label='Ajouter une image du logement' className='h-9 w-9 rounded-md' />}
                />
                <button type='button' className='self-start text-body-m font-normal text-main-red hover:underline'>
                  +Ajouter une image
                </button>
              </div>
            </Card>

            <Card className='flex flex-col gap-4 p-4 lg:px-20 lg:py-12'>
              <Input label='Nom de l’hôte' name='hostName' required />

              <div className='flex flex-col gap-1'>
                <Input
                  label='Photo de profil'
                  name='hostPicture'
                  trailing={<IconButton icon='plus' label='Ajouter une photo de profil' className='h-9 w-9 rounded-md' />}
                />
                <button type='button' className='self-start text-body-m font-normal text-main-red hover:underline'>
                  +Ajouter une image
                </button>
              </div>
            </Card>
          </div>
        </div>

        {/* Amenities and categories */}
        <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
          <Card as='section' className='flex flex-col gap-4 p-4 lg:p-20'>
            <h2 className='text-body-m font-medium text-black'>Équipements</h2>

            <div className='grid grid-cols-1 gap-2 sm:grid-cols-2'>
              {AMENITIES.map((amenity) => (
                <Checkbox key={amenity} label={amenity} name='amenities' />
              ))}
            </div>
          </Card>

          <Card as='section' className='flex flex-col gap-4 p-4 lg:p-20'>
            <h2 className='text-body-m font-medium text-black'>Catégories</h2>

            <ul className='flex flex-wrap gap-1'>
              {CATEGORIES.map((category) => (
                <li key={category}><Tag label={category} /></li>
              ))}
            </ul>

            <div className='flex flex-col gap-1'>
              <Input
                label='Ajouter une catégorie personnalisée'
                name='category'
                placeholder='Nouveau tag'
                trailing={<IconButton icon='plus' label='Ajouter la catégorie' className='h-9 w-9 rounded-md' />}
              />
              <button type='button' className='self-start text-body-m font-normal text-main-red hover:underline'>
                +Ajouter un tag
              </button>
            </div>
          </Card>
        </div>
      </form>
    </main>
  );
}
