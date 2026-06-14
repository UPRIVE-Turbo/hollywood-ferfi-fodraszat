import Image from 'next/image'

export type GalleryImage = {
  id: string
  url: string
  alt: string
}

const fallbackImages: GalleryImage[] = [
  {
    id: 'fallback-1',
    url: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=800&q=80',
    alt: 'Hajvágó gép használat közben',
  },
  {
    id: 'fallback-2',
    url: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80',
    alt: 'Klasszikus borbély szék',
  },
  {
    id: 'fallback-3',
    url: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=800&q=80',
    alt: 'Precíz fade átmenet',
  },
  {
    id: 'fallback-4',
    url: 'https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?auto=format&fit=crop&w=800&q=80',
    alt: 'Borotva és eszközök',
  },
  {
    id: 'fallback-5',
    url: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=800&q=80',
    alt: 'Szakálligazítás',
  },
  {
    id: 'fallback-6',
    url: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&w=800&q=80',
    alt: 'Borbély szalon belső tér',
  },
]

export function Gallery({ images }: { images: GalleryImage[] }) {
  const items = images.length > 0 ? images : fallbackImages

  return (
    <section id="galeria" className="relative w-full bg-anthracite px-4 py-24">
      <div className="reveal-up mx-auto mb-16 max-w-[1400px] text-center">
        <h2 className="font-heading text-5xl font-bold tracking-tighter text-cream uppercase md:text-7xl">
          Műhely<span className="text-gold">titkok</span>
        </h2>
        <p className="mt-4 font-body text-cream/50">
          Vágások, hangulatok, és az eszközök amikkel dolgozunk.
        </p>
      </div>

      <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-2 md:gap-4 lg:grid-cols-3">
        {items.map((item, i) => (
          <figure
            key={item.id}
            className={`reveal-up stagger-${Math.min((i % 3) + 1, 3)} group relative aspect-[4/5] overflow-hidden`}
          >
            <Image
              src={item.url}
              alt={item.alt}
              fill
              sizes="(max-width: 1024px) 50vw, 33vw"
              className="object-cover opacity-70 grayscale transition-all duration-700 group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-anthracite opacity-20 transition-opacity group-hover:opacity-0" />
          </figure>
        ))}
      </div>
    </section>
  )
}
