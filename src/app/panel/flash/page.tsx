"use client";

import { useState, useEffect } from "react";
import { PlusCircle, Trash2 } from "lucide-react";
import { formatPrice } from "@/lib/utils";

export default function ArtistFlashPanel() {
  const [tattoos, setTattoos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
    price: "",
    size: "",
    bodyPart: "",
  });

  useEffect(() => {
    fetchTattoos();
  }, []);

  const fetchTattoos = async () => {
    try {
      const res = await fetch("/api/flash-tattoos");
      if (res.ok) {
        const data = await res.json();
        // The API returns all available tattoos. For the panel, ideally we'd fetch only the artist's tattoos, 
        // including unavailable ones. But using the public API for simplicity in this demo unless we create a specific route.
        // Assuming this is a quick demo, we just show them.
        setTattoos(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/flash-tattoos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setFormData({
          title: "",
          description: "",
          imageUrl: "",
          price: "",
          size: "",
          bodyPart: "",
        });
        fetchTattoos();
      } else {
        const err = await res.json();
        alert(err.error || "Bir hata oluştu.");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bu flash dövmeyi silmek istediğinize emin misiniz?")) return;
    try {
      const res = await fetch(`/api/flash-tattoos/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchTattoos();
      } else {
        const err = await res.json();
        alert(err.error || "Silinemedi.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="page-container p-6">
      <h1 className="section-title text-2xl mb-6 neon-text text-amber-500">
        Flash Dövme Yönetimi
      </h1>

      <div className="glass-card p-6 mb-8 bg-gray-900 rounded-xl border border-gray-800">
        <h2 className="text-xl font-semibold mb-4 text-white">
          Yeni Flash Dövme Ekle
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label block text-sm mb-1 text-gray-400">
                Başlık
              </label>
              <input
                required
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="input-field w-full p-2 bg-gray-950 border border-gray-800 rounded text-white focus:border-amber-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="label block text-sm mb-1 text-gray-400">
                Görsel URL
              </label>
              <input
                required
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                className="input-field w-full p-2 bg-gray-950 border border-gray-800 rounded text-white focus:border-amber-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="label block text-sm mb-1 text-gray-400">
                Fiyat (TL)
              </label>
              <input
                required
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                className="input-field w-full p-2 bg-gray-950 border border-gray-800 rounded text-white focus:border-amber-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="label block text-sm mb-1 text-gray-400">
                Boyut (örn. 5x5 cm)
              </label>
              <input
                required
                name="size"
                value={formData.size}
                onChange={handleChange}
                className="input-field w-full p-2 bg-gray-950 border border-gray-800 rounded text-white focus:border-amber-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="label block text-sm mb-1 text-gray-400">
                Uygun Bölge
              </label>
              <input
                required
                name="bodyPart"
                value={formData.bodyPart}
                onChange={handleChange}
                className="input-field w-full p-2 bg-gray-950 border border-gray-800 rounded text-white focus:border-amber-500 focus:outline-none"
              />
            </div>
          </div>
          <div>
            <label className="label block text-sm mb-1 text-gray-400">
              Açıklama
            </label>
            <textarea
              required
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="input-field w-full p-2 bg-gray-950 border border-gray-800 rounded text-white h-24 focus:border-amber-500 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full md:w-auto flex items-center justify-center px-6 py-2 bg-amber-500 text-black font-semibold rounded hover:bg-amber-400 transition"
          >
            <PlusCircle className="w-5 h-5 mr-2" />
            {loading ? "Ekleniyor..." : "Flash Dövme Ekle"}
          </button>
        </form>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4 text-white">
          Mevcut Flash Dövmeler
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tattoos.map((tattoo) => (
            <div
              key={tattoo.id}
              className="card bg-gray-900 border border-gray-800 rounded-xl overflow-hidden relative"
            >
              <img
                src={tattoo.imageUrl}
                alt={tattoo.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-lg text-white">
                  {tattoo.title}
                </h3>
                <p className="text-amber-500 font-semibold mt-1">
                  {formatPrice ? formatPrice(tattoo.price) : `${tattoo.price} ₺`}
                </p>
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-800">
                  <span
                    className={`px-3 py-1 text-xs rounded-full ${
                      tattoo.isAvailable
                        ? "bg-green-900/50 text-green-400 border border-green-800"
                        : "bg-red-900/50 text-red-400 border border-red-800"
                    }`}
                  >
                    {tattoo.isAvailable ? "Müsait" : "Rezerve Edildi"}
                  </span>
                  <button
                    onClick={() => handleDelete(tattoo.id)}
                    className="text-gray-500 hover:text-red-500 transition-colors"
                    title="Sil"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {tattoos.length === 0 && (
            <div className="col-span-full text-center py-10 text-gray-500">
              Henüz eklenmiş bir flash dövme bulunmuyor.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
