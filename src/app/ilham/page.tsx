import { prisma } from "@/lib/prisma";
import FeedClient from "./FeedClient";

export const metadata = {
  title: "İlham | InkConnect",
  description: "Dövme sanatçılarından en son çalışmalar ve ilham verici tasarımlar.",
};

export const dynamic = 'force-dynamic';

export default async function IlhamPage() {
  const posts = await prisma.feedPost.findMany({
    include: {
      artistProfile: {
        include: {
          user: {
            select: {
              name: true,
              avatar: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const topArtists = await prisma.artistProfile.findMany({
    where: { isActive: true },
    take: 5,
    include: {
      user: {
        select: { name: true, avatar: true }
      }
    },
    orderBy: {
      reviews: { _count: 'desc' }
    }
  });

  // Convert Date objects to strings for Client Component serialization
  const serializedPosts = posts.map((post) => ({
    ...post,
    createdAt: post.createdAt.toISOString(),
  }));

  return (
    <div className="bg-[#0a0a1a] text-white">
      <FeedClient initialPosts={serializedPosts} topArtists={topArtists} />
    </div>
  );
}
