import 'dotenv/config'
import { getPayload } from 'payload'
import config from './payload.config'

const services: Array<{
  name: string
  description: string
  price: string
  icon: 'scissors' | 'razor' | 'crown'
  order: number
  highlighted: boolean
}> = [
  {
    name: 'Férfi Hajvágás',
    description:
      'Személyre szabott konzultáció, mosás, precíziós vágás ollóval és géppel, formázás prémium termékekkel. A te stílusodra alakítva.',
    price: '6 000 Ft',
    icon: 'scissors',
    order: 1,
    highlighted: false,
  },
  {
    name: 'Szakálligazítás',
    description:
      'Klasszikus forró törölközős puhítás, kontúrozás pengével, formára vágás és kondicionálás exkluzív szakállolajokkal.',
    price: '4 000 Ft',
    icon: 'razor',
    order: 2,
    highlighted: false,
  },
  {
    name: 'Kombinált Csomag',
    description:
      'A teljes körű megújulás. Teljes hajvágás, formázás, valamint komplett forró törölközős szakálligazítás egyben.',
    price: '9 000 Ft',
    icon: 'crown',
    order: 3,
    highlighted: true,
  },
]

async function seed() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  console.log('Beállítások (Settings) frissítése...')
  await payload.updateGlobal({
    slug: 'settings',
    data: {
      companyName: 'Hollywood Férfi Fodrászat',
      phone: '+36 30 978 4624',
      address: 'Andrássy Gyula u. 3-5 (D lépcsőház), Miskolc',
      facebook: 'https://www.facebook.com/hollywoodfodraszat',
      openingHours: [
        { day: 'Hétfő - Péntek', hours: '09:00 - 19:00' },
        { day: 'Szombat', hours: '09:00 - 14:00' },
        { day: 'Vasárnap', hours: 'Zárva' },
      ],
    },
  })

  console.log('Szolgáltatások (Services) seedelése...')
  const existing = await payload.find({ collection: 'services', limit: 100 })
  if (existing.docs.length === 0) {
    for (const service of services) {
      await payload.create({ collection: 'services', data: service })
    }
    console.log(`${services.length} szolgáltatás létrehozva.`)
  } else {
    console.log('Szolgáltatások már léteznek, kihagyva.')
  }

  console.log('Seed kész.')
  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
