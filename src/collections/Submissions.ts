import type { CollectionConfig } from 'payload'

export const Submissions: CollectionConfig = {
  slug: 'submissions',
  labels: {
    singular: 'Beküldés',
    plural: 'Időpontfoglalások',
  },
  admin: {
    group: 'Megkeresések',
    useAsTitle: 'name',
    defaultColumns: ['name', 'phone', 'service', 'preferredDate', 'createdAt'],
    description: 'Az időpontfoglalási űrlapon beérkezett megkeresések.',
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => false,
    delete: () => false,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Név',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Telefonszám',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      label: 'E-mail',
    },
    {
      name: 'service',
      type: 'text',
      label: 'Szolgáltatás',
    },
    {
      name: 'preferredDate',
      type: 'text',
      label: 'Kívánt időpont',
    },
    {
      name: 'message',
      type: 'textarea',
      label: 'Üzenet',
    },
  ],
}
