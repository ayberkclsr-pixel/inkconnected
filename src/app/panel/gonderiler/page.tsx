import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import GonderiForm from "./GonderiForm";
import Image from "next/image";
import { Trash2 } from "lucide-react";

export const metadata = {
  title: "İlham Gönderileri | Panel",
};

export default async function GonderilerPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user || session.user.role !== "ARTIST") {
    redirect("/panel");
  }

  const artistProfile = await prisma.artistProfile.findUnique({
    where: { userId: session.user.id },
  });

  if (!artistProfile) {
    redirect("/panel/profil");
  }

  const posts = await prisma.feedPost.findMany({
    where: { artistProfileId: artistProfile.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">İlham Gönderilerim</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Form Section */}
        <div className="card p-6">
          <h2 className="text-xl font-semibold text-white mb-4">
            Yeni Gönderi Paylaşş
          </h2>
          <GonderiForm />
        </div>

        {/* Existing Posts Section */}
        <div className="card p-6">
          <h2 className="text-xl font-semibold text-white mb-4">
            Geçmiş Gönderiler
          </h2>
          {posts.length === 0 ? (
            <p className="text-gray-400">Henüz gönderiniz bulunmuyor.</p>
          ) : (
            <div className="grid grid-cols-2 gap-4 max-h-[600px] overflow-y-auto pr-2">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="group relative aspect-[9/16] overflow-hidden rounded-lg bg-gray-800"
                >
                  <Image
                    src={post.imageUrl || "/images/studio-1.jpg"}
                    alt={post.caption || "Gönderi"}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100">
                    <div className="absolute bottom-0 left-0 p-3 w-full">
                      <p className="text-sm text-white line-clamp-2 mb-1">
                        {post.caption}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-gray-300">
                        <span className="font-semibold text-ink-500">
                          {post.likes} Beğeni
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
