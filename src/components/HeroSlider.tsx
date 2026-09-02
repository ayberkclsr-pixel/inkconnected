'use client'

import { useState, useEffect } from 'react'

// Gönderdiğin Pinterest panosundaki karanlık, lüks, dövme yataklı, tuğla/siyah duvarlı ve neon ışıklı 6 gerçek stüdyo tasarımı
const TATTOO_STUDIOS = [
  {
    src: '/images/studio-1.jpg',
    alt: 'Vintage Brick Wall Tattoo Studio with Leather Recliner'
  },
  {
    src: '/images/studio-2.jpg',
    alt: 'Cyberpunk Neon Lit Black Tattoo Studio Workstation'
  },
  {
    src: '/images/studio-3.jpg',
    alt: 'Industrial Loft Tattoo Studio with Grid Windows'
  },
  {
    src: '/images/studio-4.jpg',
    alt: 'Dark Gothic Vintage Tattoo Parlor with Framed Flash Walls'
  },
  {
    src: '/images/studio-5.jpg',
    alt: 'Minimalist Monochromatic Black Luxury Tattoo Studio'
  },
  {
    src: '/images/studio-6.jpg',
    alt: 'Japanese Irezumi Master Tattoo Studio Suite'
  }
]

export default function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TATTOO_STUDIOS.length)
    }, 6000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {TATTOO_STUDIOS.map((image, index) => {
        const isActive = index === currentIndex
        return (
          <div
            key={image.src}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div
              className={`absolute inset-0 bg-cover bg-center transition-transform duration-[7000ms] ease-out ${
                isActive ? 'scale-105' : 'scale-100'
              }`}
              style={{ backgroundImage: `url('${image.src}')` }}
            />
          </div>
        )
      })}
      {/* Dark cinematic gradient overlay - metinlerin kusursuz okunması için */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#070714]/80 via-[#0a0a1a]/60 to-[#0a0a1a] z-[1]" />
    </div>
  )
}
