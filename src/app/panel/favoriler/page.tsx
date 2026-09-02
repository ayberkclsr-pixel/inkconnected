import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import ArtistCard from '@/components/ArtistCard';
import Link from 'next/link';

export default async function FavoritesPage() {
  const session = await getServerSession(authOptions);
  
  if (session?.user.role !== 'CUSTOMER') {
    return <div className="text-red-500">Bu sayfaya erişim yetkiniz yok.</div>;
  }

  const favorites = await prisma.favorite.findMany({
    where: { customerId: session.user.id },
    include: {
      artistProfile: {
        include: {
          user: true,
          styles: { include: { tattooStyle: true } },
          reviews: true, portfolioItems: { take: 1 }
        }
      }
    }
  });

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-white">Favori Sanatçılarım</h1>

      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map(fav => (
            <div key={fav.artistProfile.id} className="relative">
              <ArtistCard artist={fav.artistProfile as any} />
              {/* Note: In a real implementation we'd need a client component to handle unfavorite logic */}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-gray-900 rounded-xl border border-gray-800">
          <p className="text-xl text-gray-400 mb-4">Henüz favori sanatçınız yok.</p>
          <Link href="/kesfet" className="btn-primary px-6 py-2 rounded-md font-semibold inline-block">
            Keşfetmeye Başla
          </Link>
        </div>
      )}
    </div>
  );
}
