import Loader from '../../components/Loader';

// Shown while the favorites of the signed-in user are fetched.
export default function Loading() {
  return (
    <main className='mx-auto flex w-full max-w-360 flex-1 px-4 py-10 sm:px-8 xl:px-35'>
      <Loader label='Chargement de vos favoris…' />
    </main>
  );
}
