import type { GlobalConfig } from 'payload'

export const About: GlobalConfig = {
  slug: 'about',
  label: 'Rólunk szekció',
  admin: {
    group: 'Tartalom',
    description: 'A "Rólunk" szekció szövegei, statisztikái és képe.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      label: 'Felirat a cím felett',
      defaultValue: 'A mesterségünk',
      required: true,
    },
    {
      name: 'headingLine1',
      type: 'text',
      label: 'Cím - 1. sor',
      defaultValue: 'Több, mint',
      required: true,
    },
    {
      name: 'headingLine2',
      type: 'text',
      label: 'Cím - 2. sor',
      defaultValue: 'egy hajvágás.',
      required: true,
    },
    {
      name: 'headingHighlight',
      type: 'text',
      label: 'Cím - kiemelt sor',
      defaultValue: 'Hagyomány.',
      required: true,
    },
    {
      name: 'paragraph1',
      type: 'textarea',
      label: '1. bekezdés',
      defaultValue:
        'A Hollywood Férfi Fodrászatban nem futószalagon gyártjuk a frizurákat. Ide azért jössz, hogy kiszakadj a rohanásból, igyál egy jó kávét, és ránk bízd a megjelenésed.',
      required: true,
    },
    {
      name: 'paragraph2',
      type: 'textarea',
      label: '2. bekezdés',
      defaultValue:
        'Borbélyaink szenvedéllyel és maximális precizitással dolgoznak. A klasszikus ollós vágástól a legmodernebb fade átmenetekig, és a hagyományos pengés borotválásig mindenben a legmagasabb minőséget nyújtjuk Miskolc belvárosában.',
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Kép',
      admin: {
        description: 'Ha nincs kiválasztva, az alapértelmezett szalon fotó jelenik meg.',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'stat1Value',
          type: 'text',
          label: '1. statisztika érték',
          defaultValue: '10+',
          required: true,
        },
        {
          name: 'stat1Label',
          type: 'text',
          label: '1. statisztika felirat',
          defaultValue: 'Év Tapasztalat',
          required: true,
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'stat2Value',
          type: 'text',
          label: '2. statisztika érték',
          defaultValue: '100%',
          required: true,
        },
        {
          name: 'stat2Label',
          type: 'text',
          label: '2. statisztika felirat',
          defaultValue: 'Férfi Környezet',
          required: true,
        },
      ],
    },
  ],
}
