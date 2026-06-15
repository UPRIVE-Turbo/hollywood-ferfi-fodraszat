import 'dotenv/config'
import { getPayload, type Payload } from 'payload'
import config from './payload.config'

const RESET_IMAGES = process.argv.includes('--reset-images')

const MAP_EMBED_URL =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2668.6186980644365!2d20.781682115647565!3d48.10657927922099!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47409f2d129ea5b1%3A0xc3b8a3b8cd1adbe7!2sMiskolc%2C%20Andr%C3%A1ssy%20Gyula%20u.%203%2C%203530!5e0!3m2!1sen!2shu!4v1700000000000!5m2!1sen!2shu'

const services = [
  {
    name: 'Férfi Hajvágás',
    description:
      'Személyre szabott konzultáció, mosás, precíziós vágás ollóval és géppel, formázás prémium termékekkel. A te stílusodra alakítva.',
    price: '6 000 Ft',
    icon: 'scissors' as const,
    highlighted: false,
  },
  {
    name: 'Szakálligazítás',
    description:
      'Klasszikus forró törölközős puhítás, kontúrozás pengével, formára vágás és kondicionálás exkluzív szakállolajokkal.',
    price: '4 000 Ft',
    icon: 'razor' as const,
    highlighted: false,
  },
  {
    name: 'Kombinált Csomag',
    description:
      'A teljes körű megújulás. Teljes hajvágás, formázás, valamint komplett forró törölközős szakálligazítás egyben.',
    price: '9 000 Ft',
    icon: 'crown' as const,
    highlighted: true,
  },
]

const galleryImages = [
  {
    url: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=1200&q=80',
    alt: 'Hajvágó gép használat közben',
    filename: 'galeria-1.jpg',
  },
  {
    url: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1200&q=80',
    alt: 'Klasszikus borbély szék',
    filename: 'galeria-2.jpg',
  },
  {
    url: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=1200&q=80',
    alt: 'Precíz fade átmenet',
    filename: 'galeria-3.jpg',
  },
  {
    url: 'https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?auto=format&fit=crop&w=1200&q=80',
    alt: 'Borotva és eszközök',
    filename: 'galeria-4.jpg',
  },
  {
    url: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=1200&q=80',
    alt: 'Szakálligazítás',
    filename: 'galeria-5.jpg',
  },
  {
    url: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&w=1200&q=80',
    alt: 'Borbély szalon belső tér',
    filename: 'galeria-6.jpg',
  },
]

const HERO_IMAGE = {
  url: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=2000&q=80',
  alt: 'Borbély munka közben egy klasszikus szalonban',
  filename: 'hero-hatterkep.jpg',
}

const ABOUT_IMAGE = {
  url: 'https://images.unsplash.com/photo-1593702275687-f8b402bf1fb5?auto=format&fit=crop&w=1200&q=80',
  alt: 'Borbély szalon részlet, férfi hajvágás',
  filename: 'rolunk-kep.jpg',
}

async function downloadToMedia(
  payload: Payload,
  image: { url: string; alt: string; filename: string },
) {
  console.log(`  letöltés: ${image.filename}...`)
  const res = await fetch(image.url)
  if (!res.ok) {
    throw new Error(`Nem sikerült letölteni a képet (${image.url}): ${res.status}`)
  }
  const buffer = Buffer.from(await res.arrayBuffer())
  const mimetype = res.headers.get('content-type') || 'image/jpeg'

  return payload.create({
    collection: 'media',
    data: { alt: image.alt },
    file: {
      data: buffer,
      mimetype,
      name: image.filename,
      size: buffer.length,
    },
  })
}

function relationId(value: unknown): number | null {
  if (value === null || value === undefined) return null
  if (typeof value === 'object' && 'id' in (value as Record<string, unknown>)) {
    return Number((value as { id: string | number }).id)
  }
  return Number(value as string | number)
}

