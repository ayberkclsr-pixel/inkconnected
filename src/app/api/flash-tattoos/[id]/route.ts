import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "CUSTOMER") {
      return NextResponse.json(
        { error: "Sadece müşteriler rezervasyon yapabilir" },
        { status: 401 }
      );
    }

    const id = params.id;

    // Check if available
    const existing = await prisma.flashTattoo.findUnique({ where: { id } });
    if (!existing || !existing.isAvailable) {
      return NextResponse.json(
        { error: "Bu flash dövme artık müsait değil" },
        { status: 400 }
      );
    }

    const updated = await prisma.flashTattoo.update({
      where: { id },
      data: {
        isAvailable: false,
        buyerId: (session.user as any).id,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Flash Tattoos PUT Error:", error);
    return NextResponse.json(
      { error: "Rezervasyon işlemi başarısız oldu." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "ARTIST") {
      return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 401 });
    }

    const id = params.id;
    await prisma.flashTattoo.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Flash Tattoos DELETE Error:", error);
    return NextResponse.json(
      { error: "Flash dövme silinirken bir hata oluştu." },
      { status: 500 }
    );
  }
}
