import type { Metadata } from 'next';

import Card from '../../components/Card';
import LoginForm from '../../components/LoginForm';
import PageHeading from '../../components/PageHeading';

export const metadata: Metadata = {
  title: 'Connexion',
  description: 'Connectez-vous à Kasa pour retrouver vos réservations, vos annonces et vos logements favoris.',
  alternates: { canonical: '/login' },
};

// Introduction of the page.
const INTRODUCTION = `Connectez-vous pour retrouver vos réservations,
vos annonces et tout ce qui rend vos séjours uniques.`;

// Login page.
export default async function LoginPage(props: PageProps<'/login'>) {
  const { from } = await props.searchParams;

  return (
    <main className='mx-auto flex w-full max-w-360 flex-1 items-center justify-center px-4 py-10 sm:px-8 xl:px-35'>
      <Card as='section' className='flex w-full max-w-185.5 flex-col items-center gap-9.5 px-4 py-8 lg:p-20'>
        <PageHeading compact title='Heureux de vous revoir' description={INTRODUCTION} />
        <LoginForm from={typeof from === 'string' ? from : undefined} />
      </Card>
    </main>
  );
}
