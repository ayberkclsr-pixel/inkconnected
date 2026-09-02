"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Calendar } from "lucide-react";
import { useRouter } from "next/navigation";

type Post = {
  id: string;
  artistProfileId: string;
  imageUrl: string;
  caption: string | null;
  bodyPart: string | null;
  likes: number;
  createdAt: string;
  artistProfile: {
    user: {
      name: string;
      avatar: string | null;
    };
  };
};

type Artist = {
  id: string;
  user: {
    name: string;
    avatar: string | null;
  };
};

export default function FeedClient({ initialPosts, topArtists }: { initialPosts: Post[], topArtists: Artist[] }) {
  const [posts, setPosts] = useState(initialPosts);
  const router = useRouter();

  const handleLike = async (postId: string) => {
    try {
      // Optimistic update
      setPosts((currentPosts) =>
        currentPosts.map((post) =>
          post.id === postId ? { ...post, likes: post.likes + 1 } : post
        )
      );

      await fetch(`/api/feed/${postId}/like`, {
        method: "POST",
      });
      router.refresh();
    } catch (error) {
      console.error("Like error:", error);
    }
  };

  if (posts.length === 0) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-950">
        <p className="text-gray-400 font-outfit">İlham perileri şu an uykuda... Henüz gönderi bulunmuyor.</p>
      </div>
    );
  }

  return (
    <div className="h-screen w-full bg-[#0a0a1a] flex justify-center overflow-hidden relative">
      {/* CREATIVE BACKGROUND EFFECTS (OPTIMIZED FOR PERFORMANCE) */}
      {/* Animated Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] transform-gpu"></div>
      
      {/* Glowing Orbs (Replaced expensive blur filters with cheap radial gradients) */}
      <div className="hidden sm:block absolute top-[10%] left-[5%] w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.15)_0%,transparent_70%)] rounded-full pointer-events-none transform-gpu animate-float" />
      <div className="hidden sm:block absolute bottom-[10%] right-[5%] w-[700px] h-[700px] bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.15)_0%,transparent_70%)] rounded-full pointer-events-none transform-gpu" style={{ animation: 'float 15s ease-in-out infinite reverse' }} />
      <div className="hidden sm:block absolute top-[50%] left-[25%] w-[400px] h-[400px] bg-[radial-gradient(circle_at_center,rgba(236,72,153,0.08)_0%,transparent_70%)] rounded-full pointer-events-none transform-gpu animate-pulse" />

      {/* Left Sidebar - Top Artists */}
      <div className="hidden lg:flex absolute left-[5%] xl:left-[10%] top-1/2 -translate-y-1/2 flex-col gap-6 w-[280px] z-10">
        <div className="glass-card p-6 border-t border-[#a855f7]/30 shadow-[0_10px_40px_-10px_rgba(168,85,247,0.2)]">
          <h2 className="text-xl font-bold font-outfit text-white mb-6 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#a855f7] animate-glow-pulse"></span>
            Öne Çıkan Ustalar
          </h2>
          <div className="flex flex-col gap-5">
            {topArtists.map((artist) => (
              <Link key={artist.id} href={`/sanatci/${artist.id}`} className="flex items-center gap-3 group">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-[#a855f7] transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(168,85,247,0.5)] group-hover:scale-110">
                  <Image
                    src={artist.user.avatar || "/images/avatar-placeholder.png"}
                    alt={artist.user.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-white group-hover:text-[#06b6d4] transition-colors">{artist.user.name}</h3>
                  <p className="text-xs text-gray-400 group-hover:text-gray-300">Profili İncele &rarr;</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* New Widget: Haftanın İlhamı */}
        <div className="glass-card p-5 relative overflow-hidden group hover:border-pink-500/40 transition-colors transform-gpu">
           <div className="absolute -top-12 -right-12 w-32 h-32 bg-[radial-gradient(circle_at_center,rgba(236,72,153,0.3)_0%,transparent_70%)] rounded-full pointer-events-none" />
           <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">ğŸ”¥ Haftanın İlhamı</h3>
           <p className="text-white text-sm leading-relaxed">
             "Gerçek sanat, derinin altında yatan ruhu yüzeye çıkarmaktır."
           </p>
        </div>
      </div>

      {/* Right Sidebar - Suggested Tags */}
      <div className="hidden lg:flex absolute right-[5%] xl:right-[10%] top-1/2 -translate-y-1/2 flex-col gap-6 w-[280px] z-10">
        <div className="glass-card p-6 border-t border-[#06b6d4]/30 shadow-[0_10px_40px_-10px_rgba(6,182,212,0.2)]">
          <h2 className="text-xl font-bold font-outfit text-white mb-6 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#06b6d4] animate-glow-pulse"></span>
            Trend Aramalar
          </h2>
          <div className="flex flex-wrap gap-2">
            {['Minimalist', 'Blackwork', 'Dotwork', 'Realism', 'Watercolor', 'Kol', 'Sırt', 'Geleneksel'].map((tag) => (
              <Link 
                key={tag} 
                href={`/kesfet?q=${tag}`}
                className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300 hover:text-white hover:bg-[#06b6d4]/20 hover:border-[#06b6d4]/50 hover:shadow-[0_0_10px_rgba(6,182,212,0.3)] transition-all hover:-translate-y-0.5"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </div>
        
        <div className="glass-card p-6 relative overflow-hidden group">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?w=400&q=80')] bg-cover bg-center opacity-10 group-hover:opacity-20 transition-opacity duration-700 mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-[#a855f7]/40 to-[#06b6d4]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0"></div>
          <h2 className="text-lg font-bold font-outfit text-white mb-2 relative z-10 drop-shadow-md">
            Sanatını Paylaş
          </h2>
          <p className="text-sm text-gray-300 mb-5 relative z-10 drop-shadow-md">
            Sen de eserlerini burada sergilemek ve binlerce kişiye ulaşmak ister misin?
          </p>
          <Link href="/kayit" className="relative z-10 w-full py-2.5 bg-white text-black font-bold text-sm rounded-xl hover:bg-gray-200 transition-colors text-center block shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-105 transform duration-200">
            Hemen Başla
          </Link>
        </div>
      </div>

      {/* Main Feed Container */}
      <div className="h-full w-full max-w-[450px] snap-y snap-mandatory overflow-y-scroll hide-scrollbar relative z-20 sm:pt-24 sm:pb-12 transform-gpu" style={{ WebkitOverflowScrolling: 'touch' }}>
        {posts.map((post, index) => (
          <div
            key={post.id}
            className="relative w-full h-screen sm:h-[80vh] sm:rounded-[32px] snap-center bg-gray-900 overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.5)] border-0 sm:border border-white/10 mb-0 sm:mb-8 flex-shrink-0 transform-gpu"
          >
            {/* Background Image (Cover) */}
            <div className="absolute inset-0">
              <Image
                src={post.imageUrl || "/images/studio-1.jpg"}
                alt="Tattoo Feed"
                fill
                className="object-cover"
                priority={index === 0}
              />
              {/* Gradient overlay for readability */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/90" />
            </div>

            {/* Right Side Actions */}
            <div className="absolute bottom-28 right-4 flex flex-col items-center gap-6">
              <button
                onClick={() => handleLike(post.id)}
                className="group flex flex-col items-center gap-1 transition-transform active:scale-95"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white group-hover:bg-white/20">
                  <Heart className="h-6 w-6 transition-colors group-hover:text-red-500 group-hover:fill-red-500" />
                </div>
                <span className="text-sm font-semibold text-white drop-shadow-md">
                  {post.likes}
                </span>
              </button>
            </div>

            {/* Bottom Info Section */}
            <div className="absolute bottom-0 left-0 w-full p-6 pb-20 sm:pb-6">
              <div className="flex flex-col gap-3">
                <Link
                  href={`/sanatci/${post.artistProfileId}`}
                  className="flex items-center gap-3 w-fit group"
                >
                  <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-[#a855f7] group-hover:scale-105 transition-transform">
                    <Image
                      src={post.artistProfile.user.avatar || "/images/avatar-placeholder.png"}
                      alt={post.artistProfile.user.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white drop-shadow-md group-hover:text-[#a855f7] transition-colors">
                      {post.artistProfile.user.name}
                    </h3>
                  </div>
                </Link>

                {post.caption && (
                  <p className="max-w-[85%] text-sm text-gray-200 drop-shadow-md line-clamp-3">
                    {post.caption}
                  </p>
                )}

                <div className="flex items-center justify-between mt-2">
                  <div className="flex gap-2">
                    {post.bodyPart && (
                      <span className="inline-block rounded-full bg-white/10 border border-white/20 px-3 py-1 text-xs text-white backdrop-blur-md">
                        #{post.bodyPart.toLowerCase().replace(/\s+/g, "")}
                      </span>
                    )}
                  </div>

                  <Link
                    href={`/sanatci/${post.artistProfileId}?book=true`}
                    className="flex h-10 items-center gap-2 rounded-full bg-gradient-to-r from-[#a855f7] to-[#06b6d4] px-5 font-bold text-white transition-transform hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                  >
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">Randevu</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
