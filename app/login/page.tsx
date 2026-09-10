import type { Metadata } from 'next';

import Button from '../../components/Button';
import Card from '../../components/Card';
import Input from '../../components/Input';
import Link from '../../components/Link';
import PageHeading from '../../components/PageHeading';

export const metadata: Metadata = { title: 'Connexion' };

// Introduction of the page.
const INTRODUCTION = `Connectez-vous pour retrouver vos réservations,
vos annonces et tout ce qui rend vos séjours uniques.`;

// Login page.
export default function LoginPage() {
  return (
    <main className='mx-auto flex w-full max-w-360 flex-1 items-center justify-center px-4 py-10 sm:px-8 xl:px-35'>
      <Card as='section' className='flex w-full max-w-185.5 flex-col items-center gap-9.5 px-4 py-8 lg:p-20'>
        <PageHeading compact title='Heureux de vous revoir' description={INTRODUCTION} />

        <form className='flex w-full max-w-90 flex-col gap-9.5'>
          <div className='flex flex-col gap-5.5'>
            <Input label='Adresse email' name='email' type='email' required />
            <Input label='Mot de passe' name='password' type='password' required />
          </div>

          <div className='flex flex-col items-center gap-5.5'>
            <div className='h-9 w-full max-w-57.5'>
              <Button label='Se connecter' />
            </div>

            <div className='flex flex-col items-center gap-3 text-center'>
              <Link label='Mot de passe oublié' href='#' />
              <Link label='Pas encore de compte ?' emphasis='Inscrivez-vous' href='/register' />
            </div>
          </div>
        </form>
      </Card>
    </main>
  );
}
