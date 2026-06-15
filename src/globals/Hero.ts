import type { GlobalConfig } from 'payload'

export const Hero: GlobalConfig = {
  slug: 'hero',
  label: 'Hero szekció',
  admin: {
    group: 'Tartalom',
    description: 'A főoldal legfelső, teljes képernyős szekciójának szövegei és háttérképe.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'titleLine1',
      type: 'text',
      label: 'Cím - 1. sor',
      defaultValue: 'Hollywood',
      required: true,
    },
    {
      name: 'titleLine2',
      type: 'text',
      label: 'Cím - 2. sor (kiemelt)',
      defaultValue: 'Férfi Fodrászat',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'textarea',
      label: 'Alcím / szlogen',
      defaultValue:
        'Klasszikus stílus, profi kezekben. Hagyományos technikák és precizitás a modern kor úriembereinek.',
      required: true,
    },
    {
      name: 'ctaLabel',
      type: 'text',
      label: 'Gomb felirata',
      defaultValue: 'Időpontfoglalás',
      required: true,
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Háttérkép',
      admin: {
        description: 'Ha nincs kiválasztva, az alapértelmezett borbély fotó jelenik meg.',
      },
    },
  ],
}
