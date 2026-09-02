'use client';

import { useState, useRef } from 'react';
import { Upload, Sliders, Image as ImageIcon, Move, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

const TATTOOS = [
  { id: 1, name: 'Minimalist Pusula', src: '/images/portfolio_1.jpg' },
  { id: 2, name: 'Kafatas & Gül Realizm', src: '/images/portfolio_2.jpg' },
  { id: 3, name: 'Renkli Karakter', src: '/images/portfolio_3.jpg' },
  { id: 4, name: 'Viktoryen Gotik Desen', src: '/images/portfolio_4.jpg' },
  { id: 5, name: 'Geometrik Çizgi & Ay', src: '/images/portfolio_5.jpg' },
  { id: 6, name: 'Japon Ejderha Motifi', src: '/images/portfolio_6.jpg' },
];

const PRESET_BODY_CANVASES = [
  { id: 'arm', name: 'Örnek Ön Kol Tuvali', src: '/images/studio-1.jpg' },
  { id: 'chest', name: 'Örnek Göğüs & Omuz', src: '/images/studio-2.jpg' },
  { id: 'back', name: 'Örnek Sırt Tuvali', src: '/images/studio-3.jpg' },
];

export default function ARTryOnPage() {
  const [bgImage, setBgImage] = useState<string | null>('/images/studio-1.jpg');
  const [selectedTattoo, setSelectedTattoo] = useState<string | null>(TATTOOS[0].src);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [isDragging, setIsDragging] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setBgImage(url);
    }
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if (!selectedTattoo) return;
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    const clampedX = Math.max(0, Math.min(100, x));
    const clampedY = Math.max(0, Math.min(100, y));
    
    setPosition({ x: clampedX, y: clampedY });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-12 relative overflow-hidden flex flex-col items-center">
      <div className="z-10 w-full max-w-6xl mt-16 md:mt-8">
        <header className="mb-12 text-center space-y-4">
          <div className="inline-flex items-center justify-center p-1.5 mb-2 rounded-full bg-white/[0.05] border border-white/10 shadow-xl">
            <span className="px-4 py-1 rounded-full text-xs font-semibold tracking-wider text-white uppercase">Sanal Dövme Simülatörü</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
            Dijital Teninizde Deneyin
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
            Mürekkebin teninizde nasıl duracağını önceden görün. Hazır tuvali kullanın veya kendi fotoğrafınızı yükleyin.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <div className="relative p-1 rounded-3xl bg-[#121215] border border-white/10 shadow-2xl">
              <div 
                ref={containerRef}
                className="relative w-full aspect-[3/4] md:aspect-[4/3] bg-black rounded-[22px] overflow-hidden flex items-center justify-center"
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                style={{ touchAction: 'none' }}
              >
                {!bgImage ? (
                  <div className="text-center p-8">
                    <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4 border border-white/10">
                      <ImageIcon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-medium text-white mb-2">Tuvalinizi Belirleyin</h3>
                    <p className="text-gray-400 mb-6 text-sm max-w-sm mx-auto">Vücudunuzda denemek istediğiniz bölgenin fotoğrafını yükleyin.</p>
                    <label className="btn-primary inline-flex items-center gap-2 cursor-pointer">
                      <Upload className="w-4 h-4" />
                      <span>Fotoğraf Yükle</span>
                      <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                    </label>
                  </div>
                ) : (
                  <>
                    <img src={bgImage} alt="Body canvas" className="w-full h-full object-cover" draggable={false} />
                    
                    {selectedTattoo && (
                      <div 
                        className={cn(
                          "absolute cursor-move transition-transform duration-75 select-none",
                          isDragging ? "opacity-90 scale-105 drop-shadow-2xl" : "opacity-95"
                        )}
                        style={{
                          left: `${position.x}%`,
                          top: `${position.y}%`,
                          transform: `translate(-50%, -50%) scale(${scale})`,
                          mixBlendMode: 'screen'
                        }}
                      >
                        <img 
                          src={selectedTattoo} 
                          alt="Tattoo Overlay" 
                          className="max-w-[200px] md:max-w-[280px] h-auto pointer-events-none rounded-xl border border-white/20 shadow-2xl"
                          draggable={false}
                        />
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Hazır Tuval Seçenekleri */}
            <div className="flex items-center gap-3 mt-4 overflow-x-auto pb-2">
              <span className="text-xs text-gray-400 shrink-0 font-medium">Hazır Tuval Seç:</span>
              {PRESET_BODY_CANVASES.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setBgImage(c.src)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all shrink-0 ${
                    bgImage === c.src
                      ? 'bg-white text-black border-white'
                      : 'bg-white/5 border-white/10 text-gray-300 hover:text-white'
                  }`}
                >
                  {c.name}
                </button>
              ))}
              <label className="px-3 py-1.5 rounded-full text-xs font-medium bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all shrink-0 cursor-pointer flex items-center gap-1">
                <Upload className="w-3 h-3" />
                <span>Kendi Fotoğrafını Yükle</span>
                <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
              </label>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="p-6 rounded-3xl bg-[#121215] border border-white/10 shadow-2xl">
              <h3 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-white" />
                Tasarım Koleksiyonundan Seç
              </h3>
              
              <div className="grid grid-cols-3 gap-3">
                {TATTOOS.map((tattoo) => (
                  <button
                    key={tattoo.id}
                    onClick={() => setSelectedTattoo(tattoo.src)}
                    className={cn(
                      "relative aspect-square rounded-xl overflow-hidden border transition-all duration-200",
                      selectedTattoo === tattoo.src 
                        ? "border-white shadow-lg scale-105 ring-2 ring-white/50" 
                        : "border-white/10 hover:border-white/30 bg-black/50"
                    )}
                  >
                    <img src={tattoo.src} alt={tattoo.name} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-[#121215] border border-white/10 shadow-2xl">
              <h3 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-white" />
                Ölçek ve Konum
              </h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-medium text-gray-400 mb-2">
                    <span>Boyut</span>
                    <span className="text-white font-semibold">{Math.round(scale * 100)}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="0.4" 
                    max="2.0" 
                    step="0.05" 
                    value={scale}
                    onChange={(e) => setScale(parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"
                  />
                </div>

                <div className="p-3 bg-white/[0.03] rounded-xl border border-white/5">
                  <div className="flex items-start gap-2 text-xs text-gray-400">
                    <Move className="w-4 h-4 text-white shrink-0 mt-0.5" />
                    <p className="leading-relaxed">Dövmeyi taşımak için üzerine basılı tutarak sürükleyin.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
