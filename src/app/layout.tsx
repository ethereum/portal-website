import React from 'react'
import 'common/styles/globals.scss'
import { DM_Sans } from 'next/font/google'
import { Menu } from './menu'

const font = DM_Sans({ weight: ['400', '700'], subsets: ['latin'] })

export const metadata = {
  title: 'Portal Network',
  description: 'Portal Network website',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Menu />
        {children}
      </body>
    </html>
  )
}
