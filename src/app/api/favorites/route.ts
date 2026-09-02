import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Oturum açmanız gerekiyor' }, { status: 401 });
    }

    const favorites = await prisma.favorite.findMany({
      where: { customerId: session.user.id },
      include: {
        artistProfile: {
          include: {
            user: { select: { name: true, avatar: true } },
            styles: { include: { tattooStyle: true } },
            reviews: { select: { rating: true } },
            _count: { select: { reviews: true } },
          },
        },
      },
    });

    const enrichedFavorites = favorites.map((fav: any) => {
      const artist = fav.artistProfile;
      const totalRating = artist.reviews.reduce((sum: number, rev: any) => sum + rev.rating, 0);
      const averageRating = artist.reviews.length > 0 ? totalRating / artist.reviews.length : 0;
      return { ...fav, artistProfile: { ...artist, averageRating } };
    });

    return NextResponse.json(enrichedFavorites);
  } catch (error) {
    console.error('Favorites GET error:', error);
    return NextResponse.json({ error: 'Favoriler yüklenirken hata oluştu' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Oturum açmanız gerekiyor' }, { status: 401 });
    }
    if (session.user.role !== 'CUSTOMER') {
      return NextResponse.json({ error: 'Sadece müşteriler favori ekleyebilir' }, { status: 403 });
    }

    const { artistProfileId } = await request.json();
    if (!artistProfileId) return NextResponse.json({ error: 'artistProfileId gerekli' }, { status: 400 });

    const existing = await prisma.favorite.findFirst({
      where: { customerId: session.user.id, artistProfileId }
    });
    if (!existing) {
      await prisma.favorite.create({
        data: { customerId: session.user.id, artistProfileId }
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Favorites POST error:', error);
    return NextResponse.json({ error: 'Favorilere eklenirken hata oluştu' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Oturum açmanız gerekiyor' }, { status: 401 });
    }
    
    let artistProfileId = new URL(request.url).searchParams.get('artistProfileId');
    if (!artistProfileId) {
      try {
        const body = await request.json();
        artistProfileId = body.artistProfileId;
      } catch (e) {}
    }

    if (!artistProfileId) return NextResponse.json({ error: 'artistProfileId gerekli' }, { status: 400 });

    await prisma.favorite.deleteMany({
      where: {
        customerId: session.user.id,
        artistProfileId
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Favorites DELETE error:', error);
    return NextResponse.json({ error: 'Favorilerden çıkarılırken hata oluştu' }, { status: 500 });
  }
}
