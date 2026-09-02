'use client'

import { useState } from 'react'
import Link from 'next/link'
import MessagingModal from '@/components/MessagingModal'

interface ArtistPageClientProps {
  artistId: string
  artistName: string
}

export default function ArtistPageClient({ artistId, artistName }: ArtistPageClientProps) {
  const [isMessagingOpen, setIsMessagingOpen] = useState(false)

  return (
    <>
      <div className="flex flex-col gap-3 w-full mt-2">
        <Link href={`/panel/randevular?artist=${artistId}`} className="btn-primary w-full text-center py-3">
          Randevu Al
        </Link>
        <button 
          onClick={() => setIsMessagingOpen(true)}
          className="bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl py-3 font-medium transition-colors"
        >
          Mesaj Gönder
        </button>
      </div>

      {isMessagingOpen && (
        <MessagingModal 
          artistProfileId={artistId} 
          artistName={artistName} 
          onClose={() => setIsMessagingOpen(false)} 
        />
      )}
    </>
  )
}
