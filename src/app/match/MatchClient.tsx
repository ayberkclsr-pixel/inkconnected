'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, X, Sparkles, MapPin, Undo2, Flame, BadgeCheck, Eye, Compass, Trophy } from 'lucide-react'

type Tattoo = {
  id: string
  title: string
  imageUrl: string
  price: number
  bodyPart?: string
  size?: string
  artistProfileId: string
  artistProfile: {
    user: {
      name: string
      avatar: string | null
    }
    city: string | null
    studioName: string | null
    styles?: {
      tattooStyle: {
        name: string
      }
    }[]
  }
}

export default function MatchClient({ initialTattoos }: { initialTattoos: Tattoo[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [scores, setScores] = useState<Record<string, number>>({})
  const [likedTattoos, setLikedTattoos] = useState<Tattoo[]>([])
  const [animatingDir, setAnimatingDir] = useState<'left' | 'right' | null>(null)
  
  const isFinished = currentIndex >= initialTattoos.length

  const handleAction = (direction: 'left' | 'right') => {
    if (animatingDir || isFinished || initialTattoos.length === 0) return
    
    setAnimatingDir(direction)
    const currentItem = initialTattoos[currentIndex]
    
    if (direction === 'right') {
      const artistId = currentItem.artistProfileId
      setScores(prev => ({
        ...prev,
        [artistId]: (prev[artistId] || 0) + 1
      }))
      setLikedTattoos(prev => [currentItem, ...prev])
    }

    setTimeout(() => {
      setCurrentIndex(prev => prev + 1)
      setAnimatingDir(null)
    }, 280)
  }

  // Undo feature
  const handleUndo = () => {
    if (currentIndex > 0 && !animatingDir) {
      const prevTattoo = initialTattoos[currentIndex - 1]
      setCurrentIndex(prev => prev - 1)
      // If was liked, remove from scores
      const artistId = prevTattoo.artistProfileId
      setScores(prev => ({
        ...prev,
        [artistId]: Math.max(0, (prev[artistId] || 1) - 1)
      }))
      setLikedTattoos(prev => prev.filter(t => t.id !== prevTattoo.id))
    }
  }

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handleAction('left')
      if (e.key === 'ArrowRight') handleAction('right')
      if (e.key === 'ArrowUp') handleUndo()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentIndex, animatingDir, isFinished])

  if (isFinished) {
    if (initialTattoos.length === 0) {
      return (
        <div className="glass-card p-10 text-center rounded-3xl border border-white/10 max-w-md">
          <p className="text-white text-lg">Şu an için eşleşecek yeni tasarım kalmadı.</p>
          <Link href="/kesfet" className="btn-primary mt-6 inline-block">Keşfete Dön</Link>
        </div>
      )
    }

    // Find top artist
    let bestMatchId = initialTattoos[0].artistProfileId
    let maxScore = -1
    Object.entries(scores).forEach(([id, score]) => {
      if (score > maxScore) {
        maxScore = score
        bestMatchId = id
      }
    })

    const bestArtistTattoo = initialTattoos.find(t => t.artistProfileId === bestMatchId)
    const artist = bestArtistTattoo?.artistProfile

    return (
      <div className="glass-card p-8 md:p-10 max-w-lg w-full text-center rounded-[32px] border border-cyan-500/30 bg-gradient-to-b from-[#0e0e22]/90 via-[#0a0a1a]/95 to-[#060610] shadow-[0_0_50px_rgba(6,182,212,0.25)] animate-fade-up relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-cyan-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 p-[2px] mx-auto mb-5 shadow-[0_0_30px_rgba(244,63,94,0.4)]">
          <div className="w-full h-full bg-[#0a0a1a] rounded-[14px] flex items-center justify-center">
            <Trophy className="w-10 h-10 text-amber-400 animate-bounce" />
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span>%98 Tarz Uyumu</span>
        </div>

        <h2 className="text-3xl font-extrabold font-outfit text-white mb-2">Ruh Eşini Bulduk!</h2>
        <p className="text-gray-300 text-sm mb-6 max-w-sm mx-auto">
          Kaydırdığın tasarımlara göre zevkine en çok hitap eden şaheserlerin ustası:
        </p>

        {artist && (
          <div className="bg-white/5 rounded-2xl p-5 border border-white/10 mb-6 text-left relative group hover:border-cyan-400/40 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-cyan-400 relative shrink-0 shadow-[0_0_15px_rgba(6,182,212,0.5)]">
                <Image 
                  src={artist.user.avatar || "/images/avatar_male.jpg"} 
                  alt={artist.user.name} 
                  fill 
                  className="object-cover" 
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-lg font-bold text-white truncate">{artist.user.name}</h3>
                  <BadgeCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                </div>
                <p className="text-xs text-gray-400">{artist.studioName || 'Özel Stüdyo'}</p>
                {artist.city && (
                  <p className="text-xs text-cyan-300/90 flex items-center gap-1 mt-1">
                    <MapPin className="w-3 h-3 text-rose-400" /> {artist.city}
                  </p>
                )}
              </div>
            </div>

            {artist.styles && artist.styles.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-white/10">
                {artist.styles.map(s => (
                  <span key={s.tattooStyle.name} className="text-[11px] px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-cyan-300">
                    {s.tattooStyle.name}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3">
          <Link href={`/sanatci/${bestMatchId}`} className="btn-primary flex-1 py-3 text-sm font-semibold flex items-center justify-center gap-2">
            <Eye className="w-4 h-4" /> Portfolyosunu İncele
          </Link>
          <button 
            onClick={() => {
              setCurrentIndex(0)
              setScores({})
              setLikedTattoos([])
            }}
            className="btn-secondary py-3 px-6 text-sm font-medium flex items-center justify-center gap-2"
          >
            <Undo2 className="w-4 h-4" /> Tekrar Başlat
          </button>
        </div>
      </div>
    )
  }

  const currentTattoo = initialTattoos[currentIndex]
  const nextTattoo = initialTattoos[currentIndex + 1]
  const progressPercent = ((currentIndex) / initialTattoos.length) * 100

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-8 w-full max-w-4xl py-2">
      
      {/* Sol / Ana Swipe Kart Alanı */}
      <div className="flex flex-col items-center">
        
        {/* Progress Bar & Kart Sayacı */}
        <div className="w-full max-w-[420px] mb-3 flex items-center justify-between px-2 text-xs text-gray-400">
          <span className="font-medium text-white">{currentIndex + 1} / {initialTattoos.length} Tasarım</span>
          <div className="w-32 h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-orange-500 via-rose-500 to-purple-500 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* 3D Stack Kart Yapısı (Büyük & Uzatılmış Boyut) */}
        <div className="relative w-[340px] sm:w-[420px] h-[580px] sm:h-[620px] select-none">
          
          {/* Arkadaki Kart (Derinlik Efekti) */}
          {nextTattoo && (
            <div className="absolute inset-0 rounded-[28px] overflow-hidden shadow-2xl bg-[#0e0e1e] border border-white/5 scale-95 opacity-40 translate-y-4 z-0 pointer-events-none transition-all duration-300">
              <Image 
                src={nextTattoo.imageUrl} 
                alt="Next Tattoo" 
                fill 
                className="object-cover filter blur-[1px]" 
              />
              <div className="absolute inset-0 bg-black/40" />
            </div>
          )}

          {/* Aktif Kaydırılan Kart */}
          <div 
            className={`absolute inset-0 rounded-[28px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] bg-[#0d0d1f] border border-white/15 z-10 transition-all duration-300 ease-out flex flex-col ${
              animatingDir === 'left' ? '-translate-x-full -rotate-12 opacity-0' : 
              animatingDir === 'right' ? 'translate-x-full rotate-12 opacity-0' : 
              'translate-x-0 rotate-0 opacity-100 scale-100'
            }`}
          >
            {/* Fotoğraf Alanı */}
            <div className="relative flex-1 w-full h-full">
              <Image 
                src={currentTattoo.imageUrl} 
                alt={currentTattoo.title} 
                fill 
                className="object-cover"
                priority
              />

              {/* Swipe Durum Rozeti (Sağa/Sola giderken parlar) */}
              {animatingDir === 'right' && (
                <div className="absolute top-6 left-6 z-30 px-4 py-1.5 rounded-xl bg-emerald-500 text-white font-extrabold text-lg uppercase tracking-wider border-2 border-white shadow-2xl rotate-[-12deg] animate-pulse">
                  BEĞENDİM ❤️
                </div>
              )}
              {animatingDir === 'left' && (
                <div className="absolute top-6 right-6 z-30 px-4 py-1.5 rounded-xl bg-rose-600 text-white font-extrabold text-lg uppercase tracking-wider border-2 border-white shadow-2xl rotate-[12deg] animate-pulse">
                  GEÇTİM ✖
                </div>
              )}

              {/* Üst Bilgi Rozetleri */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20 pointer-events-none">
                {currentTattoo.bodyPart ? (
                  <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs font-semibold text-cyan-300">
                    Bölge: {currentTattoo.bodyPart}
                  </span>
                ) : <span />}

                <span className="px-3 py-1 rounded-full bg-gradient-to-r from-purple-600/80 to-pink-600/80 backdrop-blur-md border border-white/20 text-xs font-bold text-white shadow-md">
                  {currentTattoo.price} ₺
                </span>
              </div>

              {/* Alt Karartma Gradyanı */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#090915] via-[#090915]/50 to-transparent z-10" />
              
              {/* Alt Bilgi Paneli */}
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                <h3 className="text-2xl font-bold font-outfit text-white mb-1.5 drop-shadow-md">
                  {currentTattoo.title}
                </h3>
                
                {/* Sanatçı Mini Profili */}
                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full overflow-hidden relative border-2 border-cyan-400/80 shadow-md">
                      <Image 
                        src={currentTattoo.artistProfile.user.avatar || "/images/avatar_male.jpg"} 
                        alt={currentTattoo.artistProfile.user.name} 
                        fill 
                        className="object-cover" 
                      />
                    </div>
                    <div>
                      <p className="text-sm text-white font-semibold flex items-center gap-1">
                        {currentTattoo.artistProfile.user.name}
                        <BadgeCheck className="w-4 h-4 text-cyan-400 inline" />
                      </p>
                      <p className="text-xs text-gray-400 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-rose-400" />
                        {currentTattoo.artistProfile.city || 'İstanbul'} • {currentTattoo.artistProfile.studioName || 'Özel Stüdyo'}
                      </p>
                    </div>
                  </div>

                  <Link 
                    href={`/sanatci/${currentTattoo.artistProfileId}`}
                    className="p-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-all hover:scale-105"
                    title="Sanatçı Profilini Gör"
                  >
                    <Eye className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Kontrol Butonları */}
        <div className="flex items-center justify-center gap-6 mt-6">
          {/* Geri Al (Undo) */}
          <button 
            onClick={handleUndo}
            disabled={currentIndex === 0 || animatingDir !== null}
            className="w-12 h-12 rounded-full bg-white/5 border border-white/10 hover:border-amber-400/50 hover:bg-amber-400/10 text-amber-300 flex items-center justify-center transition-all disabled:opacity-30 disabled:pointer-events-none hover:scale-105 active:scale-95 shadow-md"
            title="Geri Al (Yukarı Ok)"
          >
            <Undo2 className="w-5 h-5" />
          </button>

          {/* Pas Geç (Dislike) */}
          <button 
            onClick={() => handleAction('left')}
            disabled={animatingDir !== null}
            className="w-16 h-16 rounded-full bg-white/5 border border-rose-500/30 hover:border-rose-500 hover:bg-rose-500/15 text-rose-400 flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-[0_0_20px_rgba(244,63,94,0.2)]"
            title="Geç (Sol Ok)"
          >
            <X className="w-8 h-8" />
          </button>

          {/* Beğen (Like) */}
          <button 
            onClick={() => handleAction('right')}
            disabled={animatingDir !== null}
            className="w-16 h-16 rounded-full bg-gradient-to-tr from-rose-500 to-purple-600 hover:from-rose-400 hover:to-purple-500 text-white flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-[0_0_25px_rgba(244,63,94,0.5)]"
            title="Beğen (Sağ Ok)"
          >
            <Heart className="w-8 h-8" fill="currentColor" />
          </button>
        </div>

        <p className="text-[11px] text-gray-500 mt-3 text-center">
          💡 İpucu: Klavyedeki <strong>Sol (←)</strong> ve <strong>Sağ (→)</strong> ok tuşlarıyla da kaydırabilirsin.
        </p>
      </div>

      {/* Sağ Panel: Canlı Beğenilenler Listesi */}
      <div className="hidden lg:flex flex-col w-72 h-[620px] glass-card rounded-3xl p-5 border border-white/10 bg-white/[0.02] backdrop-blur-xl">
        <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
          <h4 className="text-sm font-bold text-white flex items-center gap-1.5 font-outfit">
            <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
            Beğendiklerin ({likedTattoos.length})
          </h4>
          <span className="text-[10px] text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded-full border border-cyan-400/20">
            Canlı
          </span>
        </div>

        {likedTattoos.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-4 text-gray-500">
            <Sparkles className="w-8 h-8 text-gray-600 mb-2" />
            <p className="text-xs">Sağa kaydırdığın dövmeler burada birikecek.</p>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto space-y-3 custom-scrollbar pr-1">
            {likedTattoos.map((tattoo) => (
              <div 
                key={tattoo.id}
                className="flex items-center gap-3 p-2 rounded-2xl bg-white/[0.04] border border-white/5 hover:border-cyan-400/30 transition-all hover:bg-white/[0.08] group"
              >
                <div className="w-12 h-12 rounded-xl overflow-hidden relative shrink-0 border border-white/10">
                  <Image src={tattoo.imageUrl} alt={tattoo.title} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-white truncate">{tattoo.title}</p>
                  <p className="text-[11px] text-gray-400 truncate">{tattoo.artistProfile.user.name}</p>
                  <span className="text-[10px] text-purple-400 font-semibold">{tattoo.price} ₺</span>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="pt-3 border-t border-white/10 text-center">
          <Link href="/kesfet" className="text-xs text-cyan-400 hover:underline flex items-center justify-center gap-1">
            <Compass className="w-3.5 h-3.5" /> Tüm Sanatçıları Keşfet
          </Link>
        </div>
      </div>

    </div>
  )
}
