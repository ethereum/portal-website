import 'common/styles/globals.scss'
import { DM_Sans, Inter } from 'next/font/google'

const font = DM_Sans({ weight: ['400', '700'], subsets: ['latin'] })
// const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Portal Network',
  description: 'Portal Network website',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  )
}
