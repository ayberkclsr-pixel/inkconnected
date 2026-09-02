import ChatClient from './ChatClient'
import { Sparkles, Bot, ShieldCheck } from 'lucide-react'

export const metadata = {
  title: 'AI Dövme Danışmanı - InkConnect',
  description: 'Yapay zeka destekli dövme danışmanı InkBot ile hayalinizdeki dövmeyi tasarlayın.',
}

export default function DanismanPage() {
  return (
    <main className="min-h-screen bg-transparent pt-24 pb-4 flex flex-col relative overflow-hidden text-[#f5f5f7]">
      {/* Apple Subtle Radial Illumination */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-apple-radial pointer-events-none" />
      
      <div className="container mx-auto px-2 md:px-4 flex-1 flex flex-col h-[calc(100vh-6.5rem)] max-w-5xl relative z-10">
        
        {/* Apple Segmented Header Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 mb-3 bg-[#0e0e11] border border-white/[0.08] rounded-2xl shadow-apple">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-9 h-9 rounded-xl bg-white/[0.08] border border-white/10 flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 border-2 border-[#0e0e11] rounded-full" />
            </div>
            
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm md:text-base font-semibold text-white tracking-tight">
                  InkBot AI Danışman
                </h1>
                <span className="text-[10px] uppercase font-semibold tracking-wider px-2 py-0.5 rounded-full bg-white/[0.08] text-[#d1d1d6] border border-white/10">
                  Neural v3.6
                </span>
              </div>
              <p className="text-xs text-[#8e8e93] hidden sm:block">
                Stil analizi, sanatçı eşleştirmesi ve saf beyaz zeminli stencil üretimi
              </p>
            </div>
          </div>

          {/* Badges */}
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs text-[#a1a1a6]">
              <ShieldCheck className="w-3.5 h-3.5 text-white" />
              <span>Stüdyo Onaylı</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-black text-xs font-medium shadow-sm">
              <Sparkles className="w-3 h-3" />
              <span>HD Stencil Çıktı</span>
            </div>
          </div>
        </div>

        {/* Chat Client Container */}
        <div className="flex-1 w-full relative flex flex-col mb-2 bg-[#0a0a0d] border border-white/[0.08] rounded-3xl shadow-apple overflow-hidden">
          <ChatClient />
        </div>

      </div>
    </main>
  )
}
