import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q');
    const city = searchParams.get('city');
    const style = searchParams.get('style');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const sortBy = searchParams.get('sortBy') || 'rating_desc';
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const skip = (page - 1) * limit;

    const where: any = {
      isActive: true,
    };

    if (q) {
      where.OR = [
        { user: { name: { contains: q } } },
        { studioName: { contains: q } },
      ];
    }

    if (city) {
      where.city = city;
    }

    if (minPrice || maxPrice) {
      where.AND = [];
      if (minPrice) {
        where.AND.push({ minPrice: { gte: parseInt(minPrice, 10) } });
      }
      if (maxPrice) {
        where.AND.push({ maxPrice: { lte: parseInt(maxPrice, 10) } });
      }
    }

    if (style) {
      where.styles = {
        some: {
          tattooStyle: {
            slug: style,
          },
        },
      };
    }

    let orderBy: any = {};
    switch (sortBy) {
      case 'price_asc':
        orderBy = { minPrice: 'asc' };
        break;
      case 'price_desc':
        orderBy = { minPrice: 'desc' };
        break;
      case 'experience_desc':
        orderBy = { experienceYears: 'desc' };
        break;
      default:
        break;
    }

    const total = await prisma.artistProfile.count({ where });

    const artists = await prisma.artistProfile.findMany({
      where,
      include: {
        user: {
          select: { name: true, avatar: true },
        },
        styles: {
          include: { tattooStyle: true },
        },
        portfolioItems: {
          take: 1,
        },
        reviews: {
          select: { rating: true },
        },
        _count: {
          select: { reviews: true },
        },
      },
      ...(Object.keys(orderBy).length > 0 ? { orderBy } : {}),
      skip,
      take: limit,
    });

    const artistsWithRating = artists.map((artist: any) => {
      const totalRating = artist.reviews.reduce((sum: number, review: any) => sum + review.rating, 0);
      const averageRating = artist.reviews.length > 0 ? totalRating / artist.reviews.length : 0;
      return { ...artist, averageRating };
    });

    if (sortBy === 'rating_desc') {
      artistsWithRating.sort((a: any, b: any) => b.averageRating - a.averageRating);
    }

    return NextResponse.json({
      artists: artistsWithRating,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error('Artists fetch error:', error);
    return NextResponse.json({ error: 'Sanatçılar yüklenirken bir hata oluştu' }, { status: 500 });
  }
}
