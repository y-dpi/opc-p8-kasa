import Loader from '../../../components/Loader';

// Shown while a single property is fetched.
export default function Loading() {
  return (
    <main className='mx-auto flex w-full max-w-242.75 flex-1 px-4 py-10 sm:px-8 xl:px-0'>
      <Loader label='Chargement du logement…' />
    </main>
  );
}
