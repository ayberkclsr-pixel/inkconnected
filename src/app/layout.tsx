import type { Metadata } from 'next'
import { Inter, Outfit } from 'next/font/google'
import './globals.css'
import Providers from '@/components/Providers'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import MobileBottomNav from '@/components/MobileBottomNav'

const inter = Inter({ 
  subsets: ['latin', 'latin-ext'],
  variable: '--font-inter',
})

const outfit = Outfit({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-outfit',
})

export const metadata: Metadata = {
  title: 'InkConnect - İğne ile Sanat, Sanatçı ile Buluşma',
  description: 'Hayalinizdeki dövmeyi gerçeğe dönüştürecek en iyi dövme sanatçılarını bulun.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" className={`${inter.variable} ${outfit.variable}`}>
      <body className={`font-sans  text-white antialiased`}>
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-grow pb-16 md:pb-0">
              {children}
            </div>
            <Footer />
            <MobileBottomNav />
          </div>
        </Providers>
      </body>
    </html>
  )
}
