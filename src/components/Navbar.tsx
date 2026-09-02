'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useSession, signOut } from 'next-auth/react'
import { Menu, X, User } from 'lucide-react'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const { data: session } = useSession()
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20)
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { 
      name: 'Ana Sayfa', 
      href: '/',
    },
    { 
      name: 'Keşfet', 
      href: '/kesfet',
    },
    { 
      name: 'İlham Akışı', 
      href: '/ilham',
      badge: 'Yeni'
    },
    { 
      name: 'Tattoo Match', 
      href: '/match',
      isSpecial: 'match'
    },
    { 
      name: 'AI Danışman', 
      href: '/danisman',
      isSpecial: 'ai'
    },
  ]

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-black/70 backdrop-blur-2xl border-b border-white/[0.08] py-3.5 shadow-apple' 
        : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Apple Minimalist Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-9 h-9 rounded-2xl overflow-hidden border border-white/15 bg-white/5 p-0.5 transition-transform duration-300 group-hover:scale-105 shadow-apple-btn">
            <Image src="/images/logo.jpg" alt="InkConnect" fill className="object-cover rounded-[14px]" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-semibold tracking-tight text-white group-hover:text-gray-200 transition-colors">
              InkConnect
            </span>
          </div>
        </Link>

        {/* Desktop Nav - Apple Segmented Clean Aesthetic */}
        <nav className="hidden md:flex items-center gap-1 bg-white/[0.04] border border-white/[0.08] px-3 py-1.5 rounded-full backdrop-blur-xl">
          {navLinks.map(link => {
            const isActive = pathname === link.href

            if (link.isSpecial === 'match') {
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium tracking-tight transition-all duration-200 flex items-center gap-1.5 ${
                    isActive 
                      ? 'bg-white text-black shadow-sm font-semibold' 
                      : 'text-[#a1a1a6] hover:text-white hover:bg-white/[0.06]'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-black' : 'bg-[#e5e5ea]'}`} />
                  <span>{link.name}</span>
                </Link>
              )
            }

            if (link.isSpecial === 'ai') {
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium tracking-tight transition-all duration-200 flex items-center gap-1.5 ${
                    isActive 
                      ? 'bg-white text-black shadow-sm font-semibold' 
                      : 'text-[#a1a1a6] hover:text-white hover:bg-white/[0.06]'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-black' : 'bg-[#8e8e93]'}`} />
                  <span>{link.name}</span>
                </Link>
              )
            }

            return (
              <Link 
                key={link.name} 
                href={link.href}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium tracking-tight transition-all duration-200 flex items-center gap-1.5 ${
                  isActive 
                    ? 'bg-white/15 text-white font-semibold' 
                    : 'text-[#a1a1a6] hover:text-white hover:bg-white/[0.06]'
                }`}
              >
                <span>{link.name}</span>
                {link.badge && (
                  <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-white/10 text-gray-300 font-normal">
                    {link.badge}
                  </span>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center gap-3">
          {session ? (
            <div className="flex items-center gap-3">
              <Link href="/panel" className="text-xs font-medium text-[#a1a1a6] hover:text-white transition-colors px-3 py-1.5">
                Panel
              </Link>
              <button 
                onClick={() => signOut({ callbackUrl: '/' })}
                className="btn-secondary text-xs px-4 py-2"
              >
                Çıkış
              </button>
              <Link href="/panel/profil">
                <div className="w-8 h-8 rounded-full border border-white/20 p-[1px] overflow-hidden bg-[#1c1c1e]">
                  {(session.user as any)?.avatar ? (
                    <Image src={(session.user as any).avatar} alt={session.user.name || ''} width={32} height={32} className="object-cover w-full h-full rounded-full" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs font-semibold text-white">
                      {session.user?.name?.charAt(0) || 'U'}
                    </div>
                  )}
                </div>
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/giris" className="text-xs font-medium text-[#a1a1a6] hover:text-white transition-colors px-3 py-1.5">
                Giriş Yap
              </Link>
              <Link href="/kayit" className="btn-primary text-xs px-4 py-2">
                Kayıt Ol
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white p-2 rounded-xl bg-white/5 border border-white/10"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {/* Mobile Menu Panel */}
        <div className={`fixed inset-0 bg-black/95 backdrop-blur-2xl z-40 transition-transform duration-300 flex flex-col pt-24 px-6 ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}>
          <nav className="flex flex-col gap-4 text-lg mb-8">
            {navLinks.map(link => (
              <Link 
                key={link.name} 
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2 px-3 rounded-xl font-medium tracking-tight ${
                  pathname === link.href ? 'bg-white/10 text-white font-semibold' : 'text-[#8e8e93]'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
          
          <div className="w-full h-[1px] bg-white/10 mb-8" />
          
          <div className="flex flex-col gap-3">
            {session ? (
              <>
                <Link 
                  href="/panel" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn-primary py-3 text-center"
                >
                  Panele Git
                </Link>
                <button 
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="btn-secondary py-3"
                >
                  Çıkış Yap
                </button>
              </>
            ) : (
              <>
                <Link 
                  href="/giris" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn-secondary py-3 text-center"
                >
                  Giriş Yap
                </Link>
                <Link 
                  href="/kayit" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn-primary py-3 text-center"
                >
                  Kayıt Ol
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
