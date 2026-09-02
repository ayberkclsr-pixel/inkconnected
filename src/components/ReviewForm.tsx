"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import StarRating from "./StarRating";
import { Send } from "lucide-react";

interface ReviewFormProps {
  artistProfileId: string;
  onSuccess?: () => void;
}

export default function ReviewForm({
  artistProfileId,
  onSuccess,
}: ReviewFormProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  if (!session) {
    return (
      <div className="card p-6 text-center">
        <p className="text-gray-400 mb-3">
          Yorum yapabilmek için giriş yapmanız gerekiyor.
        </p>
        <button
          onClick={() => router.push("/giris")}
          className="btn-primary text-sm"
        >
          Giriş Yap
        </button>
      </div>
    );
  }

  if (session.user.role !== "CUSTOMER") {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      setError("Lütfen bir puan verin");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ artistProfileId, rating, comment }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Yorum gönderilemedi");
      }

      setSuccess(true);
      setRating(0);
      setComment("");
      router.refresh();
      onSuccess?.();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="card p-6 text-center">
        <p className="text-green-400 font-medium">
          ✅ Yorumunuz başarıyla gönderildi!
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card p-6 space-y-4">
      <h3 className="text-lg font-semibold text-white">Yorum Yap</h3>

      <div>
        <label className="label">Puanınız</label>
        <StarRating value={rating} onChange={setRating} size="lg" />
      </div>

      <div>
        <label className="label">Yorumunuz (isteğe bağlı)</label>
        <textarea
          className="input-field min-h-[100px] resize-none"
          placeholder="Deneyiminizi paylaşın..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          maxLength={500}
        />
        <p className="text-xs text-gray-500 mt-1">{comment.length}/500</p>
      </div>

      {error && (
        <p className="text-red-400 text-sm bg-red-500/10 rounded-lg p-3">
          {error}
        </p>
      )}

      <button type="submit" className="btn-primary w-full" disabled={loading}>
        <Send className="w-4 h-4" />
        {loading ? "Gönderiliyor..." : "Yorum Gönder"}
      </button>
    </form>
  );
}
