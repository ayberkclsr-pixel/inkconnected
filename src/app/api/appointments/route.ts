import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { appointmentSchema } from '@/lib/validations';
import { z } from 'zod';

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Oturum açmanız gerekiyor' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    let where: any = {};

    if (session.user.role === 'ARTIST') {
      where.artistProfileId = session.user.artistProfileId;
    } else {
      where.customerId = session.user.id;
    }

    if (status) {
      where.status = status;
    }

    const appointments = await prisma.appointment.findMany({
      where,
      include: {
        customer: {
          select: { id: true, name: true, email: true, avatar: true },
        },
        artistProfile: {
          include: {
            user: {
              select: { name: true, avatar: true },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(appointments);
  } catch (error) {
    console.error('Appointments GET error:', error);
    return NextResponse.json({ error: 'Randevular yüklenirken bir hata oluştu' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Oturum açmanız gerekiyor' }, { status: 401 });
    }

    if (session.user.role !== 'CUSTOMER') {
      return NextResponse.json({ error: 'Sadece müşteriler randevu alabilir' }, { status: 403 });
    }

    const body = await request.json();
    const validatedData = appointmentSchema.parse(body);

    const appointment = await prisma.appointment.create({
      data: {
        ...validatedData,
        customerId: session.user.id,
        status: 'PENDING',
        depositAmount: 500,
        depositPaid: false,
      },
    });

    return NextResponse.json(appointment, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Geçersiz veri', details: error.errors }, { status: 400 });
    }
    console.error('Appointments POST error:', error);
    return NextResponse.json({ error: 'Randevu oluşturulurken bir hata oluştu' }, { status: 500 });
  }
}
