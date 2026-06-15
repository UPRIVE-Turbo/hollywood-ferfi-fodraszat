import Image from 'next/image'
import type { About as AboutGlobal } from '@/payload-types'

const DEFAULT_IMAGE =
  'https://images.unsplash.com/photo-1593702275687-f8b402bf1fb5?auto=format&fit=crop&w=1200&q=80'

export function About({ about, image }: { about: AboutGlobal; image: string | null }) {
  return (
    <section id="rolunk" className="w-full bg-cream px-4 py-24 md:py-32">
      <div className="mx-auto flex max-w-[1400px] flex-col items-center gap-16 lg:grid lg:grid-cols-2 lg:gap-24">
        <div className="reveal-up group relative aspect-[4/5] w-full md:aspect-square lg:aspect-[4/5]">
          <div className="absolute -right-8 top-8 hidden h-full w-full border-2 border-gold transition-transform duration-700 group-hover:translate-x-2 md:block" />
          <Image
            src={image || DEFAULT_IMAGE}
            alt="Borbély szalon részlet, férfi hajvágás"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="relative z-10 object-cover grayscale-[50%] transition-all duration-700 hover:grayscale-0"
          />
        </div>

        <div className="reveal-up stagger-1 flex flex-col justify-center">
          <span className="mb-4 block font-heading text-sm tracking-[0.3em] text-gold uppercase">
            {about.eyebrow || 'A mesterségünk'}
          </span>
          <h2 className="mb-8 font-heading text-5xl leading-[0.9] font-bold tracking-tighter text-anthracite uppercase md:text-7xl">
            {about.headingLine1 || 'Több, mint'} <br />
            {about.headingLine2 || 'egy hajvágás.'} <br />
            <span className="text-gold">{about.headingHighlight || 'Hagyomány.'}</span>
          </h2>

          <div className="space-y-6 font-body text-lg leading-relaxed text-darkgray/80 md:text-xl">
            <p>
              {about.paragraph1 ||
                'A Hollywood Férfi Fodrászatban nem futószalagon gyártjuk a frizurákat. Ide azért jössz, hogy kiszakadj a rohanásból, igyál egy jó kávét, és ránk bízd a megjelenésed.'}
            </p>
            <p>
              {about.paragraph2 ||
                'Borbélyaink szenvedéllyel és maximális precizitással dolgoznak. A klasszikus ollós vágástól a legmodernebb fade átmenetekig, és a hagyományos pengés borotválásig mindenben a legmagasabb minőséget nyújtjuk Miskolc belvárosában.'}
            </p>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-8 border-t border-anthracite/10 pt-12">
            <div className="reveal-up stagger-2">
              <h4 className="mb-2 font-heading text-3xl font-bold text-anthracite">
                {about.stat1Value || '10+'}
              </h4>
              <p className="font-body text-xs font-bold tracking-widest text-darkgray/60 uppercase">
                {about.stat1Label || 'Év Tapasztalat'}
              </p>
            </div>
            <div className="reveal-up stagger-3">
              <h4 className="mb-2 font-heading text-3xl font-bold text-anthracite">
                {about.stat2Value || '100%'}
              </h4>
              <p className="font-body text-xs font-bold tracking-widest text-darkgray/60 uppercase">
                {about.stat2Label || 'Férfi Környezet'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
