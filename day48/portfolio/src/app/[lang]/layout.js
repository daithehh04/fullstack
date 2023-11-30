import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Nguyen Dai The | Portfolio',
  description: 'Portfolio',
}
export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'vi' }]
}

export default function RootLayout({ children,params }) {
  return (
    <html lang={params.lang}>
      <body className={inter.className} suppressHydrationWarning={true}>
        <Providers>
          {children}
        </Providers>
        </body>
    </html>
  )
}
