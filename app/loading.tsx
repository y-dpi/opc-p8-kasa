import Loader from '../components/Loader';

// Fallback shown while any page without its own loader fetches its data.
export default function Loading() {
  return (
    <main className='mx-auto flex w-full max-w-360 flex-1 px-4 py-10 sm:px-8 xl:px-35'>
      <Loader />
    </main>
  );
}
