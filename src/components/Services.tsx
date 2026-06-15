import { Crown, Scissors, Sparkles } from 'lucide-react'
import type { SiteContent } from '@/payload-types'

export type Service = {
  id: string
  name: string
  description: string
  price: string
  icon?: string | null
  highlighted?: boolean | null
}

const icons: Record<string, React.ComponentType<{ className?: string }>> = {
  scissors: Scissors,
  razor: Sparkles,
  crown: Crown,
}

export function Services({ services, content }: { services: Service[]; content: SiteContent }) {
  const heading = content.servicesHeading || 'Szolgáltatások'
  const highlightBadge = content.servicesHighlightBadge || 'Gyakori választás'
  const priceLabel = content.servicesPriceLabel || 'Ártól'

  return (
    <section id="szolgaltatasok" className="relative z-10 w-full bg-cream px-4 py-24 md:py-40">
      <div className="reveal-up mx-auto mb-20 flex max-w-[1400px] items-center gap-6">
        <h2 className="shrink-0 font-heading text-5xl font-bold tracking-tighter text-anthracite uppercase md:text-7xl">
          {heading}
        </h2>
        <div className="h-[1px] flex-1 bg-anthracite/20" />
      </div>

      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service, i) => {
          const Icon = icons[service.icon ?? 'scissors'] ?? Scissors
          return (
            <article
              key={service.id}
              className={`reveal-up stagger-${Math.min(i + 1, 3)} group relative flex h-full flex-col overflow-hidden bg-anthracite p-10 transition-transform duration-500 hover:-translate-y-2 md:p-14 ${
                service.highlighted ? 'shadow-gold-glow ring-1 ring-gold' : ''
              }`}
            >
              {service.highlighted && (
                <div
                  aria-hidden
                  className="absolute inset-0 z-0 bg-gold/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
              )}
              <div
                className={`absolute top-0 right-0 p-8 transition-colors duration-500 ${
                  service.highlighted ? 'text-gold/20 group-hover:text-gold/40' : 'text-gold/10 group-hover:text-gold/20'
                }`}
              >
                <Icon className="h-20 w-20" />
              </div>

              {service.highlighted && (
                <div className="relative z-10 mb-6 w-fit bg-gold px-3 py-1 font-heading text-xs font-bold tracking-widest text-anthracite uppercase">
                  {highlightBadge}
                </div>
              )}

              <h3
                className={`relative z-10 mb-4 font-heading text-3xl font-bold text-cream uppercase ${
                  !service.highlighted ? 'transition-colors group-hover:text-gold' : ''
                }`}
              >
                {service.name}
              </h3>
              <p className="relative z-10 mb-auto leading-relaxed font-body text-cream/60">
                {service.description}
              </p>

              <div
                className={`relative z-10 mt-12 flex items-end justify-between border-t pt-6 transition-colors ${
                  service.highlighted ? 'border-gold/30' : 'border-cream/10 group-hover:border-gold/30'
                }`}
              >
                <span className="font-heading text-lg tracking-widest text-gold uppercase">{priceLabel}</span>
                <span
                  className={`font-heading text-3xl font-bold drop-shadow-md ${
                    service.highlighted ? 'text-gold' : 'text-cream'
                  }`}
                >
                  {service.price}
                </span>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
