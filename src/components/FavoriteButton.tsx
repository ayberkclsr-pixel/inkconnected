"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface FavoriteButtonProps {
  artistProfileId: string;
  initialFavorited?: boolean;
  size?: "sm" | "md" | "lg";
}

export default function FavoriteButton({
  artistProfileId,
  initialFavorited = false,
  size = "md",
}: FavoriteButtonProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [isFavorited, setIsFavorited] = useState(initialFavorited);
  const [loading, setLoading] = useState(false);

  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const buttonSizeClasses = {
    sm: "p-1.5",
    md: "p-2",
    lg: "p-2.5",
  };

  const handleToggle = async () => {
    if (!session) {
      router.push("/giris");
      return;
    }

    if (session.user.role !== "CUSTOMER") return;

    setLoading(true);
    // Optimistic update
    setIsFavorited(!isFavorited);

    try {
      if (isFavorited) {
        // Remove favorite
        const res = await fetch(
          `/api/favorites?artistProfileId=${artistProfileId}`,
          { method: "DELETE" }
        );
        if (!res.ok) {
          setIsFavorited(true); // Revert
        }
      } else {
        // Add favorite
        const res = await fetch("/api/favorites", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ artistProfileId }),
        });
        if (!res.ok) {
          setIsFavorited(false); // Revert
        }
      }
    } catch {
      setIsFavorited(isFavorited); // Revert on error
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleToggle();
      }}
      disabled={loading}
      className={cn(
        "rounded-full transition-all duration-200 hover:scale-110",
        buttonSizeClasses[size],
        isFavorited
          ? "text-red-500 hover:text-red-400"
          : "text-gray-500 hover:text-red-400"
      )}
      title={isFavorited ? "Favorilerden çıkar" : "Favorilere ekle"}
    >
      <Heart
        className={cn(
          sizeClasses[size],
          isFavorited && "fill-current",
          loading && "animate-pulse"
        )}
      />
    </button>
  );
}
