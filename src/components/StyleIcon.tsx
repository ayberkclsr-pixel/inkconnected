import React from 'react'

interface StyleIconProps {
  slug: string
  className?: string
}

export default function StyleIcon({ slug, className = "w-6 h-6" }: StyleIconProps) {
  const normalized = slug.toLowerCase()

  switch (normalized) {
    case 'realistik':
      // Detaylı Realistik Göz & Işık İllüstrasyonu
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.5">
          <defs>
            <linearGradient id="grad-real" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
          </defs>
          <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" stroke="url(#grad-real)" />
          <circle cx="12" cy="12" r="3.5" stroke="url(#grad-real)" strokeWidth="1.8" />
          <circle cx="12" cy="12" r="1.5" fill="url(#grad-real)" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2" stroke="#06b6d4" strokeOpacity="0.4" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      )

    case 'black-grey':
    case 'blackwork':
      // Ay Tutulması, Gölge & Gece Mürekkebi İllüstrasyonu
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <defs>
            <linearGradient id="grad-bg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#94a3b8" />
              <stop offset="100%" stopColor="#334155" />
            </linearGradient>
          </defs>
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="url(#grad-bg)" stroke="#cbd5e1" strokeWidth="1.5" />
          <circle cx="15" cy="9" r="1" fill="#f8fafc" />
          <circle cx="18" cy="14" r="1.5" fill="#94a3b8" />
          <path d="M12 17l1 2 2-1" stroke="#f8fafc" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )

    case 'watercolor':
      // Sulu Boya Sıçraması & Fırça İllüstrasyonu
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <defs>
            <linearGradient id="grad-water" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ec4899" />
              <stop offset="50%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
          <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" fill="url(#grad-water)" fillOpacity="0.25" stroke="url(#grad-water)" strokeWidth="1.6" />
          <circle cx="17.5" cy="5.5" r="1.5" fill="#ec4899" />
          <circle cx="6.5" cy="16.5" r="1" fill="#06b6d4" />
          <circle cx="18.5" cy="15.5" r="1.2" fill="#8b5cf6" />
        </svg>
      )

    case 'geometric':
      // Kutsal Geometri & Çokgen Kristal İllüstrasyonu
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <defs>
            <linearGradient id="grad-geo" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
          <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5" stroke="url(#grad-geo)" strokeWidth="1.5" />
          <polygon points="12 6 18 10 18 14 12 18 6 14 6 10" stroke="url(#grad-geo)" strokeWidth="1.2" strokeDasharray="1 1" />
          <line x1="12" y1="2" x2="12" y2="22" stroke="url(#grad-geo)" strokeWidth="1.2" />
          <line x1="2" y1="8.5" x2="22" y2="15.5" stroke="url(#grad-geo)" strokeWidth="1" />
          <line x1="2" y1="15.5" x2="22" y2="8.5" stroke="url(#grad-geo)" strokeWidth="1" />
        </svg>
      )

    case 'tribal':
      // Polinezya / Maori Tribal Bıçak & Alev İllüstrasyonu
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <defs>
            <linearGradient id="grad-tribal" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#ef4444" />
            </linearGradient>
          </defs>
          <path d="M12 2C8 6 5 10 5 14a7 7 0 0 0 14 0c0-4-3-8-7-12z" stroke="url(#grad-tribal)" strokeWidth="1.6" />
          <path d="M12 6c-2 3-3.5 5-3.5 7a3.5 3.5 0 0 0 7 0c0-2-1.5-4-3.5-7z" fill="url(#grad-tribal)" fillOpacity="0.3" stroke="url(#grad-tribal)" strokeWidth="1.2" />
          <path d="M7 16l3-3M17 16l-3-3" stroke="url(#grad-tribal)" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )

    case 'japanese':
      // Geleneksel Japon Dalgası & Ejderha Pulu İllüstrasyonu
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <defs>
            <linearGradient id="grad-jp" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="50%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
          <circle cx="12" cy="12" r="9" stroke="url(#grad-jp)" strokeWidth="1.5" />
          <path d="M3 13c3-3 6 0 9-3 3-3 6 0 9-3" stroke="url(#grad-jp)" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M3 17c3-3 6 0 9-3 3-3 6 0 9-3" stroke="url(#grad-jp)" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="12" cy="7" r="2.5" fill="#ef4444" fillOpacity="0.4" />
        </svg>
      )

    case 'neo-traditional':
      // Hançer ve Gül / Kalp Süslü Çerçeve İllüstrasyonu
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <defs>
            <linearGradient id="grad-neo" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ec4899" />
              <stop offset="100%" stopColor="#eab308" />
            </linearGradient>
          </defs>
          <path d="M12 2l2 4-2 14-2-14 2-4z" stroke="url(#grad-neo)" strokeWidth="1.5" fill="url(#grad-neo)" fillOpacity="0.2" />
          <path d="M7 8h10M9 6h6M12 20v2M10 22h4" stroke="url(#grad-neo)" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="6" cy="14" r="2" stroke="#ec4899" strokeWidth="1.2" />
          <circle cx="18" cy="14" r="2" stroke="#ec4899" strokeWidth="1.2" />
        </svg>
      )

    case 'minimalist':
      // Tek İğne, Yıldız & İnce Çizgi İllüstrasyonu
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <defs>
            <linearGradient id="grad-min" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#818cf8" />
            </linearGradient>
          </defs>
          <path d="M12 3v18M3 12h18" stroke="url(#grad-min)" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="12" cy="12" r="3" stroke="url(#grad-min)" strokeWidth="1.5" />
          <circle cx="18" cy="6" r="1.5" fill="#38bdf8" />
          <circle cx="6" cy="18" r="1" fill="#818cf8" />
        </svg>
      )

    case 'lettering':
      // Gotik Kaligrafi Ucu / Tüy Kalem İllüstrasyonu
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <defs>
            <linearGradient id="grad-let" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
          </defs>
          <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" stroke="url(#grad-let)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M15 5l4 4M4.5 17.5l2 2" stroke="url(#grad-let)" strokeWidth="1.4" />
        </svg>
      )

    case 'dotwork':
      // Nokta Vuruşu (Stipple Mandala) İllüstrasyonu
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <defs>
            <linearGradient id="grad-dot" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#e879f9" />
            </linearGradient>
          </defs>
          <circle cx="12" cy="12" r="2" fill="url(#grad-dot)" />
          {/* İç Çember */}
          <circle cx="12" cy="6" r="1.2" fill="#c084fc" />
          <circle cx="12" cy="18" r="1.2" fill="#c084fc" />
          <circle cx="6" cy="12" r="1.2" fill="#c084fc" />
          <circle cx="18" cy="12" r="1.2" fill="#c084fc" />
          {/* Dış Çember */}
          <circle cx="8" cy="8" r="1" fill="#e879f9" />
          <circle cx="16" cy="8" r="1" fill="#e879f9" />
          <circle cx="8" cy="16" r="1" fill="#e879f9" />
          <circle cx="16" cy="16" r="1" fill="#e879f9" />
          <circle cx="12" cy="2" r="0.8" fill="#e879f9" />
          <circle cx="12" cy="22" r="0.8" fill="#e879f9" />
          <circle cx="2" cy="12" r="0.8" fill="#e879f9" />
          <circle cx="22" cy="12" r="0.8" fill="#e879f9" />
        </svg>
      )

    case 'old-school':
      // Geleneksel Çıpa & Denizci Arması İllüstrasyonu
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <defs>
            <linearGradient id="grad-old" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#ef4444" />
            </linearGradient>
          </defs>
          <circle cx="12" cy="5" r="2.5" stroke="url(#grad-old)" strokeWidth="1.6" />
          <line x1="12" y1="7.5" x2="12" y2="21" stroke="url(#grad-old)" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="7" y1="10" x2="17" y2="10" stroke="url(#grad-old)" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M5 14c0 4.5 3.5 7 7 7s7-2.5 7-7" stroke="url(#grad-old)" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M3.5 13l2.5 1.5M20.5 13l-2.5 1.5" stroke="url(#grad-old)" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )

    case 'new-school':
      // Dinamik Graffiti & Karikatür Patlaması İllüstrasyonu
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <defs>
            <linearGradient id="grad-new" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a3e635" />
              <stop offset="50%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
          <path d="M12 2l2.4 5.6L20 8.8l-4 4.2 1 6-5-3-5 3 1-6-4-4.2 5.6-1.2L12 2z" stroke="url(#grad-new)" strokeWidth="1.5" fill="url(#grad-new)" fillOpacity="0.2" />
          <circle cx="19" cy="5" r="1.5" fill="#a3e635" />
          <circle cx="5" cy="19" r="1" fill="#ec4899" />
        </svg>
      )

    case 'biomechanical':
      // Siber Biyonik Piston & Dişli Çark İllüstrasyonu
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <defs>
            <linearGradient id="grad-bio" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
          <circle cx="12" cy="12" r="3" stroke="url(#grad-bio)" strokeWidth="2" />
          <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" stroke="url(#grad-bio)" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M8 8l8 8M16 8l-8 8" stroke="url(#grad-bio)" strokeWidth="1" strokeDasharray="1 1" />
        </svg>
      )

    case 'trash-polka':
      // Kaos Kırmızı Fırça & Geometrik Nişangah İllüstrasyonu
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <defs>
            <linearGradient id="grad-trash" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#dc2626" />
              <stop offset="100%" stopColor="#18181b" />
            </linearGradient>
          </defs>
          <circle cx="12" cy="12" r="8" stroke="#dc2626" strokeWidth="1.5" />
          <line x1="2" y1="12" x2="22" y2="12" stroke="#dc2626" strokeWidth="1.5" />
          <line x1="12" y1="2" x2="12" y2="22" stroke="#dc2626" strokeWidth="1.5" />
          <path d="M4 4l16 16M4 20L20 4" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.4" strokeDasharray="2 2" />
          <rect x="10" y="10" width="4" height="4" fill="#dc2626" />
        </svg>
      )

    default:
      // Varsayılan Sanatsal Mürekkep Damlası İllüstrasyonu
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <defs>
            <linearGradient id="grad-def" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
          <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" stroke="url(#grad-def)" strokeWidth="1.6" fill="url(#grad-def)" fillOpacity="0.2" />
          <circle cx="12" cy="14" r="2.5" fill="url(#grad-def)" />
        </svg>
      )
  }
}
