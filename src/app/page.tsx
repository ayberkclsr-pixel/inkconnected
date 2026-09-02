import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import CountUpAnimation from '@/components/CountUpAnimation'
import ArtistCard from '@/components/ArtistCard'
import HowItWorks from '@/components/HowItWorks'
import HeroSlider from '@/components/HeroSlider'
import HomeBottomSection from '@/components/HomeBottomSection'
import StyleIcon from '@/components/StyleIcon'
import InteractivePainMap from '@/components/InteractivePainMap'
import HomeFeatureShowcase from '@/components/HomeFeatureShowcase'
import TattooHistoryQuotes from '@/components/TattooHistoryQuotes'

export default async function HomePage() {
  const [artistsCount, stylesCount, reviewsCount] = await prisma.$transaction([
    prisma.artistProfile.count({ where: { isActive: true } }),
    prisma.tattooStyle.count(),
    prisma.review.count()
  ])

  const topArtists = await prisma.artistProfile.findMany({
    where: { isActive: true },
    take: 6,
    include: {
      user: true,
      styles: {
        include: {
          tattooStyle: true
        }
      },
      reviews: true,
      portfolioItems: {
        take: 1,
        orderBy: { createdAt: 'desc' }
      }
    },
    orderBy: {
      reviews: {
        _count: 'desc'
      }
    }
  })

  const styles = await prisma.tattooStyle.findMany({
    take: 12
  })

  return (
    <main className="min-h-screen bg-transparent text-[#f5f5f7]">
      {/* Hero Section - Apple Style Cinematic Immersion */}
      <section className="relative min-h-[92vh] flex flex-col justify-center overflow-hidden">
        <HeroSlider />
        
        {/* Apple subtle radial illumination */}
        <div className="absolute inset-0 bg-apple-radial pointer-events-none z-[2]" />

        <div className="max-w-5xl relative z-10 mx-auto px-4 sm:px-6 py-24 md:py-32 flex flex-col items-center text-center">
          
          {/* Subtle Tagline Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.08] border border-white/10 text-xs text-[#d1d1d6] font-medium mb-6 backdrop-blur-xl">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span>Yeni Nesil Dövme Ekosistemi</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tight text-white mb-6 leading-[1.08] font-display">
            Ruhun Mürekkeple, <br />
            <span className="text-[#8e8e93]">Tenin Sanatla.</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-[#a1a1a6] max-w-2xl mb-10 leading-relaxed font-normal">
            Dövme bir iz değil; sonsuzluğa atılmış kişisel bir imzadır. Hayalinizdeki başyapıtı teninizde taşımak için dünyanın ve Türkiye'nin en seçkin iğne ustalarıyla buluşun.
          </p>
          
          {/* Apple Style Dual Button Group */}
          <div className="flex flex-row gap-3 w-full sm:w-auto max-w-sm sm:max-w-none justify-center mb-16 md:mb-24">
            <Link href="/kesfet" className="btn-primary flex-1 sm:flex-initial px-7 py-3.5 flex items-center justify-center gap-2 group">
              Sanatçıları Keşfet
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link href="#nasil-calisir" className="btn-secondary flex-1 sm:flex-initial px-7 py-3.5 flex items-center justify-center text-sm">
              Nasıl Çalışır?
            </Link>
          </div>

          {/* Minimalist Metrics Bar */}
          <div className="grid grid-cols-3 gap-6 md:gap-16 w-full max-w-3xl border-t border-white/[0.08] pt-10">
            <div className="flex flex-col items-center">
              <span className="text-2xl sm:text-4xl font-semibold text-white mb-1 font-display tracking-tight">
                <CountUpAnimation end={artistsCount} suffix="+" />
              </span>
              <span className="text-xs text-[#8e8e93] uppercase tracking-wider font-medium">Seçkin Sanatçı</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl sm:text-4xl font-semibold text-white mb-1 font-display tracking-tight">
                <CountUpAnimation end={stylesCount} suffix="+" />
              </span>
              <span className="text-xs text-[#8e8e93] uppercase tracking-wider font-medium">Dövme Stili</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl sm:text-4xl font-semibold text-white mb-1 font-display tracking-tight">
                <CountUpAnimation end={reviewsCount} suffix="+" />
              </span>
              <span className="text-xs text-[#8e8e93] uppercase tracking-wider font-medium">Gerçek Değerlendirme</span>
            </div>
          </div>

        </div>
      </section>

      {/* Featured Masterpiece */}
      {topArtists.length > 0 && topArtists[0].portfolioItems.length > 0 && (
        <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#0e0e11] border border-white/[0.08] rounded-3xl overflow-hidden relative group shadow-apple">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.05] border border-white/[0.08] text-xs font-medium text-[#a1a1a6] w-fit mb-6">
                  <span>Öne Çıkan Başyapıt</span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white mb-4 leading-tight">
                  Her Damla Mürekkep, <br /><span className="text-[#8e8e93]">Ölümsüz Bir Hikaye.</span>
                </h2>
                <p className="text-[#a1a1a6] text-sm sm:text-base mb-8 leading-relaxed font-normal">
                  <span className="text-white font-medium">{topArtists[0].user.name}</span> tarafından tasarlanan bu eser, geleneksel tekniklerin modern bir vizyonla buluşmasını temsil ediyor.
                </p>
                <div>
                  <Link href={`/sanatci/${topArtists[0].id}`} className="btn-secondary text-xs px-6 py-3">
                    Sanatçı Profilini İncele
                  </Link>
                </div>
              </div>
              <div className="relative h-72 sm:h-96 lg:h-auto min-h-[380px] overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/studio-2.jpg')] bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-l from-transparent via-[#0e0e11]/20 to-[#0e0e11]" />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Feature Showcase (InkBot, Tattoo Match, Reels) */}
      <HomeFeatureShowcase />

      {/* Featured Artists Section */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 md:mb-14">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#8e8e93] mb-2">Ustalar</div>
            <h2 className="text-2xl sm:text-4xl font-semibold tracking-tight text-white">
              Öne Çıkan Sanatçılar
            </h2>
          </div>
          <Link href="/kesfet" className="mt-3 sm:mt-0 text-xs font-medium text-[#8e8e93] hover:text-white transition-colors flex items-center gap-1.5">
            Tüm Sanatçıları Gör <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topArtists.map(artist => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </div>
      </section>

      {/* Interactive Pain Map */}
      <InteractivePainMap />

      {/* How It Works */}
      <div id="nasil-calisir">
        <HowItWorks />
      </div>

      {/* Popular Styles Grid */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/[0.06]">
        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#8e8e93] mb-2">Koleksiyon</div>
          <h2 className="text-2xl sm:text-4xl font-semibold tracking-tight text-white mb-3">
            Popüler Dövme Tarzları
          </h2>
          <p className="text-xs sm:text-sm text-[#8e8e93]">
            Klasik çizgilerden geometrik avangart yaklaşımlara tarzları keşfedin.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {styles.map(style => (
            <Link
              key={style.id}
              href={`/kesfet?style=${style.slug}`}
              className="bg-[#101014] border border-white/[0.06] hover:border-white/[0.18] p-4 rounded-2xl flex flex-col items-center text-center transition-all duration-200 group hover:-translate-y-0.5"
            >
              <div className="w-10 h-10 rounded-xl bg-white/[0.04] flex items-center justify-center mb-3 text-white group-hover:bg-white group-hover:text-black transition-colors">
                <StyleIcon slug={style.slug} className="w-5 h-5" />
              </div>
              <span className="text-xs font-medium text-[#d1d1d6] group-hover:text-white transition-colors">
                {style.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Tattoo History Quotes Section */}
      <TattooHistoryQuotes />

      {/* Home Bottom Section (Education & Culture or Artist Call-to-Action) */}
      <HomeBottomSection />

    </main>
  )
}
