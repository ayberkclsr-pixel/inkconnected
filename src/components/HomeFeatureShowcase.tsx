'use client'

import Link from 'next/link'
import { Flame, Bot, Play, ArrowRight, Sparkles, Zap } from 'lucide-react'

export default function HomeFeatureShowcase() {
  const features = [
    {
      title: 'InkBot AI Danışman',
      badge: 'Neural v3.6',
      desc: 'Hayalindeki dövmeyi anlat, anında profesyonel beyaz zeminli stencil şablonunu üret.',
      href: '/danisman',
      btnText: 'Sohbeti Başlat',
      icon: Bot,
      // Dikkat çekici özel ambiyans & logo stili
      glowColor: 'from-cyan-500 to-blue-600',
      iconBg: 'bg-gradient-to-br from-cyan-500/20 via-blue-500/15 to-transparent border-cyan-500/30 text-cyan-300',
      shadowGlow: 'group-hover:shadow-[0_0_25px_rgba(6,182,212,0.35)]',
      pulseDot: 'bg-cyan-400',
      badgeStyle: 'bg-cyan-500/10 border-cyan-500/25 text-cyan-300',
      subIcon: Sparkles,
    },
    {
      title: 'Tattoo Match Arenası',
      badge: 'Keşfet & Eşleş',
      desc: 'Tasarımları sağa-sola kaydırarak estetik zevkine en uygun usta dövmeciyi keşfet.',
      href: '/match',
      btnText: 'Eşleşmeye Başla',
      icon: Flame,
      // Ateşli / Enerjik gradient stili
      glowColor: 'from-rose-500 to-orange-500',
      iconBg: 'bg-gradient-to-br from-rose-500/25 via-orange-500/15 to-transparent border-rose-500/30 text-rose-300',
      shadowGlow: 'group-hover:shadow-[0_0_25px_rgba(244,63,94,0.35)]',
      pulseDot: 'bg-rose-400',
      badgeStyle: 'bg-rose-500/10 border-rose-500/25 text-rose-300',
      subIcon: Zap,
    },
    {
      title: 'İlham Akışı (Reels)',
      badge: 'Canlı Galeri',
      desc: 'Dünya çapındaki dövme sanatçılarının en taze seans videolarını ve eserlerini tam ekran izle.',
      href: '/ilham',
      btnText: 'Akışı İzle',
      icon: Play,
      // Mor / Zümrüt kreatif sinematik stili
      glowColor: 'from-violet-500 to-purple-600',
      iconBg: 'bg-gradient-to-br from-violet-500/25 via-purple-500/15 to-transparent border-violet-500/30 text-violet-300',
      shadowGlow: 'group-hover:shadow-[0_0_25px_rgba(139,92,246,0.35)]',
      pulseDot: 'bg-violet-400',
      badgeStyle: 'bg-violet-500/10 border-violet-500/25 text-violet-300',
      subIcon: Sparkles,
    }
  ]

  return (
    <section className="py-12 md:py-20 container mx-auto px-4 relative z-10">
      <div className="text-center max-w-2xl mx-auto mb-8 md:mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] font-medium text-[#a1a1a6] tracking-wide mb-3 shadow-sm">
          <span>Platform Özellikleri</span>
        </div>
        <h2 className="text-2xl md:text-5xl font-semibold tracking-tight text-white mb-2 md:mb-3">
          Modern Dövme Deneyimi
        </h2>
        <p className="text-[#8e8e93] text-xs md:text-base leading-relaxed">
          Yapay zeka danışmanlığından sanatçı eşleşmesine kadar tüm süreç tek bir ekranda.
        </p>
      </div>

      {/* 3'lü Tıklanabilir & Canlı Kart Düzeni */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
        {features.map((f, i) => {
          const Icon = f.icon
          const SubIcon = f.subIcon

          return (
            <Link 
              key={i} 
              href={f.href}
              className="bg-[#111218]/90 backdrop-blur-xl border border-white/[0.08] hover:border-white/[0.22] rounded-3xl p-6 md:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)] group relative overflow-hidden"
            >
              {/* Kartın Üst Kenarındaki İnce Renk Işıltısı */}
              <div className={`absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r ${f.glowColor} opacity-20 group-hover:opacity-100 transition-opacity duration-500`} />

              <div>
                {/* Logo & Rozet Üst Satırı */}
                <div className="flex items-center justify-between mb-6">
                  
                  {/* Dikkat Çeken Canlı İkon Kutusu */}
                  <div className={`relative w-14 h-14 rounded-2xl border flex items-center justify-center transition-all duration-300 ${f.iconBg} ${f.shadowGlow} group-hover:scale-110`}>
                    <Icon className="w-6 h-6 transition-transform duration-300 group-hover:rotate-6" />
                    
                    {/* Sağ Üstteki Canlı Titreşen Mini Nokta */}
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${f.pulseDot}`}></span>
                      <span className={`relative inline-flex rounded-full h-3 w-3 ${f.pulseDot}`}></span>
                    </span>
                  </div>

                  {/* Tıklanabilirliği Hatırlatan Parlak Rozet */}
                  <span className={`text-[11px] font-semibold px-3 py-1 rounded-full border transition-all duration-300 flex items-center gap-1.5 ${f.badgeStyle}`}>
                    <SubIcon className="w-3 h-3" />
                    {f.badge}
                  </span>
                </div>

                <h3 className="text-lg md:text-xl font-bold text-white tracking-tight mb-2 group-hover:text-white transition-colors flex items-center justify-between">
                  <span>{f.title}</span>
                  <ArrowRight className="w-4 h-4 text-[#8e8e93] group-hover:text-white group-hover:translate-x-1 transition-all opacity-0 group-hover:opacity-100" />
                </h3>
                
                <p className="text-[#9a9aa2] text-xs md:text-sm leading-relaxed mb-6">
                  {f.desc}
                </p>
              </div>

              {/* Tıkla & Keşfet Buton Çizgisi */}
              <div className="flex items-center justify-between pt-4 border-t border-white/[0.06] group-hover:border-white/[0.12] transition-colors">
                <span className="text-xs font-semibold text-white group-hover:text-white transition-colors">
                  {f.btnText}
                </span>
                <div className="w-7 h-7 rounded-full bg-white/[0.06] group-hover:bg-white text-[#d1d1d6] group-hover:text-black flex items-center justify-center transition-all duration-300 group-hover:scale-105">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
