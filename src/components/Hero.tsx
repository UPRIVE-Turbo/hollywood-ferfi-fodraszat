import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import type { Hero as HeroGlobal } from '@/payload-types'

const DEFAULT_BACKGROUND =
  'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=2000&q=80'

export function Hero({
  address,
  hero,
  backgroundImage,
}: {
  address: string
  hero: HeroGlobal
  backgroundImage: string | null
}) {
  const titleLine1 = hero.titleLine1 || 'Hollywood'
  const titleLine2 = hero.titleLine2 || 'Férfi Fodrászat'
  const subtitle =
    hero.subtitle ||
    'Klasszikus stílus, profi kezekben. Hagyományos technikák és precizitás a modern kor úriembereinek.'
  const ctaLabel = hero.ctaLabel || 'Időpontfoglalás'

  return (
    <section className="relative flex min-h-[100dvh] w-full items-center justify-center overflow-hidden">
      <div className="absolute inset-0 h-full w-full">
        <Image
          src={backgroundImage || DEFAULT_BACKGROUND}
          alt="Borbély munka közben egy klasszikus szalonban"
          fill
          priority
          sizes="100vw"
          className="animate-hero-zoom object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-anthracite/90 via-anthracite/70 to-anthracite" />
        <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(34,38,42,0.8)]" />
      </div>

      <div className="relative z-10 mx-auto mt-20 flex max-w-5xl flex-col items-center px-4 text-center md:mt-0">
        <p className="reveal-up mb-6 font-heading text-sm tracking-[0.4em] text-gold uppercase md:text-base">
          {address}
        </p>

        <h1 className="reveal-up stagger-1 mb-6 font-heading text-6xl leading-[0.85] font-bold tracking-tighter text-cream uppercase md:text-8xl lg:text-[140px]">
          {titleLine1}
          <br />
          <span className="text-stroke-gold mt-2 block text-5xl md:text-7xl lg:text-[110px]">
            {titleLine2}
          </span>
        </h1>

        <p className="reveal-up stagger-2 mb-12 max-w-2xl font-body text-lg font-light text-cream/70 md:text-2xl">
          {subtitle}
        </p>

        <a
          href="#idopont"
          className="reveal-up stagger-3 group relative inline-flex items-center justify-center overflow-hidden bg-gold px-10 py-5 font-heading text-sm font-bold tracking-[0.2em] text-anthracite uppercase transition-transform active:scale-[0.98] md:text-lg"
        >
          <span className="absolute inset-0 h-full w-full -translate-x-full bg-cream transition-transform duration-500 ease-out group-hover:translate-x-0" />
          <span className="relative z-10 flex items-center gap-3 transition-colors group-hover:text-anthracite">
            {ctaLabel}{' '}
            <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
          </span>
        </a>
      </div>

      <div className="reveal-up stagger-3 absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2">
        <span className="font-heading text-xs tracking-[0.2em] text-gold/60 uppercase">
          Görgetés
        </span>
        <div className="relative h-12 w-[1px] overflow-hidden bg-gold/20">
          <div className="absolute top-0 left-0 h-1/2 w-full animate-[scroll-down_2s_ease-in-out_infinite] bg-gold" />
        </div>
      </div>
    </section>
  )
}
