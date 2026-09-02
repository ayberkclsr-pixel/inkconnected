"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, ImagePlus } from "lucide-react";

export default function GonderiForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const caption = formData.get("caption") as string;
    const bodyPart = formData.get("bodyPart") as string;

    try {
      const res = await fetch("/api/feed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageUrl,
          caption,
          bodyPart,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Bir hata oluştu.");
      }

      // Reset form
      const form = e.target as HTMLFormElement;
      form.reset();
      setImageUrl("");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="rounded-md bg-red-500/10 p-3 text-sm text-red-500">
          {error}
        </div>
      )}

      <div className="space-y-2">
        <label htmlFor="imageUrl" className="label">
          Görsel URL (16:9 Dikey Format Önerilir)
        </label>
        <div className="flex gap-2">
          <input
            type="url"
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="input-field flex-1"
            placeholder="https://ornek.com/resim.jpg"
            required
          />
        </div>
        {imageUrl && (
          <div className="relative mt-2 aspect-[9/16] w-32 overflow-hidden rounded-md border border-gray-700 bg-gray-900">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageUrl}
              alt="Önizleme"
              className="h-full w-full object-cover"
              onError={(e) => {
                e.currentTarget.src = "/images/studio-1.jpg";
              }}
            />
          </div>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="caption" className="label">
          Açıklama
        </label>
        <textarea
          id="caption"
          name="caption"
          rows={3}
          className="input-field resize-none"
          placeholder="Çalışmanız hakkında bir şeyler yazın..."
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="bodyPart" className="label">
          Bölge
        </label>
        <input
          type="text"
          id="bodyPart"
          name="bodyPart"
          className="input-field"
          placeholder="Örn: Kol, Sırt, Bacak"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading || !imageUrl}
        className="btn-primary w-full"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Paylaşşılıyor...
          </>
        ) : (
          "Gönderiyi Paylaşş"
        )}
      </button>
    </form>
  );
}
