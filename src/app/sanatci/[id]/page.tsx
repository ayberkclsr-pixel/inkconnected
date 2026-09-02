import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Star, MapPin, BadgeCheck } from 'lucide-react'
import ArtistPageClient from './ArtistPageClient'

export default async function ArtistDetailPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  
  const artist = await prisma.artistProfile.findUnique({
    where: { id: params.id },
    include: {
      user: true,
      styles: {
        include: {
          tattooStyle: true
        }
      },
      portfolioItems: {
        orderBy: { createdAt: 'desc' }
      },
      flashTattoos: {
        where: { isAvailable: true },
        orderBy: { createdAt: 'desc' }
      },
      reviews: {
        include: {
          customer: true
        },
        orderBy: { createdAt: 'desc' }
      }
    }
  })

  if (!artist) {
    notFound()
  }

  const averageRating = artist.reviews.length > 0
    ? (artist.reviews.reduce((acc, rev) => acc + rev.rating, 0) / artist.reviews.length).toFixed(1)
    : '5.0'

  const coverImage = artist.portfolioItems.length > 0 
    ? artist.portfolioItems[0].imageUrl 
    : '/images/studio-1.jpg'

  return (
    <main className="min-h-screen bg-transparent text-[#f5f5f7] pb-24">
      {/* Cover Image */}
      <div className="h-72 md:h-96 w-full relative bg-black">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${coverImage}')` }} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#000000]/60 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative -mt-28">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Sol Kolon: Sanatçı Profil Kartı */}
          <div className="lg:col-span-1">
            <div className="bg-[#101014] border border-white/[0.08] rounded-3xl p-6 sm:p-8 shadow-apple sticky top-28">
              
              {/* Avatar */}
              <div className="w-24 h-24 rounded-3xl border-2 border-white/20 overflow-hidden bg-[#1c1c1e] shadow-md mb-5">
                {artist.user?.avatar ? (
                  <Image src={artist.user.avatar} alt={artist.user.name} width={96} height={96} className="object-cover w-full h-full" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white text-2xl font-semibold">
                    {artist.user?.name?.charAt(0) || 'A'}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
                  {artist.user?.name}
                </h1>
                <BadgeCheck className="w-5 h-5 text-white" />
              </div>

              {artist.studioName && (
                <p className="text-xs text-[#8e8e93] mb-3">{artist.studioName}</p>
              )}

              {(artist.city || artist.district) && (
                <div className="flex items-center gap-1.5 text-xs text-[#636366] mb-5">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{artist.district ? `${artist.district}, ` : ''}{artist.city}</span>
                </div>
              )}

              {/* Rating & Stats */}
              <div className="grid grid-cols-2 gap-3 py-4 border-y border-white/[0.06] mb-6">
                <div>
                  <span className="text-[11px] text-[#8e8e93] block">Değerlendirme</span>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Star className="w-3.5 h-3.5 text-white fill-white" />
                    <span className="text-sm font-semibold text-white">{averageRating}</span>
                    <span className="text-xs text-[#636366]">({artist.reviews.length})</span>
                  </div>
                </div>
                <div>
                  <span className="text-[11px] text-[#8e8e93] block">Başlangıç</span>
                  <span className="text-sm font-semibold text-white mt-0.5 block">{artist.minPrice || 2500}₺</span>
                </div>
              </div>

              {/* Stiller */}
              <div className="mb-6">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#8e8e93] block mb-2.5">Stiller</span>
                <div className="flex flex-wrap gap-1.5">
                  {artist.styles?.map(s => (
                    <span key={s.tattooStyle.id} className="text-xs px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[#d1d1d6]">
                      {s.tattooStyle.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bio */}
              {artist.bio && (
                <div className="mb-6">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#8e8e93] block mb-2">Hakkında</span>
                  <p className="text-xs text-[#8e8e93] leading-relaxed">
                    {artist.bio}
                  </p>
                </div>
              )}

              {/* Randevu Aksiyonu */}
              <ArtistPageClient artistId={artist.id} artistName={artist.user.name}  />
            </div>
          </div>

          {/* Sağ Kolon: Portfolyo ve İncelemeler */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            
            {/* Portfolyo Galerisi */}
            <div className="bg-[#101014] border border-white/[0.08] rounded-3xl p-6 sm:p-8 shadow-apple">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/[0.06]">
                <h2 className="text-lg font-semibold text-white tracking-tight">İmza Portfolyo Eserleri</h2>
                <span className="text-xs text-[#8e8e93]">{artist.portfolioItems.length} Eser</span>
              </div>

              {artist.portfolioItems.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {artist.portfolioItems.map((item) => (
                    <div key={item.id} className="relative aspect-square rounded-2xl overflow-hidden bg-black group border border-white/[0.06]">
                      <Image 
                        src={item.imageUrl} 
                        alt={item.title || "Tattoo work"} 
                        fill 
                        className="object-cover transition-transform duration-500 group-hover:scale-105" 
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                        <span className="text-xs text-white font-medium truncate">{item.title}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-[#8e8e93]">Sanatçı henüz portfolyo görseli yüklemedi.</p>
              )}
            </div>

            {/* Değerlendirmeler */}
            <div className="bg-[#101014] border border-white/[0.08] rounded-3xl p-6 sm:p-8 shadow-apple">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/[0.06]">
                <h2 className="text-lg font-semibold text-white tracking-tight">Müşteri Yorumları</h2>
                <span className="text-xs text-[#8e8e93]">{artist.reviews.length} Değerlendirme</span>
              </div>

              {artist.reviews.length > 0 ? (
                <div className="flex flex-col gap-4">
                  {artist.reviews.map(rev => (
                    <div key={rev.id} className="p-4 rounded-2xl bg-[#151518] border border-white/[0.04]">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-white">{rev.customer?.name || "Müşteri"}</span>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-white fill-white" />
                          <span className="text-xs font-semibold text-white">{rev.rating}.0</span>
                        </div>
                      </div>
                      <p className="text-xs text-[#8e8e93] leading-relaxed">{rev.comment}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-[#8e8e93]">Bu sanatçı için henüz bir değerlendirme bulunmuyor.</p>
              )}
            </div>

          </div>

        </div>
      </div>
    </main>
  )
}

