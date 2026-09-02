import { prisma } from '@/lib/prisma'
import SearchFilters from '@/components/SearchFilters'
import ArtistCard from '@/components/ArtistCard'
import { Filter } from 'lucide-react'

export default async function DiscoverPage({
  searchParams
}: {
  searchParams: { style?: string; city?: string; q?: string; bolge?: string }
}) {
  const { style, city, q, bolge } = searchParams

  const where: any = { isActive: true }

  if (style) {
    where.styles = {
      some: {
        tattooStyle: {
          slug: style
        }
      }
    }
  }

  if (city) {
    where.city = city
  }

  if (q) {
    where.OR = [
      { user: { name: { contains: q } } },
      { studioName: { contains: q } },
      { bio: { contains: q } }
    ]
  }

  if (bolge) {
    where.flashTattoos = {
      some: {
        bodyPart: bolge
      }
    }
  }

  const artists = await prisma.artistProfile.findMany({
    where,
    include: {
      user: true,
      styles: {
        include: {
          tattooStyle: true
        }
      },
      portfolioItems: {
        take: 1,
        orderBy: { createdAt: 'desc' }
      },
      reviews: true
    },
    orderBy: {
      reviews: {
        _count: 'desc'
      }
    }
  })

  const styles = await prisma.tattooStyle.findMany()

  return (
    <main className="min-h-screen bg-transparent text-[#f5f5f7] pt-24 md:pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Apple Minimal Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.05] border border-white/[0.08] text-xs font-medium text-[#a1a1a6] mb-3">
            <span>Seçkin Dövme Sanatçıları</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white mb-3">
            Usta Sanatçıları Keşfet
          </h1>
          <p className="text-sm md:text-base text-[#8e8e93]">
            Tarzınıza, konumunuza ve estetik vizyonunuza en uygun sanatçıyı filtreleyin ve bulun.
          </p>
        </div>

        {/* Search & Filter Component */}
        <SearchFilters styles={styles} />

        {/* Results Header */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/[0.06]">
          <div className="flex items-center gap-2 text-sm text-[#8e8e93]">
            <Filter className="w-4 h-4 text-white" />
            <span>Toplam <strong className="text-white font-semibold">{artists.length}</strong> sanatçı listelendi</span>
          </div>
        </div>

        {/* Artists Grid */}
        {artists.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {artists.map(artist => (
              <ArtistCard key={artist.id} artist={artist} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-[#0e0e11] border border-white/[0.08] rounded-3xl p-8 max-w-md mx-auto">
            <p className="text-base text-white font-medium mb-1">Eşleşen sanatçı bulunamadı</p>
            <p className="text-xs text-[#8e8e93]">Farklı bir tarz veya şehir seçerek tekrar deneyebilirsiniz.</p>
          </div>
        )}

      </div>
    </main>
  )
}
