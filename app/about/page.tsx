import type { Metadata } from 'next';
import Image from 'next/image';

import AboutPhotograph from '../../assets/images/kasa-about-photograph-1.png';
import MissionPhotograph from '../../assets/images/kasa-about-photograph-2.png';
import PageHeading from '../../components/PageHeading';

export const metadata: Metadata = { title: 'À propos' };

// Introduction of the page.
const INTRODUCTION = `Chez Kasa, nous croyons que chaque voyage mérite un lieu unique où se sentir bien.

Depuis notre création, nous mettons en relation des voyageurs en quête d’authenticité avec des hôtes passionnés qui aiment partager leur région et leurs bonnes adresses.`;

// Commitments of the company.
const MISSIONS = [
  'Offrir une plateforme fiable et simple d’utilisation',
  'Proposer des hébergements variés et de qualité',
  'Favoriser des échanges humains et chaleureux entre hôtes et voyageurs'
];

// Closing statement of the page.
const CLOSING = 'Que vous cherchiez un appartement cosy en centre-ville, une maison en bord de mer ou un chalet à la montagne, Kasa vous accompagne pour que chaque séjour devienne un souvenir inoubliable.';

// About page.
export default function AboutPage() {
  return (
    <main className='mx-auto flex w-full max-w-360 flex-1 flex-col gap-13 px-4 py-10 sm:px-8 xl:px-35'>

      {/* Hero */}
      <section className='flex flex-col items-center gap-10'>
        <PageHeading title='À propos' description={INTRODUCTION} />

        <div className='relative h-120 w-full overflow-hidden rounded-[20px]'>
          <Image src={AboutPhotograph} alt='' fill preload sizes='100vw' className='object-cover' />
        </div>
      </section>

      {/* Mission */}
      <section className='flex flex-col gap-4 lg:flex-row lg:items-center'>
        <div className='flex flex-col gap-4 lg:flex-1'>
          <h2 className='text-h3 font-bold text-main-red'>Notre mission est simple :</h2>
          <ol className='flex list-decimal flex-col gap-5 pl-6 text-body-m font-normal text-black'>
            {MISSIONS.map((mission) => (
              <li key={mission}>{mission}</li>
            ))}
          </ol>
          <p className='hidden text-h3 font-medium text-main-red lg:block'>{CLOSING}</p>
        </div>

        <div className='relative h-120 w-full overflow-hidden rounded-[20px] lg:w-1/2 lg:shrink-0'>
          <Image src={MissionPhotograph} alt='' fill sizes='(min-width: 1024px) 50vw, 100vw' className='object-cover' />
        </div>

        <p className='text-h3 font-medium text-main-red lg:hidden'>{CLOSING}</p>
      </section>
    </main>
  );
}
