import type { CollectionConfig } from 'payload'

export const Gallery: CollectionConfig = {
  slug: 'gallery',
  labels: {
    singular: 'Galéria kép',
    plural: 'Galéria',
  },
  admin: {
    group: 'Tartalom',
    useAsTitle: 'alt',
    defaultColumns: ['image', 'alt'],
    description: 'A "Műhelytitkok" galéria szekció képei. Sorrend: húzd-dobd az admin listában.',
  },
  orderable: true,
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Kép',
      required: true,
    },
    {
      name: 'alt',
      type: 'text',
      label: 'Alt szöveg',
      required: true,
      admin: {
        description: 'Rövid leírás a képről (kereshetőség és akadálymentesség miatt).',
      },
    },
  ],
  defaultSort: '_order',
}
