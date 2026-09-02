'use client'

import { useState, useEffect } from 'react'
import { Quote, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react'

export default function TattooHistoryQuotes() {
  const quotePages = [
    // 1. Sayfa
    [
      {
        author: 'Jack London',
        role: 'Amerikalı Yazar & Maceracı',
        quote: 'Bana dövmeli bir adam gösterin, size şaşırtıcı bir geçmişi olan bir adam göstereyim.',
      },
      {
        author: 'Lyle Tuttle',
        role: 'Efsanevi Amerikalı Dövme Ustası (1931-2019)',
        quote: 'Dövmeler zırh gibidir; ruhunun derinliklerindeki anıları teninde ölümsüzleştirirsin.',
      },
      {
        author: 'Johnny Depp',
        role: 'Oyuncu',
        quote: 'Bedenim bir nevi benim günlüğüm. Denizcilerin yaptığı gibi; her dövme hayatımın belirli bir dönemini simgeliyor.',
      },
      {
        author: 'Kat Von D',
        role: 'Sanatçı & Dövme Ustası',
        quote: 'Dövme yapmak sadece deriyi mürekkeple doldurmak değil, bir insanın ruhuna dokunup onu dışarı yansıtmaktır.',
      },
    ],
    // 2. Sayfa
    [
      {
        author: 'Horiyoshi III',
        role: 'Geleneksel Japon Irezumi Efsanesi',
        quote: 'Dövme bedene ait bir sır gibidir. Giysilerinin altında taşır, sadece değer verdiklerine gösterirsin.',
      },
      {
        author: 'Sylvia Plath',
        role: 'Şair & Yazar',
        quote: 'Deri, insanın dünyayla kurduğu ilk ve en derin sınır çizgisi; dövme ise oraya yazılmış bir şiirdir.',
      },
      {
        author: 'Don Ed Hardy',
        role: 'Modern Dövmenin Babası',
        quote: 'Dövme, yaşayan bir tuval üzerinde zamanla olgunlaşan tek sanat formudur.',
      },
      {
        author: 'Angelina Jolie',
        role: 'Oyuncu & Yönetmen',
        quote: 'Dövmelerimi seviyorum. Onlar benim bedenimdeki haritalar; nereden gelip nereye gittiğimi hatırlatıyorlar.',
      },
    ],
  ]

  const [currentPage, setCurrentPage] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  // Otomatik geçiş döngüsü (Her 6 saniyede bir sayfa değişir)
  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % quotePages.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [isPaused, quotePages.length])

  return (
    <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/[0.06]">
      <div 
        className="bg-[#0b0b0e] border border-white/[0.1] rounded-3xl p-8 sm:p-12 md:p-16 relative overflow-hidden shadow-[0_16px_50px_rgba(0,0,0,0.8)] group"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* 4 Köşeden Zarif ve Dikkat Çekici Ambiyans Işıltıları (Çok renkli değil; dumanlı gümüş, derin kobalt & amber) */}
        {/* Sol Üst Köşe: Derin Kobalt / Çelik Mavisi Işıltı */}
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-blue-600/[0.14] rounded-full blur-[90px] pointer-events-none" />
        
        {/* Sağ Üst Köşe: Asil Amber / Sıcak Altın Işıltı */}
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-amber-500/[0.12] rounded-full blur-[90px] pointer-events-none" />
        
        {/* Sol Alt Köşe: Sıcak Bakır / Titanyum Işıltı */}
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-orange-500/[0.10] rounded-full blur-[90px] pointer-events-none" />
        
        {/* Sağ Alt Köşe: Buz Mavisi / Saf Platin Işıltı */}
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-cyan-500/[0.12] rounded-full blur-[90px] pointer-events-none" />

        {/* Üst ve Alt Kenarlarda Zarif Işık Şeridi */}
        <div className="absolute top-0 left-10 right-10 h-[1px] bg-gradient-to-r from-blue-500/30 via-white/20 to-amber-500/30 pointer-events-none" />
        <div className="absolute bottom-0 left-10 right-10 h-[1px] bg-gradient-to-r from-orange-500/20 via-transparent to-cyan-500/20 pointer-events-none" />

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.05] border border-white/[0.1] text-xs font-medium text-[#d1d1d6] mb-3 backdrop-blur-md shadow-sm">
            <BookOpen className="w-3.5 h-3.5 text-white" />
            <span>Tarih & Sözler</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-white mb-2">
            Mürekkebin Felsefesi
          </h2>
          <p className="text-xs sm:text-sm text-[#8e8e93]">
            Tarih boyunca dövme sanatı ve anlamı hakkında söylenmiş unutulmaz sözler.
          </p>
        </div>

        {/* Quotes Container with Smooth Sliding Fade Transition */}
        <div className="relative min-h-[360px] sm:min-h-[300px] z-10">
          {quotePages.map((page, pageIdx) => {
            const isActive = pageIdx === currentPage
            return (
              <div
                key={pageIdx}
                className={`grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 transition-all duration-700 ease-in-out ${
                  isActive 
                    ? 'opacity-100 translate-x-0 pointer-events-auto relative z-10' 
                    : 'opacity-0 translate-x-8 pointer-events-none absolute inset-0 z-0'
                }`}
              >
                {page.map((q, idx) => (
                  <div
                    key={idx}
                    className="bg-[#121216]/80 backdrop-blur-xl border border-white/[0.08] hover:border-white/[0.2] rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)] group/card"
                  >
                    <div>
                      {/* Author Header Bar */}
                      <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-white/[0.06]">
                        <div>
                          <h3 className="text-sm font-semibold text-white tracking-tight group-hover/card:text-gray-100 transition-colors">
                            {q.author}
                          </h3>
                          <span className="text-[11px] text-[#8e8e93] block">
                            {q.role}
                          </span>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[#8e8e93] group-hover/card:text-white group-hover/card:bg-white/[0.08] transition-all">
                          <Quote className="w-3.5 h-3.5" />
                        </div>
                      </div>

                      {/* Quote Text */}
                      <p className="text-xs sm:text-sm text-[#d1d1d6] leading-relaxed italic">
                        "{q.quote}"
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )
          })}
        </div>

        {/* Navigation Dots and Controls */}
        <div className="flex items-center justify-center gap-4 mt-8 pt-6 border-t border-white/[0.06] relative z-10">
          <button
            onClick={() => setCurrentPage((prev) => (prev - 1 + quotePages.length) % quotePages.length)}
            className="w-8 h-8 rounded-full bg-white/[0.04] hover:bg-white/[0.1] border border-white/[0.08] flex items-center justify-center text-[#8e8e93] hover:text-white transition-colors"
            title="Önceki Sayfa"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-2">
            {quotePages.map((_, dotIdx) => (
              <button
                key={dotIdx}
                onClick={() => setCurrentPage(dotIdx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  dotIdx === currentPage
                    ? 'w-6 bg-white'
                    : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
                title={`${dotIdx + 1}. Sayfaya Git`}
              />
            ))}
          </div>

          <button
            onClick={() => setCurrentPage((prev) => (prev + 1) % quotePages.length)}
            className="w-8 h-8 rounded-full bg-white/[0.04] hover:bg-white/[0.1] border border-white/[0.08] flex items-center justify-center text-[#8e8e93] hover:text-white transition-colors"
            title="Sonraki Sayfa"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Small Historical Note Footer */}
        <div className="mt-4 text-center text-xs text-[#636366] relative z-10">
          <span>M.Ö. 3300 yılından günümüze, ten ile sanat arasındaki kadim bağ.</span>
        </div>

      </div>
    </section>
  )
}
