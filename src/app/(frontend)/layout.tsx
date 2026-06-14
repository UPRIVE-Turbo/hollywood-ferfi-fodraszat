import React from 'react'
import { Oswald, Roboto } from 'next/font/google'
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

export const metadata = {
  title: 'Hollywood Férfi Fodrászat | Miskolc',
  description:
    'Klasszikus stílus, profi kezekben. Férfi hajvágás és szakálligazítás Miskolc szívében, a Hollywood Férfi Fodrászatban.',
  openGraph: {
    title: 'Hollywood Férfi Fodrászat | Miskolc',
    description:
      'Klasszikus stílus, profi kezekben. Férfi hajvágás és szakálligazítás Miskolc szívében, a Hollywood Férfi Fodrászatban.',
    locale: 'hu_HU',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hu" className={`${oswald.variable} ${roboto.variable} scroll-smooth`}>
      <body className="font-body antialiased bg-cream text-darkgray">{children}</body>
    </html>
  )
}
