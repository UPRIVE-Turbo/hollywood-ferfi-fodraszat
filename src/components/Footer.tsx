import type { SiteContent } from '@/payload-types'

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M22 12.06C22 6.51 17.52 2 12 2S2 6.51 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.45 2.91h-2.33V22c4.78-.79 8.44-4.94 8.44-9.94Z" />
    </svg>
  )
}

export function Footer({
  address,
  phone,
  facebook,
  content,
}: {
  address: string
  phone: string
  facebook?: string | null
  content: SiteContent
}) {
  const brandTitle = content.footerBrandTitle || 'Hollywood'
  const brandSubtitle = content.footerBrandSubtitle || 'Férfi Fodrászat • Miskolc'
  const copyrightText = content.footerCopyright || '© 2026 Hollywood Férfi Fodrászat. Minden jog fenntartva.'
  const facebookLabel = content.footerFacebookLabel || 'Facebook'
  const ctaLabel = content.footerCtaLabel || 'Időpontfoglalás'

  return (
    <footer className="w-full border-t border-black/50 bg-[#1a1d20] px-4 pt-20 pb-8">
      <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-10 md:flex-row">
        <div className="text-center md:text-left">
          <h2 className="cursor-default font-heading text-4xl font-bold leading-none tracking-tighter text-cream uppercase opacity-50 transition-opacity duration-500 hover:opacity-100 md:text-6xl">
            {brandTitle}
          </h2>
          <p className="mt-2 font-heading text-xs tracking-[0.3em] text-gold/50 uppercase">
            {brandSubtitle}
          </p>
        </div>

        <div className="flex flex-col items-center gap-8 md:flex-row md:gap-16">
          {facebook && (
            <a
              href={facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 text-cream/60 transition-colors hover:text-gold"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/20 transition-all duration-300 group-hover:border-gold group-hover:scale-110">
                <FacebookIcon className="h-5 w-5" />
              </div>
              <span className="font-heading text-xs tracking-widest uppercase">{facebookLabel}</span>
            </a>
          )}

          <a
            href="#idopont"
            className="border-b border-gold pb-1 font-heading text-sm tracking-widest text-cream uppercase transition-colors hover:text-gold"
          >
            {ctaLabel}
          </a>
        </div>
      </div>

      <div className="mx-auto mt-20 flex max-w-[1400px] flex-col items-center justify-between gap-4 border-t border-cream/5 pt-8 text-center md:flex-row md:text-left">
        <p className="font-body text-xs tracking-widest text-cream/30 uppercase">{copyrightText}</p>
        <p className="font-body text-xs tracking-widest text-cream/30 uppercase">{address}</p>
        <a href={`tel:${phone.replace(/\s+/g, '')}`} className="sr-only">
          {phone}
        </a>
      </div>
    </footer>
  )
}
