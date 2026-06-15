import type { GlobalConfig } from 'payload'

export const SiteContent: GlobalConfig = {
  slug: 'site-content',
  label: 'Oldal szövegei',
  admin: {
    group: 'Tartalom',
    description: 'A fejléc, illetve a szolgáltatások, galéria, foglalás, kapcsolat és lábláb szekciók apró szövegei.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Fejléc',
          fields: [
            {
              name: 'logoEyebrow',
              type: 'text',
              label: 'Logó felirat',
              defaultValue: 'Est. Miskolc',
              required: true,
            },
            {
              name: 'logoText',
              type: 'text',
              label: 'Logó szöveg',
              defaultValue: 'HOLLYWOOD',
              required: true,
            },
            {
              name: 'navServicesLabel',
              type: 'text',
              label: 'Menü - Szolgáltatások',
              defaultValue: 'Szolgáltatások',
              required: true,
            },
            {
              name: 'navAboutLabel',
              type: 'text',
              label: 'Menü - Rólunk',
              defaultValue: 'Rólunk',
              required: true,
            },
            {
              name: 'navGalleryLabel',
              type: 'text',
              label: 'Menü - Galéria',
              defaultValue: 'Galéria',
              required: true,
            },
            {
              name: 'navContactLabel',
              type: 'text',
              label: 'Menü - Kapcsolat',
              defaultValue: 'Kapcsolat',
              required: true,
            },
            {
              name: 'navCtaLabel',
              type: 'text',
              label: 'Menü - CTA gomb',
              defaultValue: 'Időpontfoglalás',
              required: true,
            },
          ],
        },
        {
          label: 'Szolgáltatások',
          fields: [
            {
              name: 'servicesHeading',
              type: 'text',
              label: 'Szekció címe',
              defaultValue: 'Szolgáltatások',
              required: true,
            },
            {
              name: 'servicesHighlightBadge',
              type: 'text',
              label: 'Kiemelt csomag jelölő',
              defaultValue: 'Gyakori választás',
              required: true,
            },
            {
              name: 'servicesPriceLabel',
              type: 'text',
              label: 'Ár felirat',
              defaultValue: 'Ártól',
              required: true,
            },
          ],
        },
        {
          label: 'Galéria',
          fields: [
            {
              name: 'galleryHeadingMain',
              type: 'text',
              label: 'Cím - normál rész',
              defaultValue: 'Műhely',
              required: true,
            },
            {
              name: 'galleryHeadingHighlight',
              type: 'text',
              label: 'Cím - kiemelt rész',
              defaultValue: 'titkok',
              required: true,
            },
            {
              name: 'gallerySubtitle',
              type: 'text',
              label: 'Alcím',
              defaultValue: 'Vágások, hangulatok, és az eszközök amikkel dolgozunk.',
              required: true,
            },
          ],
        },
        {
          label: 'Foglalás',
          fields: [
            {
              name: 'bookingHeadingLine1',
              type: 'text',
              label: 'Cím - 1. sor',
              defaultValue: 'Foglald le',
              required: true,
            },
            {
              name: 'bookingHeadingLine2',
              type: 'text',
              label: 'Cím - 2. sor',
              defaultValue: 'a',
              required: true,
            },
            {
              name: 'bookingHeadingHighlight',
              type: 'text',
              label: 'Cím - kiemelt rész',
              defaultValue: 'széked.',
              required: true,
            },
            {
              name: 'bookingDescription',
              type: 'textarea',
              label: 'Leírás',
              defaultValue:
                'Ne várj a sorodra. Biztosítsd be az időpontod előre. Töltsd ki az adataidat, és a megadott számon felvesszük veled a kapcsolatot a pontosítás végett.',
              required: true,
            },
            {
              name: 'bookingCallLabel',
              type: 'text',
              label: 'Telefonos felirat',
              defaultValue: 'Inkább hívnál?',
              required: true,
            },
            {
              name: 'bookingSuccessTitle',
              type: 'text',
              label: 'Sikeres beküldés - cím',
              defaultValue: 'Köszönjük!',
              required: true,
            },
            {
              name: 'bookingSuccessMessage',
              type: 'textarea',
              label: 'Sikeres beküldés - üzenet',
              defaultValue: 'Foglalásodat rögzítettük. Hamarosan visszahívunk a megerősítés miatt.',
              required: true,
            },
          ],
        },
        {
          label: 'Kapcsolat',
          fields: [
            {
              name: 'contactHeading',
              type: 'text',
              label: 'Szekció címe',
              defaultValue: 'Információk',
              required: true,
            },
            {
              name: 'contactCityLabel',
              type: 'text',
              label: 'Város felirat',
              defaultValue: 'Miskolc',
              required: true,
            },
            {
              name: 'contactAddressLabel',
              type: 'text',
              label: 'Cím felirat',
              defaultValue: 'Címünk',
              required: true,
            },
            {
              name: 'contactPhoneLabel',
              type: 'text',
              label: 'Telefon felirat',
              defaultValue: 'Telefonszám',
              required: true,
            },
            {
              name: 'contactHoursLabel',
              type: 'text',
              label: 'Nyitvatartás felirat',
              defaultValue: 'Nyitvatartás',
              required: true,
            },
          ],
        },
        {
          label: 'Lábláb',
          fields: [
            {
              name: 'footerBrandTitle',
              type: 'text',
              label: 'Márkanév',
              defaultValue: 'Hollywood',
              required: true,
            },
            {
              name: 'footerBrandSubtitle',
              type: 'text',
              label: 'Márka alcím',
              defaultValue: 'Férfi Fodrászat • Miskolc',
              required: true,
            },
            {
              name: 'footerCopyright',
              type: 'text',
              label: 'Copyright szöveg',
              defaultValue: '© 2026 Hollywood Férfi Fodrászat. Minden jog fenntartva.',
              required: true,
            },
            {
              name: 'footerFacebookLabel',
              type: 'text',
              label: 'Facebook link felirat',
              defaultValue: 'Facebook',
              required: true,
            },
            {
              name: 'footerCtaLabel',
              type: 'text',
              label: 'CTA link felirat',
              defaultValue: 'Időpontfoglalás',
              required: true,
            },
          ],
        },
      ],
    },
  ],
}
