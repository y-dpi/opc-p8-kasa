'use client';

import { type KeyboardEvent, useActionState, useState } from 'react';

import { createProperty } from '../actions/properties';
import { uploadImage } from '../actions/uploads';
import type { UploadPurpose } from '../models/shared';
import Button from './Button';
import Card from './Card';
import Checkbox from './Checkbox';
import IconButton from './IconButton';
import ImageField from './ImageField';
import Input from './Input';
import Tag from './Tag';
import TextArea from './TextArea';

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

// Add property form component.
export default function NewPropertyForm() {
  const [state, formAction, pending] = useActionState(createProperty, undefined);
  const [customCategories, setCustomCategories] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [draftCategory, setDraftCategory] = useState('');
  const [cover, setCover] = useState<string[]>([]);
  const [pictures, setPictures] = useState<string[]>([]);
  const [hostPicture, setHostPicture] = useState<string[]>([]);
  const [uploading, setUploading] = useState<UploadPurpose | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  /**
   * Send the picked files to the API and keep the URLs it files them under.
   * @param purpose What the images are meant for.
   * @param files The files the host just picked.
   * @param keep How to merge the new URLs into the ones already picked.
   */
  async function upload(
    purpose: UploadPurpose,
    files: File[],
    keep: (urls: string[]) => void,
  ): Promise<void> {
    setUploading(purpose);
    setUploadError(null);

    const stored: string[] = [];
    for (const file of files) {
      const body = new FormData();
      body.set('file', file);

      const result = await uploadImage(purpose, body);
      if (result.error) setUploadError(result.error);
      else if (result.url) stored.push(result.url);
    }

    if (stored.length > 0) keep(stored);
    setUploading(null);
  }

  // Every category on offer, the ones the host typed following the predefined list.
  const categories = [...CATEGORIES, ...customCategories];

  // Pick a category up or put it back down.
  function toggleCategory(label: string): void {
    setSelectedCategories((current) => current.includes(label)
      ? current.filter((entry) => entry !== label)
      : [...current, label]);
  }

  // Add the typed category to the list and select it, unless it is already one of the predefined.
  function addDraftCategory(): void {
    const label = draftCategory.trim();
    if (!label) return;

    setDraftCategory('');
    setSelectedCategories((current) => current.includes(label) ? current : [...current, label]);
    if (CATEGORIES.includes(label)) return;

    // Offer it alongside the predefined ones for the rest of the form.
    setCustomCategories((current) => current.includes(label) ? current : [...current, label]);
  }

  // Enter adds the category instead of submitting the whole form.
  function onDraftKeyDown(event: KeyboardEvent<HTMLInputElement>): void {
    if (event.key !== 'Enter') return;
    event.preventDefault();
    addDraftCategory();
  }

  return (
    <form action={formAction} className='flex flex-col gap-10'>

      {/* Heading */}
      <div className='flex flex-col gap-10'>
        <div className='h-9 self-start'>
          <Button label='Retour aux annonces' icon='back' variant='secondary' href='/' />
        </div>

        <div className='flex flex-wrap items-center justify-between gap-4'>
          <h1 className='text-h3 font-medium text-black lg:text-h2'>Ajouter une propriété</h1>
          <div className='h-9'>
            <Button label={pending ? 'Ajout…' : 'Ajouter'} type='submit' disabled={pending} />
          </div>
        </div>

        {state?.error && (
          <p role='alert' className='text-body-s font-normal text-main-red'>{state.error}</p>
        )}
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
          <Input label='Prix par nuit (€)' name='price' type='number' placeholder='120' required />
        </Card>

        <div className='flex flex-col gap-4'>
          <Card className='flex flex-col gap-4 p-4 lg:px-20 lg:py-12'>
            {/* The stored URLs travel with the form, the files having been sent on pick */}
            {cover.map((url) => <input key={url} type='hidden' name='cover' value={url} />)}
            {pictures.map((url) => <input key={url} type='hidden' name='pictures' value={url} />)}

            <ImageField
              label='Image de couverture'
              images={cover}
              pending={uploading === 'property-cover'}
              onPick={(files) => void upload('property-cover', files.slice(0, 1), (urls) => setCover(urls))}
              onRemove={() => setCover([])}
            />

            <ImageField
              label='Images du logement'
              images={pictures}
              multiple
              pending={uploading === 'property-picture'}
              onPick={(files) => void upload('property-picture', files, (urls) => setPictures((current) => [...current, ...urls]))}
              onRemove={(url) => setPictures((current) => current.filter((entry) => entry !== url))}
            />

            {uploadError && (
              <p role='alert' className='text-body-s font-normal text-main-red'>{uploadError}</p>
            )}
          </Card>

          <Card className='flex flex-col gap-4 p-4 lg:px-20 lg:py-12'>
            <Input label='Nom de l’hôte' name='hostName' required />

            {hostPicture.map((url) => <input key={url} type='hidden' name='hostPicture' value={url} />)}

            <ImageField
              label='Photo de profil'
              images={hostPicture}
              pending={uploading === 'user-picture'}
              onPick={(files) => void upload('user-picture', files.slice(0, 1), (urls) => setHostPicture(urls))}
              onRemove={() => setHostPicture([])}
            />
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
          <h2 id='categories-label' className='text-body-m font-medium text-black'>Catégories</h2>

          {/* The selection travels with the form, one field per picked category */}
          {selectedCategories.map((category) => (
            <input key={category} type='hidden' name='category' value={category} />
          ))}

          <ul aria-labelledby='categories-label' className='flex flex-wrap gap-1'>
            {categories.map((category) => (
              <li key={category}>
                <Tag
                  label={category}
                  selected={selectedCategories.includes(category)}
                  onToggle={() => toggleCategory(category)}
                />
              </li>
            ))}
          </ul>

          <div className='flex flex-col gap-1'>
            <Input
              label='Ajouter une catégorie personnalisée'
              id='category'
              placeholder='Nouveau tag'
              value={draftCategory}
              onChange={setDraftCategory}
              onKeyDown={onDraftKeyDown}
              trailing={(
                <IconButton
                  icon='plus'
                  label='Ajouter la catégorie'
                  onClick={addDraftCategory}
                  className='h-9 w-9 rounded-md'
                />
              )}
            />
            <button
              type='button'
              onClick={addDraftCategory}
              className='self-start text-body-m font-normal text-main-red hover:underline'
            >
              +Ajouter un tag
            </button>
          </div>
        </Card>
      </div>
    </form>
  );
}
