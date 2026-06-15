import { Clock, MapPin, Phone } from 'lucide-react'
import type { SiteContent } from '@/payload-types'

export type OpeningHour = {
  day: string
  hours: string
}

export function Contact({
  address,
  phone,
  openingHours,
  mapEmbedUrl,
  content,
}: {
  address: string
  phone: string
  openingHours: OpeningHour[]
  mapEmbedUrl: string
  content: SiteContent
}) {
  const telLink = `tel:${phone.replace(/\s+/g, '')}`
  const heading = content.contactHeading || 'Információk'
  const cityLabel = content.contactCityLabel || 'Miskolc'
  const addressLabel = content.contactAddressLabel || 'Címünk'
  const phoneLabel = content.contactPhoneLabel || 'Telefonszám'
  const hoursLabel = content.contactHoursLabel || 'Nyitvatartás'

  return (
    <section id="kapcsolat" className="flex w-full flex-col border-t border-cream/10 bg-anthracite md:flex-row">
      <div className="relative h-[50vh] w-full md:h-auto md:min-h-[500px] md:w-1/2">
        <iframe
          src={mapEmbedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="map-filter absolute inset-0"
          title="Térkép - Hollywood Férfi Fodrászat"
        />
        <div className="absolute inset-0 hidden shadow-[inset_0_0_50px_rgba(34,38,42,1)] md:block" />
      </div>

      <div className="flex w-full flex-col justify-center p-12 md:w-1/2 lg:p-24">
        <h2 className="reveal-up relative mb-12 inline-block font-heading text-5xl font-bold tracking-tighter text-cream uppercase">
          {heading}
          <span className="absolute -bottom-4 left-0 h-1 w-24 bg-gold" />
        </h2>

        <div className="space-y-12">
          <div className="reveal-up stagger-1 flex items-start gap-6">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-gold/30 bg-cream/5">
              <MapPin className="h-6 w-6 text-gold" />
            </div>
            <div>
              <h4 className="mb-2 font-heading text-sm tracking-widest text-gold uppercase">
                {addressLabel}
              </h4>
              <p className="mb-1 font-heading text-2xl text-cream uppercase">{cityLabel}</p>
              <p className="font-body text-lg text-cream/70">{address}</p>
            </div>
          </div>

          <div className="reveal-up stagger-2 flex items-start gap-6">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-gold/30 bg-cream/5">
              <Phone className="h-6 w-6 text-gold" />
            </div>
            <div>
              <h4 className="mb-2 font-heading text-sm tracking-widest text-gold uppercase">
                {phoneLabel}
              </h4>
              <a
                href={telLink}
                className="font-heading text-2xl text-cream uppercase transition-colors hover:text-gold"
              >
                {phone}
              </a>
            </div>
          </div>

          <div className="reveal-up stagger-3 flex items-start gap-6">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-gold/30 bg-cream/5">
              <Clock className="h-6 w-6 text-gold" />
            </div>
            <div className="w-full max-w-[300px]">
              <h4 className="mb-4 font-heading text-sm tracking-widest text-gold uppercase">
                {hoursLabel}
              </h4>
              {openingHours.map((item) => (
                <div
                  key={item.day}
                  className="flex items-center justify-between border-b border-cream/10 py-2 font-body text-cream/70 last:border-0"
                >
                  <span>{item.day}</span>
                  <span className="font-bold text-cream">{item.hours}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
