"use client";

import { useState, useEffect } from "react";
import { formatPrice } from "@/lib/utils";
import { Zap, Ruler, MapPin } from "lucide-react";

export default function FlashMarketplace() {
  const [tattoos, setTattoos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTattoos();
  }, []);

  const fetchTattoos = async () => {
    try {
      const res = await fetch("/api/flash-tattoos");
      if (res.ok) {
        const data = await res.json();
        setTattoos(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleReserve = async (id: string) => {
    if (!confirm("Bu flash dövmeyi rezerve etmek istediğinize emin misiniz?"))
      return;

    try {
      const res = await fetch(`/api/flash-tattoos/${id}`, { method: "PUT" });
      if (res.ok) {
        alert("Başarıyla rezerve edildi!");
        fetchTattoos();
      } else {
        const data = await res.json();
        alert(data.error || "Rezervasyon başarısız.");
      }
    } catch (error) {
      console.error(error);
      alert("Bir hata oluştu.");
    }
  };

  return (
    <div className="page-container p-6 min-h-screen">
      <div className="text-center mb-12 mt-8">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 neon-text text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
          Flash Dövme Pazarı
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Sanatçıların özel olarak hazırladığı ve sadece bir kez yapılacak olan
          özgün tasarımları keşfet. Beğendiğin tasarımı hemen rezerve et!
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tattoos.map((tattoo) => (
            <div
              key={tattoo.id}
              className="glass-card card-hover bg-gray-900/40 backdrop-blur-md border border-gray-800/50 rounded-2xl overflow-hidden transition-all duration-300 hover:border-amber-500/50 hover:shadow-[0_0_15px_rgba(245,158,11,0.2)] flex flex-col"
            >
              <div className="relative group overflow-hidden">
                <img
                  src={tattoo.imageUrl}
                  alt={tattoo.title}
                  className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-gray-950/80 backdrop-blur px-3 py-1 rounded-full border border-amber-500/50 shadow-[0_0_10px_rgba(245,158,11,0.3)]">
                  <span className="text-amber-400 font-bold">
                    {formatPrice ? formatPrice(tattoo.price) : `${tattoo.price} ₺`}
                  </span>
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-white mb-3">
                  {tattoo.title}
                </h3>

                <div className="flex flex-col gap-2 mb-4 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <Ruler className="w-4 h-4 text-amber-500" />
                    <span>Boyut: {tattoo.size}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-amber-500" />
                    <span>Bölge: {tattoo.bodyPart}</span>
                  </div>
                </div>

                <p className="text-gray-300 text-sm mb-6 line-clamp-3 flex-grow">
                  {tattoo.description}
                </p>

                {tattoo.artistProfile?.user && (
                  <div className="flex items-center gap-3 mb-6 pt-4 border-t border-gray-800/50">
                    <img
                      src={
                        tattoo.artistProfile.user.avatar ||
                        "/images/avatar_male.jpg"
                      }
                      className="w-10 h-10 rounded-full border border-gray-700"
                      alt={tattoo.artistProfile.user.name}
                    />
                    <div>
                      <span className="block text-sm font-medium text-white">
                        {tattoo.artistProfile.user.name}
                      </span>
                      <span className="block text-xs text-gray-500">
                        Dövme Sanatçısı
                      </span>
                    </div>
                  </div>
                )}

                <button
                  onClick={() => handleReserve(tattoo.id)}
                  className="btn-primary w-full py-3 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-xl transition-all shadow-[0_0_10px_rgba(245,158,11,0.3)] hover:shadow-[0_0_20px_rgba(245,158,11,0.5)] flex items-center justify-center gap-2 mt-auto"
                >
                  <Zap className="w-5 h-5" />
                  Hemen Rezerve Et
                </button>
              </div>
            </div>
          ))}

          {tattoos.length === 0 && (
            <div className="col-span-full text-center py-20 text-gray-500">
              <Zap className="w-16 h-16 mx-auto mb-4 text-gray-700" />
              <p className="text-xl">
                Åu anda uygun flash dövme bulunmamaktadır.
              </p>
              <p className="mt-2 text-sm">
                Sanatçılar yeni tasarımlar yüklediğinde burada görünecek. Lütfen
                daha sonra tekrar kontrol et.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
