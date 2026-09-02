"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { CalendarDays, Send } from "lucide-react";

interface AppointmentFormProps {
  artistProfileId: string;
  artistName: string;
  onSuccess?: () => void;
}

export default function AppointmentForm({
  artistProfileId,
  artistName,
  onSuccess,
}: AppointmentFormProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [requestedDate, setRequestedDate] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  if (!session) {
    return (
      <div className="card p-6 text-center">
        <p className="text-gray-400 mb-3">
          Randevu alabilmek için giriş yapmanız gerekiyor.
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

    if (!requestedDate) {
      setError("Lütfen bir tarih seçin");
      return;
    }
    if (description.length < 10) {
      setError("Açıklama en az 10 karakter olmalıdır");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ artistProfileId, requestedDate, description }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Randevu talebi gönderilemedi");
      }

      setSuccess(true);
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
        <div className="text-green-400 font-medium mb-2">
          ✅ Randevu talebiniz gönderildi!
        </div>
        <p className="text-gray-400 text-sm">
          {artistName} talebinizi inceleyecek ve size dönüş yapacaktır.
        </p>
      </div>
    );
  }

  // Minimum date: tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  return (
    <form onSubmit={handleSubmit} className="card p-6 space-y-4">
      <h3 className="text-lg font-semibold text-white flex items-center gap-2">
        <CalendarDays className="w-5 h-5 text-ink-500" />
        Randevu Talebi
      </h3>

      <p className="text-sm text-gray-400">
        <strong className="text-gray-300">{artistName}</strong> ile randevu
        talep edin
      </p>

      <div>
        <label className="label">Tercih Ettiğiniz Tarih</label>
        <input
          type="date"
          className="input-field"
          value={requestedDate}
          onChange={(e) => setRequestedDate(e.target.value)}
          min={minDate}
          required
        />
      </div>

      <div>
        <label className="label">Ne Tür Bir Dövme İstiyorsunuz?</label>
        <textarea
          className="input-field min-h-[120px] resize-none"
          placeholder="Dövme fikrini, boyutunu, yerini ve varsa referans açıklamalarını yazın..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={1000}
          required
        />
        <p className="text-xs text-gray-500 mt-1">{description.length}/1000</p>
      </div>

      {error && (
        <p className="text-red-400 text-sm bg-red-500/10 rounded-lg p-3">
          {error}
        </p>
      )}

      <div className="bg-[#06b6d4]/10 border border-[#06b6d4]/30 rounded-xl p-4 text-sm text-[#06b6d4]">
        <strong>Not:</strong> Randevunuzun kesinleşmesi için sanatçının onayından sonra <strong>500₺ kapora</strong> ödemeniz gerekmektedir.
      </div>

      <button
        type="submit"
        disabled={loading || !requestedDate || !description}
        className="w-full btn-primary py-3 rounded-xl font-medium flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {loading ? "Gönderiliyor..." : "Randevu Talebi Gönder"}
        {!loading && <Send className="w-4 h-4" />}
      </button>
    </form>
  );
}
