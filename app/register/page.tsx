import type { Metadata } from 'next';

import Button from '../../components/Button';
import Card from '../../components/Card';
import Checkbox from '../../components/Checkbox';
import Input from '../../components/Input';
import Link from '../../components/Link';
import PageHeading from '../../components/PageHeading';

export const metadata: Metadata = { title: 'Inscription' };

// Introduction of the page.
const INTRODUCTION = 'Créez votre compte et commencez à voyager autrement : réservez des logements uniques, découvrez de nouvelles destinations et partagez vos propres lieux avec d’autres voyageurs.';

// Register page.
export default function RegisterPage() {
  return (
    <main className='mx-auto flex w-full max-w-360 flex-1 items-center justify-center px-4 py-10 sm:px-8 xl:px-35'>
      <Card as='section' className='flex w-full max-w-185.5 flex-col items-center gap-9.5 px-4 py-8 lg:p-20'>
        <PageHeading compact title='Rejoignez la communauté Kasa' description={INTRODUCTION} />

        <form className='flex w-full max-w-90 flex-col gap-9.5'>
          <div className='flex flex-col gap-5.5'>
            <Input label='Nom' name='lastName' required />
            <Input label='Prénom' name='firstName' required />
            <Input label='Adresse email' name='email' type='email' required />
            <Input label='Mot de passe' name='password' type='password' required />
            <Checkbox label='J’accepte les conditions générales d’utilisation' name='terms' />
          </div>

          <div className='flex flex-col items-center gap-5.5'>
            <div className='h-9 w-full max-w-57.5'>
              <Button label='S’inscrire' />
            </div>
            <Link label='Déjà membre ?' emphasis='Se connecter' href='/login' />
          </div>
        </form>
      </Card>
    </main>
  );
}
