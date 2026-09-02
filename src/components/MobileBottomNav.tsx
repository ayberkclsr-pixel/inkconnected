'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Compass, Flame, Bot, Film, Sparkles } from 'lucide-react'

export default function MobileBottomNav() {
  const pathname = usePathname()

  const tabs = [
    {
      name: 'Keşfet',
      href: '/kesfet',
      icon: Compass,
    },
    {
      name: 'İlham',
      href: '/ilham',
      icon: Film,
    },
    {
      name: 'Tattoo Match',
      href: '/match',
      icon: Flame,
      isSpecial: true,
    },
    {
      name: 'AI Asistan',
      href: '/danisman',
      icon: Bot,
    },
    {
      name: 'Ana Sayfa',
      href: '/',
      icon: Sparkles,
    },
  ]

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 px-4 pb-safe-offset-2 pb-4 pointer-events-none">
      <nav className="pointer-events-auto max-w-sm mx-auto rounded-full bg-[#121215]/90 border border-white/[0.12] backdrop-blur-2xl px-2 py-2 shadow-2xl flex items-center justify-around">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href
          const Icon = tab.icon

          if (tab.isSpecial) {
            return (
              <Link
                key={tab.name}
                href={tab.href}
                className="flex flex-col items-center group focus:outline-none px-2"
              >
                <div className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 ${
                  isActive 
                    ? 'bg-white text-black shadow-lg scale-105' 
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className={`text-[9px] font-medium tracking-tight mt-1 ${
                  isActive ? 'text-white font-semibold' : 'text-[#8e8e93]'
                }`}>
                  {tab.name}
                </span>
              </Link>
            )
          }

          return (
            <Link
              key={tab.name}
              href={tab.href}
              className={`flex flex-col items-center py-1 px-3 rounded-full transition-all duration-200 ${
                isActive 
                  ? 'text-white font-semibold' 
                  : 'text-[#8e8e93] hover:text-[#d1d1d6]'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-105' : ''}`} />
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white shadow-[0_0_4px_rgba(255,255,255,0.8)]" />
                )}
              </div>
              <span className="text-[9px] mt-1 font-medium">
                {tab.name}
              </span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
