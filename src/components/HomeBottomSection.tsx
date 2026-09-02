'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { Sparkles, Compass, Flame, Bot } from 'lucide-react'

export default function HomeBottomSection() {
  const { data: session } = useSession()

  // 1. GİRİŞ YAPMIŞ KULLANICILAR İÇİN: Apple Minimalist Rehber & İpuçları
  if (session) {
    const userName = session.user?.name?.split(' ')[0] || 'Dövme Tutkunu'

    return (
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0e0e11] border border-white/[0.08] rounded-3xl p-8 md:p-14 relative overflow-hidden shadow-apple">
          
          <div className="relative z-10">
            {/* Header Badge */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.05] border border-white/[0.08] text-xs text-[#d1d1d6] font-medium">
                <Sparkles className="w-3.5 h-3.5 text-white" />
                <span>Hoş Geldiniz, <strong className="text-white">{userName}</strong> • Dövme Kültürü & İpuçları</span>
              </div>
            </div>

            {/* Title & Intro */}
            <h2 className="text-2xl md:text-4xl font-semibold tracking-tight text-white mb-4">
              Mürekkebin Yolculuğu: <span className="text-[#8e8e93]">Biliyor Muydunuz?</span>
            </h2>
            <p className="text-[#a1a1a6] text-sm md:text-base mb-10 max-w-3xl leading-relaxed">
              Dövme sadece deriye işlenen bir desen değil; antik çağlardan bu yana güç, aidiyet ve ruhsal ifadenin en kadim sanatıdır.
            </p>

            {/* 3 Bilgilendirici Minimalist Kart */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-10">
              <div className="bg-[#151518] border border-white/[0.06] rounded-2xl p-6">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#8e8e93] block mb-2">Tarihçe</span>
                <h3 className="text-base font-semibold text-white mb-2">Buz Adam Ötzi'nin Dövmeleri</h3>
                <p className="text-xs text-[#8e8e93] leading-relaxed">
                  5.300 yıl önce donan Ötzi'nin bedeninde 61 adet dövme bulunmuştur. İlginç olan, dövmelerin tam da eklem ağrısı tedavi noktalarında yer almasıdır.
                </p>
              </div>

              <div className="bg-[#151518] border border-white/[0.06] rounded-2xl p-6">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#8e8e93] block mb-2">Bakım</span>
                <h3 className="text-base font-semibold text-white mb-2">İlk 48 Saat: İyileşmenin Kalbi</h3>
                <p className="text-xs text-[#8e8e93] leading-relaxed">
                  Yeni dövmenizi doğrudan güneş ışığına veya aşırı sıcak suya maruz bırakmayın. İnce bir tabaka nemlendirici uygulayın ve kabukları asla soymayın.
                </p>
              </div>

              <div className="bg-[#151518] border border-white/[0.06] rounded-2xl p-6">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#8e8e93] block mb-2">Gelenek</span>
                <h3 className="text-base font-semibold text-white mb-2">Denizcilerin Koruyucu Tılsımı</h3>
                <p className="text-xs text-[#8e8e93] leading-relaxed">
                  18. yüzyıl denizcileri, batan gemiden kurtulacaklarına inandıkları için ayaklarına domuz ve horoz motifleri işletirdi; çünkü ahşap kafesleri batmazdı.
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/[0.06]">
              <span className="text-xs text-[#8e8e93]">Yeni bir sanat yolculuğuna başlamak ister misiniz?</span>
              <div className="flex flex-wrap gap-2.5">
                <Link href="/match" className="btn-primary text-xs px-5 py-2.5 flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5" /> Tattoo Match
                </Link>
                <Link href="/danisman" className="btn-secondary text-xs px-5 py-2.5 flex items-center gap-1.5">
                  <Bot className="w-3.5 h-3.5" /> AI Danışman
                </Link>
                <Link href="/kesfet" className="btn-secondary text-xs px-5 py-2.5 flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5" /> Sanatçıları Keşfet
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>
    )
  }

  // 2. GİRİŞ YAPMAMIŞ (ZİYARETÇİLER) İÇİN: Apple Minimalist CTA
  return (
    <section className="py-20 md:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-[#0e0e11] border border-white/[0.08] rounded-3xl p-10 md:p-16 text-center relative overflow-hidden shadow-apple">
        <div className="relative z-10 flex flex-col items-center max-w-2xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#8e8e93] mb-3">Sanatçılar İçin</span>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-white mb-4">
            Sanatınızı Dünyayla Buluşturun
          </h2>
          <p className="text-sm md:text-base text-[#8e8e93] mb-8 leading-relaxed font-normal">
            İğnenizin ustalığını, vizyoner tasarımlar arayan koleksiyonerlerle ve dövme tutkunlarıyla bir araya getirin.
          </p>
          <Link href="/kayit" className="btn-primary text-sm px-8 py-3.5">
            Sanatçı Olarak Katıl
          </Link>
        </div>
      </div>
    </section>
  )
}
