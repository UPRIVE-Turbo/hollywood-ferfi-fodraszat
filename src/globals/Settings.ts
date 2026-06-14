import type { GlobalConfig } from 'payload'

export const Settings: GlobalConfig = {
  slug: 'settings',
  label: 'Beállítások',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'companyName',
      type: 'text',
      label: 'Cégnév',
      defaultValue: 'Hollywood Férfi Fodrászat',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Telefonszám',
      defaultValue: '+36 30 978 4624',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      label: 'E-mail',
    },
    {
      name: 'address',
      type: 'text',
      label: 'Cím',
      defaultValue: 'Andrássy Gyula u. 3-5 (D lépcsőház), Miskolc',
      required: true,
    },
    {
      name: 'openingHours',
      type: 'array',
      label: 'Nyitvatartás',
      fields: [
        {
          name: 'day',
          type: 'text',
          label: 'Nap',
          required: true,
        },
        {
          name: 'hours',
          type: 'text',
          label: 'Órák',
          required: true,
        },
      ],
    },
    {
      name: 'facebook',
      type: 'text',
      label: 'Facebook URL',
      defaultValue: 'https://www.facebook.com/hollywoodfodraszat',
    },
    {
      name: 'instagram',
      type: 'text',
      label: 'Instagram URL',
    },
    {
      name: 'mapEmbedUrl',
      type: 'text',
      label: 'Google Maps embed URL',
    },
  ],
}
