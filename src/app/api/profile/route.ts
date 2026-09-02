import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { profileSchema } from '@/lib/validations';
import { z } from 'zod';

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'ARTIST' || !session.user.artistProfileId) {
      return NextResponse.json({ error: 'Oturum açmanız veya sanatçı profili gerekiyor' }, { status: 401 });
    }

    const profile = await prisma.artistProfile.findUnique({
      where: { id: session.user.artistProfileId },
      include: {
        styles: {
          include: { tattooStyle: true },
        },
        user: { select: { name: true, email: true, avatar: true } },
      },
    });

    if (!profile) {
      return NextResponse.json({ error: 'Profil bulunamadı' }, { status: 404 });
    }

    return NextResponse.json(profile);
  } catch (error) {
    console.error('Profile GET error:', error);
    return NextResponse.json({ error: 'Profil yüklenirken hata oluştu' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'ARTIST' || !session.user.artistProfileId) {
      return NextResponse.json({ error: 'Oturum açmanız veya sanatçı profili gerekiyor' }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = profileSchema.parse(body) as any;
    const { styles, name, avatar, ...profileData } = validatedData;

    // Update user name/avatar if provided
    if (name || avatar) {
      await prisma.user.update({
        where: { id: session.user.id },
        data: {
          ...(name && { name }),
          ...(avatar && { avatar }),
        },
      });
    }

    const updateData: any = { ...profileData };

    if (styles) {
      // First delete existing styles
      await prisma.artistStyle.deleteMany({
        where: { artistProfileId: session.user.artistProfileId },
      });

      // Then create new ones based on slugs
      const tattooStyles = await prisma.tattooStyle.findMany({
        where: { slug: { in: styles } }
      });

      if (tattooStyles.length > 0) {
        updateData.styles = {
          create: tattooStyles.map((ts: any) => ({
            tattooStyleId: ts.id,
          })),
        };
      }
    }

    const updatedProfile = await prisma.artistProfile.update({
      where: { id: session.user.artistProfileId },
      data: updateData,
      include: {
        styles: { include: { tattooStyle: true } },
        user: { select: { name: true, email: true, avatar: true } },
      },
    });

    return NextResponse.json(updatedProfile);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Geçersiz veri', details: error.errors }, { status: 400 });
    }
    console.error('Profile PATCH error:', error);
    return NextResponse.json({ error: 'Profil güncellenirken hata oluştu' }, { status: 500 });
  }
}
