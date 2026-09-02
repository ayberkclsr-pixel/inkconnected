import Link from 'next/link'
import Image from 'next/image'
import { Star, MapPin, ArrowUpRight } from 'lucide-react'

interface ArtistCardProps {
  artist: any
}

export default function ArtistCard({ artist }: ArtistCardProps) {
  const averageRating = artist.reviews?.length > 0
    ? (artist.reviews.reduce((acc: number, rev: any) => acc + rev.rating, 0) / artist.reviews.length).toFixed(1)
    : '5.0'

  const coverImage = artist.portfolioItems?.length > 0 
    ? artist.portfolioItems[0].imageUrl 
    : '/images/studio-1.jpg'

  return (
    <Link href={`/sanatci/${artist.id}`} className="block h-full group">
      <div className="bg-[#121215] border border-white/[0.08] hover:border-white/[0.2] rounded-3xl overflow-hidden transition-all duration-300 flex flex-col h-full hover:shadow-apple-card-hover group-hover:-translate-y-1">
        
        {/* Cover Image */}
        <div className="h-52 relative overflow-hidden bg-black/40">
          <Image 
            src={coverImage} 
            alt={artist.user?.name || "Portfolio Cover"} 
            fill 
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121215] via-[#121215]/30 to-transparent" />
          
          <div className="absolute top-3.5 right-3.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1.5 border border-white/10">
            <Star className="w-3 h-3 text-white fill-white" />
            <span className="text-white text-xs font-semibold">{averageRating}</span>
          </div>

          <div className="absolute top-3.5 left-3.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white text-black p-1.5 rounded-full shadow-lg">
            <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex-grow flex flex-col relative -mt-6">
          {/* Avatar overlay */}
          <div className="w-14 h-14 rounded-2xl border-2 border-[#121215] overflow-hidden bg-[#1c1c1e] shadow-md mb-3">
            {artist.user?.avatar ? (
              <Image src={artist.user.avatar} alt={artist.user.name} width={56} height={56} className="object-cover w-full h-full" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-[#2c2c2e] to-[#1c1c1e] text-white font-semibold text-lg">
                {artist.user?.name?.charAt(0) || 'A'}
              </div>
            )}
          </div>

          <div>
            <h3 className="text-lg font-semibold tracking-tight text-white group-hover:text-gray-200 transition-colors line-clamp-1">
              {artist.user?.name}
            </h3>
            {artist.studioName && (
              <p className="text-xs text-[#8e8e93] font-normal line-clamp-1 mt-0.5">{artist.studioName}</p>
            )}
            
            {(artist.city || artist.district) && (
              <div className="flex items-center gap-1 text-[#636366] text-xs mt-2">
                <MapPin className="w-3 h-3" />
                <span>{artist.district ? `${artist.district}, ` : ''}{artist.city}</span>
              </div>
            )}
          </div>

          {/* Style pills */}
          <div className="flex flex-wrap gap-1.5 my-4">
            {artist.styles?.slice(0, 3).map((s: any) => (
              <span key={s.tattooStyle.id} className="text-[11px] px-2.5 py-1 rounded-full bg-white/[0.05] border border-white/[0.06] text-[#aeaeb2]">
                {s.tattooStyle.name}
              </span>
            ))}
            {artist.styles?.length > 3 && (
              <span className="text-[11px] px-2 py-1 rounded-full bg-white/[0.03] text-[#636366]">
                +{artist.styles.length - 3}
              </span>
            )}
          </div>

          <div className="mt-auto pt-4 border-t border-white/[0.06] flex items-center justify-between">
            <span className="text-[#8e8e93] text-xs">Başlangıç</span>
            <span className="text-base font-semibold text-white tracking-tight">{artist.minPrice || 2000}₺</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
