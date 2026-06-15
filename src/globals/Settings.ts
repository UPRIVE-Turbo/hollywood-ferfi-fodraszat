import type { GlobalConfig } from 'payload'

export const Settings: GlobalConfig = {
  slug: 'settings',
  label: 'Beállítások',
  admin: {
    group: 'Beállítások',
    description: 'Cégadatok, elérhetőségek, nyitvatartás és közösségi linkek.',
  },
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
    {
      type: 'collapsible',
      label: 'SEO',
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
          label: 'Meta cím',
          defaultValue: 'Hollywood Férfi Fodrászat — Miskolc',
          admin: {
            description: 'A böngésző fülén és a keresőkben megjelenő cím.',
          },
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          label: 'Meta leírás',
          defaultValue:
            'Klasszikus stílus, profi kezekben. Férfi hajvágás és szakálligazítás Miskolc belvárosában.',
          admin: {
            description: 'Rövid leírás a keresőtalálatokhoz és közösségi megosztásokhoz.',
          },
        },
        {
          name: 'metaImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Megosztási kép (OG kép)',
        },
      ],
    },
  ],
}
