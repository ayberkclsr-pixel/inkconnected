'use client'

import { useState } from 'react'
import { Sparkles, Info, Activity } from 'lucide-react'

type BodyZone = {
  id: string
  name: string
  level: 'Hafif' | 'Orta' | 'Yüksek' | 'Yoğun'
  score: number // 1 - 10
  desc: string
  tip: string
}

const ZONES: Record<string, BodyZone> = {
  omuz: {
    id: 'omuz',
    name: 'Omuz & Biceps',
    level: 'Hafif',
    score: 2,
    desc: 'Kas dokusu ve kalın deri katmanı sayesinde en konforlu seans bölgesidir.',
    tip: 'İlk dövme için ideal başlangıç noktası.'
  },
  onkol: {
    id: 'onkol',
    name: 'Ön Kol (Forearm)',
    level: 'Hafif',
    score: 3,
    desc: 'Stabil zemin ve sinir azlığı nedeniyle pürüzsüz bir iyileşme süreci sunar.',
    tip: 'Günlük hayatta sürekli göz önünde olmasını istediğiniz tasarımlar için mükemmel.'
  },
  sirt: {
    id: 'sirt',
    name: 'Sırt & Kürek Kemiği',
    level: 'Orta',
    score: 5,
    desc: 'Geniş bir tuval alanı sağlar. Omurga hattı dışında konforludur.',
    tip: 'Büyük ölçekli kompozisyonlar ve detaylı illüstrasyonlar için vazgeçilmez.'
  },
  bacak: {
    id: 'bacak',
    name: 'Baldır & Üst Bacak',
    level: 'Hafif',
    score: 3,
    desc: 'Yoğun kas tabakası titreşimi absorbe ederek seansı oldukça rahatlatır.',
    tip: 'Büyük boyutlu ve gölgelendirmeli çalışmalar için dayanıklı bölge.'
  },
  kaburga: {
    id: 'kaburga',
    name: 'Kaburga & Göğüs Kafesi',
    level: 'Yoğun',
    score: 9,
    desc: 'Deri incedir ve titreşim doğrudan kemik yapısında hissedilir.',
    tip: 'Nefes kontrolü ve tecrübe gerektirir; seansı bölerek ilerlemek tavsiye edilir.'
  },
  bilek: {
    id: 'bilek',
    name: 'El Bileği & Parmaklar',
    level: 'Yüksek',
    score: 7,
    desc: 'Kemikli ve ince sinir uçlarının yoğun olduğu hassas bir anatomik alandır.',
    tip: 'Minimalist ve fine-line tasarımlar tercih edilmelidir.'
  }
}

export default function InteractivePainMap() {
  const [selectedZone, setSelectedZone] = useState<string>('omuz')
  const current = ZONES[selectedZone]

  return (
    <section className="py-16 md:py-24 container mx-auto px-4 relative z-10">
      <div className="bg-[#0e0e11] border border-white/[0.08] rounded-3xl p-6 sm:p-10 md:p-14 relative overflow-hidden shadow-apple">
        
        {/* Apple subtle top rim light */}
        <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-medium text-[#a1a1a6] mb-3">
            <Activity className="w-3.5 h-3.5 text-white" />
            <span>Anatomi & Konfor Rehberi</span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white mb-3">
            Dövme Acı Haritası
          </h2>
          <p className="text-[#8e8e93] text-xs sm:text-sm md:text-base max-w-lg mx-auto">
            İlk veya sıradaki dövmenizi planlarken vücut bölgelerinin hassasiyet derecesini ve uzman tavsiyelerini keşfedin.
          </p>
        </div>

        {/* Bölge Seçim Butonları (Yatay Apple Segmented Bar) */}
        <div className="flex gap-2 pb-2 mb-8 md:mb-12 overflow-x-auto hide-scrollbar justify-start md:justify-center">
          {Object.values(ZONES).map((zone) => {
            const isSelected = selectedZone === zone.id
            return (
              <button
                key={zone.id}
                onClick={() => setSelectedZone(zone.id)}
                className={`flex-shrink-0 px-4 py-2.5 rounded-full text-xs font-medium tracking-tight transition-all duration-200 border ${
                  isSelected
                    ? 'bg-white text-black border-white shadow-sm font-semibold'
                    : 'bg-white/[0.03] text-[#8e8e93] border-white/[0.06] hover:bg-white/[0.08] hover:text-white'
                }`}
              >
                {zone.name}
              </button>
            )
          })}
        </div>

        {/* Detay Kartı */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          
          {/* Sol: Skor Göstergesi */}
          <div className="bg-[#151518] border border-white/[0.06] rounded-2xl p-6 flex flex-col items-center justify-center text-center">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#8e8e93] mb-2">Hassasiyet Seviyesi</span>
            <div className="flex items-baseline gap-1 my-2">
              <span className="text-5xl md:text-6xl font-bold tracking-tight text-white font-display">
                {current.score}
              </span>
              <span className="text-lg text-[#636366] font-medium">/10</span>
            </div>
            <div className="mt-2 px-3 py-1 rounded-full text-xs font-semibold bg-white/[0.08] text-white border border-white/10">
              {current.level} Seviye
            </div>

            {/* Apple Minimal Bar */}
            <div className="w-full bg-white/[0.06] h-1.5 rounded-full mt-6 overflow-hidden">
              <div 
                className="bg-white h-full rounded-full transition-all duration-500" 
                style={{ width: `${current.score * 10}%` }}
              />
            </div>
          </div>

          {/* Orta & Sağ: Açıklama ve Uzman Tavsiyesi */}
          <div className="md:col-span-2 bg-[#151518] border border-white/[0.06] rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <h3 className="text-lg sm:text-xl font-semibold text-white tracking-tight">
                  {current.name}
                </h3>
              </div>
              <p className="text-[#a1a1a6] text-sm md:text-base leading-relaxed mb-6">
                {current.desc}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-start gap-3">
              <Info className="w-4 h-4 text-white flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-semibold text-white block mb-0.5">Usta Tavsiyesi</span>
                <p className="text-xs text-[#8e8e93] leading-relaxed">
                  {current.tip}
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
