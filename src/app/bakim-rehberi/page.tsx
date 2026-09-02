import { Droplet, Sun, Wind, Ban } from 'lucide-react'

export const metadata = {
  title: 'Dövme Bakım Rehberi | InkConnect',
  description: 'Yeni dövmenizin kalitesini yıllarca koruması için altın kurallar ve bakım ipuçları.',
}

export default function CareGuidePage() {
  const steps = [
    {
      title: 'İlk 24 Saat',
      description: 'Sanatçınızın sardığı streci/bandajı minimum 3-4 saat (ideal olarak ertesi sabaha kadar) açmayın. Açtıktan sonra antibakteriyel sabunla nazikçe yıkayıp kağıt havluyla tampon hareketlerle kurulayın.',
      icon: Droplet,
      color: 'text-blue-400'
    },
    {
      title: 'Nemlendirme',
      description: 'Günde 2-3 kez, sanatçınızın önerdiği ince bir tabaka bakım kremini uygulayın. Dövmeyi "boğmamaya", cildin nefes almasına özen gösterin.',
      icon: Wind,
      color: 'text-[#06b6d4]'
    },
    {
      title: 'Güneşten Korunma',
      description: 'Dövmeniz tamamen iyileşene kadar (yaklaşık 3-4 hafta) doğrudan güneş ışığından uzak tutun. İyileştikten sonra bile her zaman yüksek faktörlü güneş kremi kullanın.',
      icon: Sun,
      color: 'text-amber-400'
    },
    {
      title: 'Kaşımayın, Soymayın',
      description: 'İyileşme sürecinde kabuklanma ve kaşıntı normaldir. Asla kabukları soymayın ve kaşımayın. Sadece hafifçe vurarak kaşıntıyı dindirin.',
      icon: Ban,
      color: 'text-red-400'
    }
  ]

  return (
    <main className="min-h-screen bg-[#0a0a1a] pt-32 pb-24">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#a855f7]/20 blur-[100px] pointer-events-none" />
          <h1 className="text-4xl md:text-6xl font-bold font-outfit mb-6 relative z-10">
            <span className="gradient-text">Dövme Bakım</span> Rehberi
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed relative z-10">
            Mürekkep teninize işlendiğinde sanatçının işi biter, ancak sizin sorumluluğunuz başlar. Eserin ömür boyu kusursuz görünmesi için altın kurallar.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="glass-card p-8 rounded-3xl group hover:border-[#a855f7]/30 transition-colors">
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <step.icon className={`w-8 h-8 ${step.color}`} />
              </div>
              <h2 className="text-2xl font-bold font-outfit text-white mb-4">{step.title}</h2>
              <p className="text-gray-300 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 glass-card p-8 md:p-12 rounded-3xl text-center border-dashed border-[#06b6d4]/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#a855f7]/10 to-[#06b6d4]/10" />
          <div className="relative z-10">
            <h2 className="text-2xl font-bold font-outfit text-white mb-4">Bir Sorun mu Var?</h2>
            <p className="text-gray-300 mb-8 max-w-xl mx-auto">
              Eğer dövmenizde aşırı kızarıklık, şişlik veya ısı artışı hissederseniz, hiç vakit kaybetmeden sanatçınıza veya bir doktora başvurun.
            </p>
            <a href="/kesfet" className="btn-primary inline-flex">
              Sanatçına Danış
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}