async function resetImages(payload: Payload) {
  console.log('Meglévő képek törlése (--reset-images)...')

  const [hero, about, settings, galleryResult] = await Promise.all([
    payload.findGlobal({ slug: 'hero' }),
    payload.findGlobal({ slug: 'about' }),
    payload.findGlobal({ slug: 'settings' }),
    payload.find({ collection: 'gallery', limit: 100 }),
  ])

  const mediaIdsToDelete = new Set<string | number>()

  const heroImageId = relationId(hero.backgroundImage)
  if (heroImageId) mediaIdsToDelete.add(heroImageId)

  const aboutImageId = relationId(about.image)
  if (aboutImageId) mediaIdsToDelete.add(aboutImageId)

  const metaImageId = relationId(settings.metaImage)
  if (metaImageId) mediaIdsToDelete.add(metaImageId)

  for (const doc of galleryResult.docs) {
    const imageId = relationId(doc.image)
    if (imageId) mediaIdsToDelete.add(imageId)
  }

  await Promise.all([
    payload.updateGlobal({ slug: 'hero', data: { backgroundImage: null } }),
    payload.updateGlobal({ slug: 'about', data: { image: null } }),
    payload.updateGlobal({ slug: 'settings', data: { metaImage: null } }),
  ])

  for (const doc of galleryResult.docs) {
    await payload.delete({ collection: 'gallery', id: doc.id })
  }

  for (const id of mediaIdsToDelete) {
    try {
      await payload.delete({ collection: 'media', id })
    } catch (err) {
      console.warn(`  nem sikerült törölni a media #${id} fájlt:`, (err as Error).message)
    }
  }

  console.log(
    `${mediaIdsToDelete.size} médiafájl és ${galleryResult.docs.length} galéria elem törölve.`,
  )
}

async function seedSettings(payload: Payload) {
  console.log('Beállítások (Settings) frissítése...')

  const settings = await payload.findGlobal({ slug: 'settings' })
  let metaImageId = relationId(settings.metaImage)

  if (!metaImageId) {
    const metaImage = await downloadToMedia(payload, {
      url: ABOUT_IMAGE.url,
      alt: 'Hollywood Férfi Fodrászat - megosztási kép',
      filename: 'og-kep.jpg',
    })
    metaImageId = metaImage.id
  }

  await payload.updateGlobal({
    slug: 'settings',
    data: {
      companyName: 'Hollywood Férfi Fodrászat',
      phone: '+36 30 978 4624',
      email: 'info@hollywoodferfifodraszat.hu',
      address: 'Andrássy Gyula u. 3-5 (D lépcsőház), Miskolc',
      facebook: 'https://www.facebook.com/hollywoodfodraszat',
      instagram: 'https://www.instagram.com/hollywoodferfifodraszat',
      mapEmbedUrl: MAP_EMBED_URL,
      openingHours: [
        { day: 'Hétfő - Péntek', hours: '09:00 - 19:00' },
        { day: 'Szombat', hours: '09:00 - 14:00' },
        { day: 'Vasárnap', hours: 'Zárva' },
      ],
      metaTitle: 'Hollywood Férfi Fodrászat — Miskolc',
      metaDescription:
        'Klasszikus stílus, profi kezekben. Férfi hajvágás és szakálligazítás Miskolc belvárosában.',
      metaImage: metaImageId,
    },
  })
}

async function seedHero(payload: Payload) {
  console.log('Hero szekció seedelése...')

  const hero = await payload.findGlobal({ slug: 'hero' })
  let backgroundImageId = relationId(hero.backgroundImage)

  if (!backgroundImageId) {
    const image = await downloadToMedia(payload, HERO_IMAGE)
    backgroundImageId = image.id
  }

  await payload.updateGlobal({
    slug: 'hero',
    data: {
      titleLine1: 'Hollywood',
      titleLine2: 'Férfi Fodrászat',
      subtitle:
        'Klasszikus stílus, profi kezekben. Hagyományos technikák és precizitás a modern kor úriembereinek.',
      ctaLabel: 'Időpontfoglalás',
      backgroundImage: backgroundImageId,
    },
  })
}

