import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const artistProfileId = searchParams.get('artistProfileId');

    if (!artistProfileId) {
      return NextResponse.json({ error: 'artistProfileId gerekli' }, { status: 400 });
    }

    const items = await prisma.portfolioItem.findMany({
      where: { artistProfileId },
      orderBy: { id: 'desc' },
    });

    return NextResponse.json(items);
  } catch (error) {
    console.error('Portfolio GET error:', error);
    return NextResponse.json({ error: 'Portfolyo yüklenirken bir hata oluştu' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Oturum açmanız gerekiyor' }, { status: 401 });
    }

    if (session.user.role !== 'ARTIST') {
      return NextResponse.json({ error: 'Bu işlem için yetkiniz yok' }, { status: 403 });
    }

    const body = await request.json();
    const { imageUrl, title, description, styleName, artistProfileId } = body;

    if (!imageUrl || !title) {
      return NextResponse.json({ error: 'Gerekli alanları doldurun' }, { status: 400 });
    }

    if (session.user.artistProfileId !== artistProfileId) {
      return NextResponse.json({ error: 'Sadece kendi profilinize ekleme yapabilirsiniz' }, { status: 403 });
    }

    const item = await prisma.portfolioItem.create({
      data: {
        imageUrl,
        title,
        description,
        styleName,
        artistProfileId,
      },
    });

    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    console.error('Portfolio POST error:', error);
    return NextResponse.json({ error: 'Portfolyo eklenirken bir hata oluştu' }, { status: 500 });
  }
}
