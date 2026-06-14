import type { CollectionConfig } from 'payload'

export const Services: CollectionConfig = {
  slug: 'services',
  labels: {
    singular: 'Szolgáltatás',
    plural: 'Szolgáltatások',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'price', 'order'],
  },
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
      name: 'order',
      type: 'number',
      label: 'Sorrend',
      defaultValue: 0,
    },
    {
      name: 'highlighted',
      type: 'checkbox',
      label: 'Kiemelt csomag',
      defaultValue: false,
    },
  ],
  defaultSort: 'order',
}
