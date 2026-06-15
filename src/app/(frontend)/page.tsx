import { getPayload } from 'payload'
import config from '@/payload.config'

import { SiteHeader } from '@/components/SiteHeader'
import { Hero } from '@/components/Hero'
import { Services } from '@/components/Services'
import { About } from '@/components/About'
import { Gallery } from '@/components/Gallery'
import { BookingForm } from '@/components/BookingForm'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'
import { ScrollReveal } from '@/components/ScrollReveal'

const DEFAULT_OPENING_HOURS = [
  { day: 'Hétfő - Péntek', hours: '09:00 - 19:00' },
  { day: 'Szombat', hours: '09:00 - 14:00' },
  { day: 'Vasárnap', hours: 'Zárva' },
]

const DEFAULT_MAP_EMBED =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2668.6186980644365!2d20.781682115647565!3d48.10657927922099!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47409f2d129ea5b1%3A0xc3b8a3b8cd1adbe7!2sMiskolc%2C%20Andr%C3%A1ssy%20Gyula%20u.%203%2C%203530!5e0!3m2!1sen!2shu!4v1700000000000!5m2!1sen!2shu'

export default async function HomePage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const [settings, hero, about, siteContent, servicesResult, galleryResult] = await Promise.all([
    payload.findGlobal({ slug: 'settings' }),
    payload.findGlobal({ slug: 'hero' }),
    payload.findGlobal({ slug: 'about' }),
    payload.findGlobal({ slug: 'site-content' }),
    payload.find({ collection: 'services', sort: '_order', limit: 100 }),
    payload.find({ collection: 'gallery', sort: '_order', limit: 100, depth: 1 }),
  ])

  const phone = settings.phone || '+36 30 978 4624'
  const address = settings.address || 'Andrássy Gyula u. 3-5 (D lépcsőház), Miskolc'
  const facebook = settings.facebook || 'https://www.facebook.com/hollywoodfodraszat'
  const openingHours =
    settings.openingHours && settings.openingHours.length > 0
      ? settings.openingHours
      : DEFAULT_OPENING_HOURS
  const mapEmbedUrl = settings.mapEmbedUrl || DEFAULT_MAP_EMBED

  const heroBackgroundImage =
    typeof hero.backgroundImage === 'object' && hero.backgroundImage?.url
      ? hero.backgroundImage.url
      : null

  const aboutImage =
    typeof about.image === 'object' && about.image?.url ? about.image.url : null

  const services = servicesResult.docs.map((doc) => ({
    id: String(doc.id),
    name: doc.name,
    description: doc.description,
    price: doc.price,
    icon: doc.icon,
    highlighted: doc.highlighted,
  }))

  const galleryImages = galleryResult.docs
    .map((doc) => {
      const media = typeof doc.image === 'object' ? doc.image : null
      if (!media?.url) return null
      return {
        id: String(doc.id),
        url: media.url,
        alt: doc.alt,
      }
    })
    .filter((img): img is { id: string; url: string; alt: string } => img !== null)

  return (
    <div className="overflow-x-hidden">
      <ScrollReveal />
      <SiteHeader content={siteContent} />
      <Hero address={address} hero={hero} backgroundImage={heroBackgroundImage} />
      <Services services={services} content={siteContent} />
      <About about={about} image={aboutImage} />
      <Gallery images={galleryImages} content={siteContent} />
      <BookingForm phone={phone} services={services} content={siteContent} />
      <Contact
        address={address}
        phone={phone}
        openingHours={openingHours}
        mapEmbedUrl={mapEmbedUrl}
        content={siteContent}
      />
      <Footer address={address} phone={phone} facebook={facebook} content={siteContent} />
    </div>
  )
}

export const dynamic = 'force-dynamic'