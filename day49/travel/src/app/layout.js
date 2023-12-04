import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './Providers'
import { Toaster } from 'react-hot-toast';
import Header from '~/components/Header'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <Providers>
          <Header/>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
