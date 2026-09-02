import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Oturum açmanız gerekiyor' }, { status: 401 });
    }

    const { id } = params;
    const body = await request.json();
    const { status } = body;

    const appointment = await prisma.appointment.findUnique({
      where: { id },
    });

    if (!appointment) {
      return NextResponse.json({ error: 'Randevu bulunamadı' }, { status: 404 });
    }

    if (session.user.role === 'ARTIST') {
      if (appointment.artistProfileId !== session.user.artistProfileId) {
        return NextResponse.json({ error: 'Yetkisiz işlem' }, { status: 403 });
      }
      if (!['APPROVED', 'REJECTED', 'COMPLETED'].includes(status)) {
         return NextResponse.json({ error: 'Geçersiz durum' }, { status: 400 });
      }
    } else {
      if (appointment.customerId !== session.user.id) {
        return NextResponse.json({ error: 'Yetkisiz işlem' }, { status: 403 });
      }
      if (status !== 'CANCELLED' || appointment.status !== 'PENDING') {
        return NextResponse.json({ error: 'Sadece bekleyen randevularınızı iptal edebilirsiniz' }, { status: 400 });
      }
    }

    const updated = await prisma.appointment.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Appointments PATCH error:', error);
    return NextResponse.json({ error: 'Durum güncellenirken bir hata oluştu' }, { status: 500 });
  }
}
