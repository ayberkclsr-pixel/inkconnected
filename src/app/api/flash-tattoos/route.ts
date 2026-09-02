import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const flashTattoos = await prisma.flashTattoo.findMany({
      where: { isAvailable: true },
      include: {
        artistProfile: {
          include: {
            user: {
              select: { name: true, avatar: true },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(flashTattoos);
  } catch (error) {
    console.error("Flash Tattoos GET Error:", error);
    return NextResponse.json(
      { error: "Flash dövmeler getirilirken bir hata oluştu." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "ARTIST") {
      return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 401 });
    }

    const artistProfile = await prisma.artistProfile.findUnique({
      where: { userId: (session.user as any).id },
    });

    if (!artistProfile) {
      return NextResponse.json(
        { error: "Sanatçı profili bulunamadı" },
        { status: 404 }
      );
    }

    const body = await request.json();
    const { title, description, imageUrl, price, size, bodyPart } = body;

    const flashTattoo = await prisma.flashTattoo.create({
      data: {
        title,
        description,
        imageUrl,
        price: parseFloat(price),
        size,
        bodyPart,
        artistProfileId: artistProfile.id,
        isAvailable: true,
      },
    });

    return NextResponse.json(flashTattoo, { status: 201 });
  } catch (error) {
    console.error("Flash Tattoos POST Error:", error);
    return NextResponse.json(
      { error: "Flash dövme oluşturulurken bir hata oluştu." },
      { status: 500 }
    );
  }
}
