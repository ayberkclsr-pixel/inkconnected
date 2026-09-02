import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { error: "Beğenmek için giriş yapmalısınız." },
        { status: 401 }
      );
    }

    const post = await prisma.feedPost.update({
      where: { id: params.id },
      data: {
        likes: {
          increment: 1,
        },
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error("Like post error:", error);
    return NextResponse.json(
      { error: "Gönderi beğenilirken bir hata oluştu." },
      { status: 500 }
    );
  }
}
