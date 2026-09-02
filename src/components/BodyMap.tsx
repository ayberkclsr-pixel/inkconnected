'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Check } from 'lucide-react'

const bodyParts = [
  { id: 'bas-boyun', label: 'Baş & Boyun', position: 'top-0 left-1/2 -translate-x-1/2' },
  { id: 'gogus', label: 'Göğüs', position: 'top-[15%] left-1/2 -translate-x-1/2' },
  { id: 'sirt', label: 'Sırt', position: 'top-[28%] left-1/2 -translate-x-1/2' },
  { id: 'sol-kol', label: 'Sol Kol', position: 'top-[25%] left-[10%]' },
  { id: 'sag-kol', label: 'Sağ Kol', position: 'top-[25%] right-[10%]' },
  { id: 'karin', label: 'Karın', position: 'top-[42%] left-1/2 -translate-x-1/2' },
  { id: 'sol-bacak', label: 'Sol Bacak', position: 'bottom-[20%] left-[20%]' },
  { id: 'sag-bacak', label: 'Sağ Bacak', position: 'bottom-[20%] right-[20%]' },
]

export default function BodyMap() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const selectedPart = searchParams.get('bolge')

  const handleSelect = (partId: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (selectedPart === partId) {
      params.delete('bolge')
    } else {
      params.set('bolge', partId)
    }
    router.push(`/kesfet?${params.toString()}`)
  }

  return (
    <div className="relative w-full max-w-sm mx-auto aspect-[1/1.5] glass-card rounded-3xl p-4 flex items-center justify-center border-[#a855f7]/30 overflow-hidden mt-6">
      <div className="absolute top-4 left-0 right-0 text-center">
        <p className="text-sm text-white font-bold font-outfit">Bölgeye Göre Ara</p>
      </div>

      {/* Background humanoid silhouette */}
      <div className="absolute inset-y-16 inset-x-8 opacity-10 flex items-center justify-center pointer-events-none">
        <div className="w-full h-full border-2 border-white rounded-[100px] border-dashed" />
      </div>

      {bodyParts.map((part) => (
        <button
          key={part.id}
          onClick={() => handleSelect(part.id)}
          className={`absolute ${part.position} px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-300 flex items-center gap-1 shadow-lg ${
            selectedPart === part.id
              ? 'bg-[#a855f7] text-white shadow-[0_0_15px_rgba(168,85,247,0.6)] scale-110 z-10'
              : 'bg-[#0a0a1a]/80 backdrop-blur-md border border-white/20 text-gray-300 hover:bg-white/10 hover:border-white/50'
          }`}
        >
          {selectedPart === part.id && <Check className="w-3 h-3" />}
          {part.label}
        </button>
      ))}
    </div>
  )
}
