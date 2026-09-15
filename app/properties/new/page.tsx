import type { Metadata } from 'next';

import NewPropertyForm from '../../../components/NewPropertyForm';
import { requireSession } from '../../../middleware/session';

export const metadata: Metadata = {
  title: 'Ajouter une propriété',
  robots: { index: false, follow: true },
};

// Add property page, reserved to the signed-in user.
export default async function NewPropertyPage() {
  await requireSession();

  return (
    <main className='mx-auto w-full max-w-360 flex-1 px-4 py-10 sm:px-8 xl:px-35'>
      <NewPropertyForm />
    </main>
  );
}
