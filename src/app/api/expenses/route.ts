import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { z } from 'zod';

const expenseSchema = z.object({
  title: z.string().min(2, 'Başlık çok kısa'),
  amount: z.coerce.number().positive('Tutar 0\'dan büyük olmalı'),
  category: z.string().min(1, 'Kategori seçmelisiniz'),
});

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'ARTIST') {
      return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 });
    }

    const artistProfileId = session.user.artistProfileId;
    if (!artistProfileId) {
      return NextResponse.json({ error: 'Sanatçı profili bulunamadı' }, { status: 404 });
    }

    const expenses = await prisma.expense.findMany({
      where: {
        artistProfileId,
      },
      orderBy: {
        date: 'desc',
      },
    });

    return NextResponse.json(expenses);
  } catch (error) {
    console.error('Expenses GET error:', error);
    return NextResponse.json({ error: 'Giderler yüklenirken hata oluştu' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'ARTIST') {
      return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = expenseSchema.parse(body);

    const expense = await prisma.expense.create({
      data: {
        ...validatedData,
        artistProfileId: session.user.artistProfileId!,
      },
    });

    return NextResponse.json(expense, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Geçersiz veri', details: error.errors }, { status: 400 });
    }
    console.error('Expenses POST error:', error);
    return NextResponse.json({ error: 'Gider eklenirken hata oluştu' }, { status: 500 });
  }
}
