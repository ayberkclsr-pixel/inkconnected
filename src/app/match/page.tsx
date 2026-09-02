import { prisma } from '@/lib/prisma'
import MatchClient from './MatchClient'
import { Flame } from 'lucide-react'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Tattoo Match AI Keşif - InkConnect',
  description: 'Dövme tasarımlarını kaydırın, stilinize en uygun sanatçıyla eşleşin.',
}

export default async function MatchPage() {
  // Fetch available flash tattoos with artist details
  const tattoos = await prisma.flashTattoo.findMany({
    where: { isAvailable: true },
    take: 24,
    include: {
      artistProfile: {
        include: {
          user: true,
          styles: {
            include: {
              tattooStyle: true
            }
          }
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  })

  // Shuffle for random swipe experience
  const shuffled = tattoos.sort(() => 0.5 - Math.random()).slice(0, 15)

  return (
    <main className="min-h-screen bg-[#070714] pt-20 pb-12 relative overflow-hidden flex flex-col items-center">
      {/* Background ambient lighting effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-[radial-gradient(ellipse_at_top,rgba(244,63,94,0.15)_0%,rgba(168,85,247,0.12)_45%,transparent_75%)] pointer-events-none blur-3xl" />
      <div className="absolute top-1/3 left-6 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-6 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="text-center z-10 mb-4 px-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-orange-500/15 via-rose-500/15 to-purple-500/15 border border-rose-500/30 text-rose-300 text-xs font-semibold uppercase tracking-wider mb-3 shadow-[0_0_15px_rgba(244,63,94,0.25)]">
          <Flame className="w-3.5 h-3.5 text-orange-400 animate-pulse" />
          <span>Tattoo Match AI Keşif</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-bold font-outfit mb-2 tracking-tight text-white">
          Tarzını Keşfet, <span className="gradient-text">Ustanla Eşleş</span>
        </h1>
        <p className="text-gray-400 text-xs md:text-sm max-w-md mx-auto">
          Tasarımları beğen veya geç; akıllı eşleşme algoritması senin için en ideal dövme sanatçısını bulsun.
        </p>
      </div>

      {/* Swipe Arena Container */}
      <div className="flex-1 w-full max-w-5xl px-4 flex items-center justify-center z-10">
        <MatchClient initialTattoos={shuffled as any} />
      </div>
    </main>
  )
}
