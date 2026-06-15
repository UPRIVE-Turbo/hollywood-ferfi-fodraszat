'use client'

import { useActionState } from 'react'
import { ChevronDown, PhoneCall } from 'lucide-react'
import { submitBooking, type BookingFormState } from '@/app/(frontend)/actions'
import type { SiteContent } from '@/payload-types'

const initialState: BookingFormState = { success: false }

export function BookingForm({
  phone,
  services,
  content,
}: {
  phone: string
  services: { id: string; name: string }[]
  content: SiteContent
}) {
  const [state, formAction, isPending] = useActionState(submitBooking, initialState)
  const telLink = `tel:${phone.replace(/\s+/g, '')}`

  const headingLine1 = content.bookingHeadingLine1 || 'Foglald le'
  const headingLine2 = content.bookingHeadingLine2 || 'a'
  const headingHighlight = content.bookingHeadingHighlight || 'széked.'
  const description =
    content.bookingDescription ||
    'Ne várj a sorodra. Biztosítsd be az időpontod előre. Töltsd ki az adataidat, és a megadott számon felvesszük veled a kapcsolatot a pontosítás végett.'
  const callLabel = content.bookingCallLabel || 'Inkább hívnál?'
  const successTitle = content.bookingSuccessTitle || 'Köszönjük!'
  const successMessage =
    content.bookingSuccessMessage ||
    'Foglalásodat rögzítettük. Hamarosan visszahívunk a megerősítés miatt.'

  return (
    <section id="idopont" className="w-full bg-cream px-4 py-24 md:py-40">
      <div className="mx-auto block max-w-[1400px] items-start gap-16 lg:grid lg:grid-cols-12">
        <div className="reveal-up mb-12 lg:col-span-5 lg:mb-0">
          <h2 className="mb-8 font-heading text-5xl leading-[0.9] font-bold tracking-tighter text-anthracite uppercase md:text-7xl">
            {headingLine1} <br />
            {headingLine2} <span className="text-gold">{headingHighlight}</span>
          </h2>
          <p className="mb-8 max-w-md font-body text-lg text-darkgray/70">{description}</p>
          <div className="flex items-center gap-4 text-anthracite">
            <PhoneCall className="h-8 w-8 text-gold" />
            <div>
              <p className="mb-1 font-body text-xs tracking-widest text-darkgray/50 uppercase">
                {callLabel}
              </p>
              <a
                href={telLink}
                className="font-heading text-2xl font-bold transition-colors hover:text-gold"
              >
                {phone}
              </a>
            </div>
          </div>
        </div>

        <div className="reveal-up stagger-1 border-t-4 border-gold bg-anthracite p-8 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] md:p-12 lg:col-span-7">
          {state.success ? (
            <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
              <h3 className="mb-4 font-heading text-3xl font-bold text-gold uppercase">
                {successTitle}
              </h3>
              <p className="font-body text-cream/80">{successMessage}</p>
            </div>
          ) : (
            <form action={formAction} className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="mb-2 block font-heading text-xs tracking-widest text-gold uppercase">
                  Teljes Név
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Pl: Kovács Péter"
                  className="w-full border-b border-cream/20 bg-transparent py-3 font-body text-cream placeholder-cream/30 outline-none transition-colors focus:border-gold"
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block font-heading text-xs tracking-widest text-gold uppercase">
                  Telefonszám
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="+36 30 123 4567"
                  className="w-full border-b border-cream/20 bg-transparent py-3 font-body text-cream placeholder-cream/30 outline-none transition-colors focus:border-gold"
                />
              </div>

              <div className="relative">
                <label className="mb-2 block font-heading text-xs tracking-widest text-gold uppercase">
                  Szolgáltatás
                </label>
                <div className="relative">
                  <select
                    name="service"
                    defaultValue=""
                    className="w-full cursor-pointer appearance-none border-b border-cream/20 bg-transparent py-3 font-body text-cream outline-none transition-colors focus:border-gold"
                  >
                    <option value="" disabled className="bg-anthracite text-cream/50">
                      Válassz...
                    </option>
                    {services.map((service) => (
                      <option key={service.id} value={service.name} className="bg-anthracite text-cream">
                        {service.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute top-1/2 right-0 h-4 w-4 -translate-y-1/2 text-cream/50" />
                </div>
              </div>

              <div>
                <label className="mb-2 block font-heading text-xs tracking-widest text-gold uppercase">
                  Preferált Dátum
                </label>
                <input
                  type="date"
                  name="preferredDate"
                  className="w-full border-b border-cream/20 bg-transparent py-3 font-body text-cream outline-none transition-colors [color-scheme:dark] focus:border-gold"
                />
              </div>

              {state.error && (
                <p className="md:col-span-2 font-body text-sm text-red-400">{state.error}</p>
              )}

              <div className="mt-6 md:col-span-2">
                <button
                  type="submit"
                  disabled={isPending}
                  className="group relative inline-flex w-full items-center justify-center overflow-hidden bg-gold px-10 py-5 font-heading text-lg font-bold tracking-[0.2em] text-anthracite uppercase transition-transform active:scale-[0.98] disabled:opacity-60"
                >
                  <span className="absolute inset-0 h-full w-full -translate-x-full bg-cream transition-transform duration-500 ease-out group-hover:translate-x-0" />
                  <span className="relative z-10 transition-colors group-hover:text-anthracite">
                    {isPending ? 'Küldés...' : 'Foglalok időpontot'}
                  </span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
