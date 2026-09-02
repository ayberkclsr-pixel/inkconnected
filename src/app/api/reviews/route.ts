import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { reviewSchema } from '@/lib/validations';
import { z } from 'zod';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const artistProfileId = searchParams.get('artistProfileId');

    if (!artistProfileId) {
      return NextResponse.json({ error: 'artistProfileId gerekli' }, { status: 400 });
    }

    const reviews = await prisma.review.findMany({
      where: { artistProfileId },
      include: {
        customer: {
          select: { name: true, avatar: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(reviews);
  } catch (error) {
    console.error('Reviews GET error:', error);
    return NextResponse.json({ error: 'Yorumlar yüklenirken hata oluştu' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Oturum açmanız gerekiyor' }, { status: 401 });
    }

    if (session.user.role !== 'CUSTOMER') {
      return NextResponse.json({ error: 'Sadece müşteriler yorum yapabilir' }, { status: 403 });
    }

    const body = await request.json();
    const validatedData = reviewSchema.parse(body);

    const existingReview = await prisma.review.findFirst({
      where: {
        customerId: session.user.id,
        artistProfileId: validatedData.artistProfileId,
      },
    });

    if (existingReview) {
      return NextResponse.json({ error: 'Bu sanatçıya zaten yorum yaptınız' }, { status: 400 });
    }

    const review = await prisma.review.create({
      data: {
        ...validatedData,
        customerId: session.user.id,
      },
    });

    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Geçersiz veri formatı', details: error.errors }, { status: 400 });
    }
    console.error('Reviews POST error:', error);
    return NextResponse.json({ error: 'Yorum eklenirken hata oluştu' }, { status: 500 });
  }
}
