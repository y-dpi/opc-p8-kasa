import type { Metadata } from 'next';

import Card from '../../components/Card';
import PageHeading from '../../components/PageHeading';
import RegisterForm from '../../components/RegisterForm';

export const metadata: Metadata = {
  title: 'Inscription',
  description: 'Créez votre compte Kasa pour réserver des logements uniques et partager les vôtres.',
  alternates: { canonical: '/register' },
};

// Introduction of the page.
const INTRODUCTION = 'Créez votre compte et commencez à voyager autrement : réservez des logements uniques, découvrez de nouvelles destinations et partagez vos propres lieux avec d’autres voyageurs.';

// Register page.
export default function RegisterPage() {
  return (
    <main className='mx-auto flex w-full max-w-360 flex-1 items-center justify-center px-4 py-10 sm:px-8 xl:px-35'>
      <Card as='section' className='flex w-full max-w-185.5 flex-col items-center gap-9.5 px-4 py-8 lg:p-20'>
        <PageHeading compact title='Rejoignez la communauté Kasa' description={INTRODUCTION} />
        <RegisterForm />
      </Card>
    </main>
  );
}
