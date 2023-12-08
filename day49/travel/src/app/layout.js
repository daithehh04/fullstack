import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './Providers'
import { Toaster } from 'react-hot-toast';
import Header from '~/components/Header';
import AuthProvider from '~/components/AuthProvider';

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <AuthProvider>
          <Providers>
            <Header/>
            {children}
            <Toaster />
          </Providers>
        </AuthProvider>
      </body>
    </html>
  )
}
