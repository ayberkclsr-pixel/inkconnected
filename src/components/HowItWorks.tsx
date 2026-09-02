import { ArrowRight, Compass, UserCheck, CalendarCheck } from 'lucide-react'

export default function HowItWorks() {
  const steps = [
    {
      id: '01',
      title: 'İlhamı Keşfet',
      description: 'Teninize kazınacak o eşsiz çizgiyi ararken, usta sanatçıların portfolyoları arasında gezinin.',
      icon: Compass,
    },
    {
      id: '02',
      title: 'Sanatçını Seç',
      description: 'Stil tercihinize ve konumunuza en uygun doğrulanmış dövme ustasını bulun.',
      icon: UserCheck,
    },
    {
      id: '03',
      title: 'Randevunu Al',
      description: 'Tarihinizi belirleyin ve hayalinizdeki eserin teninize işlenmesi için güvenle randevu oluşturun.',
      icon: CalendarCheck,
    },
  ]

  return (
    <div className="py-12 md:py-20 container mx-auto px-4">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-2xl md:text-4xl font-semibold tracking-tight text-white mb-3">
          Nasıl Çalışır?
        </h2>
        <p className="text-[#8e8e93] text-xs sm:text-sm md:text-base">
          Hayalinizdeki dövmeye ulaşmanın üç adımlı sade deneyimi.
        </p>
      </div>
      
      {/* 3'lü Apple Segment Grid with Flow Connectors */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
        {steps.map((step, idx) => {
          const Icon = step.icon
          const isNotLast = idx < steps.length - 1

          return (
            <div key={step.id} className="relative flex flex-col">
              <div className="bg-[#101014] border border-white/[0.08] hover:border-white/[0.18] rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 h-full group hover:shadow-apple-card-hover">
                
                {/* Top Row: Number, Icon and Step Indicator */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl sm:text-3xl font-bold font-display text-[#8e8e93] group-hover:text-white transition-colors">
                      {step.id}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-[#d1d1d6] group-hover:text-white group-hover:bg-white/[0.1] transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Desktop forward indicator on cards */}
                  {isNotLast ? (
                    <div className="hidden md:flex items-center gap-1 text-[#636366] group-hover:text-white transition-colors">
                      <span className="text-[11px] font-medium tracking-tight">Sonraki</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  ) : (
                    <div className="hidden md:flex items-center gap-1 text-emerald-400/80 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                      <span className="text-[10px] font-semibold tracking-tight">Son Adım</span>
                    </div>
                  )}
                </div>
                
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-white tracking-tight mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#8e8e93] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Mobile Downward Arrow Connector */}
              {isNotLast && (
                <div className="md:hidden flex justify-center py-2 text-[#636366]">
                  <div className="w-7 h-7 rounded-full bg-white/[0.05] border border-white/[0.08] flex items-center justify-center">
                    <ArrowRight className="w-3.5 h-3.5 rotate-90 text-[#8e8e93]" />
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
