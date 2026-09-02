import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })
    }

    const body = await req.json()
    const { artistProfileId, content } = body

    if (!artistProfileId || !content) {
      return NextResponse.json({ error: 'Eksik bilgi' }, { status: 400 })
    }

    let customerId = session.user.id
    
    // Find or create conversation
    let conversation = await prisma.conversation.findUnique({
      where: {
        customerId_artistProfileId: {
          customerId: customerId,
          artistProfileId: artistProfileId
        }
      }
    })

    if (!conversation) {
      conversation = await prisma.conversation.create({
        data: {
          customerId,
          artistProfileId
        }
      })
    }

    const message = await prisma.message.create({
      data: {
        conversationId: conversation.id,
        senderId: session.user.id,
        content: content
      }
    })

    return NextResponse.json({ message }, { status: 201 })
  } catch (error) {
    console.error('Message creation error:', error)
    return NextResponse.json({ error: 'Mesaj gönderilemedi' }, { status: 500 })
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })
    }

    const url = new URL(req.url)
    const artistProfileId = url.searchParams.get('artistProfileId')

    if (!artistProfileId) {
      return NextResponse.json({ error: 'Sanatçı ID gerekli' }, { status: 400 })
    }

    const conversation = await prisma.conversation.findUnique({
      where: {
        customerId_artistProfileId: {
          customerId: session.user.id,
          artistProfileId: artistProfileId
        }
      },
      include: {
        messages: {
          orderBy: { createdAt: 'asc' }
        }
      }
    })

    return NextResponse.json({ messages: conversation?.messages || [] })
  } catch (error) {
    console.error('Message fetch error:', error)
    return NextResponse.json({ error: 'Mesajlar alınamadı' }, { status: 500 })
  }
}
