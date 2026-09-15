'use client';

import { useActionState } from 'react';

import { register } from '../actions/auth';
import Button from './Button';
import Checkbox from './Checkbox';
import Input from './Input';
import Link from './Link';

// Register form component.
export default function RegisterForm() {
  const [state, formAction, pending] = useActionState(register, undefined);

  return (
    <form action={formAction} className='flex w-full max-w-90 flex-col gap-9.5'>
      <div className='flex flex-col gap-5.5'>
        <Input label='Nom' name='lastName' required />
        <Input label='Prénom' name='firstName' required />
        <Input label='Adresse email' name='email' type='email' required />
        <Input label='Mot de passe' name='password' type='password' required />
        <Checkbox label='J’accepte les conditions générales d’utilisation' name='terms' />
      </div>

      {state?.error && (
        <p role='alert' className='text-body-s font-normal text-main-red'>{state.error}</p>
      )}

      <div className='flex flex-col items-center gap-5.5'>
        <div className='h-9 w-full max-w-57.5'>
          <Button label={pending ? 'Inscription…' : 'S’inscrire'} disabled={pending} />
        </div>
        <Link label='Déjà membre ?' emphasis='Se connecter' href='/login' />
      </div>
    </form>
  );
}
