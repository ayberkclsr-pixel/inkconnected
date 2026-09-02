import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const posts = await prisma.feedPost.findMany({
      include: {
        artistProfile: {
          include: {
            user: {
              select: {
                name: true,
                avatar: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.error("Feed posts fetch error:", error);
    return NextResponse.json(
      { error: "Gönderiler alınırken bir hata oluştu." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user || session.user.role !== "ARTIST") {
      return NextResponse.json(
        { error: "Bu işlem için yetkiniz yok." },
        { status: 401 }
      );
    }

    const artistProfile = await prisma.artistProfile.findUnique({
      where: { userId: session.user.id },
    });

    if (!artistProfile) {
      return NextResponse.json(
        { error: "Sanatçı profili bulunamadı." },
        { status: 404 }
      );
    }

    const body = await request.json();
    const { imageUrl, caption, bodyPart } = body;

    if (!imageUrl) {
      return NextResponse.json(
        { error: "Görsel zorunludur." },
        { status: 400 }
      );
    }

    const post = await prisma.feedPost.create({
      data: {
        artistProfileId: artistProfile.id,
        imageUrl,
        caption,
        bodyPart,
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error("Feed post creation error:", error);
    return NextResponse.json(
      { error: "Gönderi oluşturulurken bir hata oluştu." },
      { status: 500 }
    );
  }
}
