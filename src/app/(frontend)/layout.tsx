import React from 'react'
import type { Metadata } from 'next'
import { Oswald, Roboto } from 'next/font/google'
import { getPayload } from 'payload'
import config from '@/payload.config'
import './styles.css'

const oswald = Oswald({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '700'],
  variable: '--font-oswald',
  display: 'swap',
})

const roboto = Roboto({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-roboto',
  display: 'swap',
})

const DEFAULT_TITLE = 'Hollywood Férfi Fodrászat — Miskolc'
const DEFAULT_DESCRIPTION =
  'Klasszikus stílus, profi kezekben. Férfi hajvágás és szakálligazítás Miskolc belvárosában.'

export async function generateMetadata(): Promise<Metadata> {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const settings = await payload.findGlobal({ slug: 'settings' })

  const title = settings.metaTitle || DEFAULT_TITLE
  const description = settings.metaDescription || DEFAULT_DESCRIPTION
  const metaImage =
    typeof settings.metaImage === 'object' && settings.metaImage?.url ? settings.metaImage.url : null

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      locale: 'hu_HU',
      type: 'website',
      ...(metaImage ? { images: [{ url: metaImage }] } : {}),
    },
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hu" className={`${oswald.variable} ${roboto.variable} scroll-smooth`}>
      <body className="font-body antialiased bg-cream text-darkgray">{children}</body>
    </html>
  )
}
