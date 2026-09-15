'use client';

import { useActionState } from 'react';

import { login } from '../actions/auth';
import Button from './Button';
import Input from './Input';
import Link from './Link';

/**
 * Login form component.
 * @param props.from Page to return to once signed in, the home page by default.
 * @returns The login form.
 */
export default function LoginForm(props: {
  from?: string
}) {
  const [state, formAction, pending] = useActionState(login, undefined);

  return (
    <form action={formAction} className='flex w-full max-w-90 flex-col gap-9.5'>
      <input type='hidden' name='from' value={props.from ?? '/'} />

      <div className='flex flex-col gap-5.5'>
        <Input label='Adresse email' name='email' type='email' required />
        <Input label='Mot de passe' name='password' type='password' required />
      </div>

      {state?.error && (
        <p role='alert' className='text-body-s font-normal text-main-red'>{state.error}</p>
      )}

      <div className='flex flex-col items-center gap-5.5'>
        <div className='h-9 w-full max-w-57.5'>
          <Button label={pending ? 'Connexion…' : 'Se connecter'} disabled={pending} />
        </div>

        <div className='flex flex-col items-center gap-3 text-center'>
          <Link label='Mot de passe oublié' href='#' />
          <Link label='Pas encore de compte ?' emphasis='Inscrivez-vous' href='/register' />
        </div>
      </div>
    </form>
  );
}