async function seedAbout(payload: Payload) {
  console.log('Rólunk szekció seedelése...')

  const about = await payload.findGlobal({ slug: 'about' })
  let imageId = relationId(about.image)

  if (!imageId) {
    const image = await downloadToMedia(payload, ABOUT_IMAGE)
    imageId = image.id
  }

  await payload.updateGlobal({
    slug: 'about',
    data: {
      eyebrow: 'A mesterségünk',
      headingLine1: 'Több, mint',
      headingLine2: 'egy hajvágás.',
      headingHighlight: 'Hagyomány.',
      paragraph1:
        'A Hollywood Férfi Fodrászatban nem futószalagon gyártjuk a frizurákat. Ide azért jössz, hogy kiszakadj a rohanásból, igyál egy jó kávét, és ránk bízd a megjelenésed.',
      paragraph2:
        'Borbélyaink szenvedéllyel és maximális precizitással dolgoznak. A klasszikus ollós vágástól a legmodernebb fade átmenetekig, és a hagyományos pengés borotválásig mindenben a legmagasabb minőséget nyújtjuk Miskolc belvárosában.',
      stat1Value: '10+',
      stat1Label: 'Év Tapasztalat',
      stat2Value: '100%',
      stat2Label: 'Férfi Környezet',
      image: imageId,
    },
  })
}

async function seedSiteContent(payload: Payload) {
  console.log('Oldal szövegek (SiteContent) seedelése...')

  await payload.updateGlobal({
    slug: 'site-content',
    data: {
      logoEyebrow: 'Est. Miskolc',
      logoText: 'HOLLYWOOD',
      navServicesLabel: 'Szolgáltatások',
      navAboutLabel: 'Rólunk',
      navGalleryLabel: 'Galéria',
      navContactLabel: 'Kapcsolat',
      navCtaLabel: 'Időpontfoglalás',
      servicesHeading: 'Szolgáltatások',
      servicesHighlightBadge: 'Gyakori választás',
      servicesPriceLabel: 'Ártól',
      galleryHeadingMain: 'Műhely',
      galleryHeadingHighlight: 'titkok',
      gallerySubtitle: 'Vágások, hangulatok, és az eszközök amikkel dolgozunk.',
      bookingHeadingLine1: 'Foglald le',
      bookingHeadingLine2: 'a',
      bookingHeadingHighlight: 'széked.',
      bookingDescription:
        'Ne várj a sorodra. Biztosítsd be az időpontod előre. Töltsd ki az adataidat, és a megadott számon felvesszük veled a kapcsolatot a pontosítás végett.',
      bookingCallLabel: 'Inkább hívnál?',
      bookingSuccessTitle: 'Köszönjük!',
      bookingSuccessMessage: 'Foglalásodat rögzítettük. Hamarosan visszahívunk a megerősítés miatt.',
      contactHeading: 'Információk',
      contactCityLabel: 'Miskolc',
      contactAddressLabel: 'Címünk',
      contactPhoneLabel: 'Telefonszám',
      contactHoursLabel: 'Nyitvatartás',
      footerBrandTitle: 'Hollywood',
      footerBrandSubtitle: 'Férfi Fodrászat • Miskolc',
      footerCopyright: '© 2026 Hollywood Férfi Fodrászat. Minden jog fenntartva.',
      footerFacebookLabel: 'Facebook',
      footerCtaLabel: 'Időpontfoglalás',
    },
  })
}

async function seedServices(payload: Payload) {
  console.log('Szolgáltatások (Services) seedelése...')

  const existing = await payload.find({ collection: 'services', limit: 100 })
  if (existing.docs.length > 0) {
    console.log('  szolgáltatások már léteznek, kihagyva.')
    return
  }

  for (const service of services) {
    await payload.create({ collection: 'services', data: service })
  }
  console.log(`  ${services.length} szolgáltatás létrehozva.`)
}

async function seedGallery(payload: Payload) {
  console.log('Galéria seedelése...')

  const existing = await payload.find({ collection: 'gallery', limit: 100 })
  if (existing.docs.length > 0) {
    console.log('  galéria elemek már léteznek, kihagyva.')
    return
  }

  for (const item of galleryImages) {
    const media = await downloadToMedia(payload, item)
    await payload.create({
      collection: 'gallery',
      data: { image: media.id, alt: item.alt },
    })
  }
  console.log(`  ${galleryImages.length} galéria elem létrehozva.`)
}

async function seed() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  if (RESET_IMAGES) {
    await resetImages(payload)
  }

  await seedSettings(payload)
  await seedHero(payload)
  await seedAbout(payload)
  await seedSiteContent(payload)
  await seedServices(payload)
  await seedGallery(payload)

  console.log('Seed kész.')
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err)
    process.exitCode = 1
    process.exit(1)
  })
