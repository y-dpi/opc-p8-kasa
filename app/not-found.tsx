import Button from '../components/Button';

// Not found page.
export default function NotFound() {
  return (
    <main className='mx-auto flex w-full max-w-360 flex-1 flex-col items-center justify-center gap-10 px-4 py-16 sm:px-8 xl:px-35'>
      <div className='flex flex-col items-center text-center'>
        <p className='text-display font-black text-main-red'>404</p>
        <h1 className='max-w-85 text-body-m font-normal text-black'>
          Il semble que la page que vous cherchez ait pris des vacances… ou n’ait jamais existé.
        </h1>
      </div>

      <div className='flex w-full max-w-50 flex-col gap-3.5'>
        <div className='h-9'>
          <Button label='Accueil' href='/' />
        </div>
        <div className='h-9'>
          <Button label='Logements' href='/' />
        </div>
      </div>
    </main>
  );
}
