import type { CollectionConfig } from 'payload'

export const Services: CollectionConfig = {
  slug: 'services',
  labels: {
    singular: 'Szolgáltatás',
    plural: 'Szolgáltatások',
  },
  admin: {
    group: 'Tartalom',
    useAsTitle: 'name',
    defaultColumns: ['name', 'price', 'highlighted'],
    description: 'A főoldal "Szolgáltatások" szekciójának kártyái. Sorrend: húzd-dobd az admin listában.',
  },
  orderable: true,
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Név',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Leírás',
      required: true,
    },
    {
      name: 'price',
      type: 'text',
      label: 'Ár',
      required: true,
    },
    {
      name: 'icon',
      type: 'select',
      label: 'Ikon',
      defaultValue: 'scissors',
      options: [
        { label: 'Olló', value: 'scissors' },
        { label: 'Borotva', value: 'razor' },
        { label: 'Korona', value: 'crown' },
      ],
    },
    {
      name: 'highlighted',
      type: 'checkbox',
      label: 'Kiemelt csomag',
      defaultValue: false,
      admin: {
        description: 'Kiemelten, aranykerettel jelenik meg a "Gyakori választás" jelöléssel.',
      },
    },
  ],
  defaultSort: '_order',
}
