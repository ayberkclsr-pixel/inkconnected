import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Oturum açmanız gerekiyor' }, { status: 401 });
    }

    if (session.user.role !== 'ARTIST') {
      return NextResponse.json({ error: 'Bu işlem için yetkiniz yok' }, { status: 403 });
    }

    const { id } = params;

    const item = await prisma.portfolioItem.findUnique({
      where: { id },
    });

    if (!item) {
      return NextResponse.json({ error: 'Öğe bulunamadı' }, { status: 404 });
    }

    if (item.artistProfileId !== session.user.artistProfileId) {
      return NextResponse.json({ error: 'Bu öğeyi silme yetkiniz yok' }, { status: 403 });
    }

    await prisma.portfolioItem.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Öğe başarıyla silindi' });
  } catch (error) {
    console.error('Portfolio DELETE error:', error);
    return NextResponse.json({ error: 'Silme işlemi sırasında bir hata oluştu' }, { status: 500 });
  }
}
