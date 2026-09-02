import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import Image from 'next/image'
import { MessageCircle } from 'lucide-react'

export default async function MessagesPage() {
  const session = await getServerSession(authOptions)
  const isArtist = session?.user.role === 'ARTIST'

  let conversations: any[] = []

  if (isArtist) {
    const artist = await prisma.artistProfile.findUnique({ where: { userId: session!.user.id } })
    if (artist) {
      conversations = await prisma.conversation.findMany({
        where: { artistProfileId: artist.id },
        include: {
          customer: true,
          messages: {
            orderBy: { createdAt: 'desc' },
            take: 1
          }
        },
        orderBy: { updatedAt: 'desc' }
      })
    }
  } else {
    conversations = await prisma.conversation.findMany({
      where: { customerId: session!.user.id },
      include: {
        artistProfile: {
          include: { user: true }
        },
        messages: {
          orderBy: { createdAt: 'desc' },
          take: 1
        }
      },
      orderBy: { updatedAt: 'desc' }
    })
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-white flex items-center gap-2">
        <MessageCircle className="w-8 h-8 text-[#a855f7]" />
        Mesajlarım
      </h1>

      <div className="space-y-4">
        {conversations.length > 0 ? conversations.map(conv => {
          const otherUser = isArtist ? conv.customer : conv.artistProfile.user
          const lastMessage = conv.messages[0]

          return (
            <Link 
              key={conv.id} 
              href={isArtist ? '#' : `/sanatci/${conv.artistProfileId}`} 
              className="glass-card p-4 rounded-xl flex items-center gap-4 hover:bg-white/10 transition-colors"
            >
              <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-gradient-to-br from-[#a855f7] to-[#06b6d4] flex items-center justify-center text-white font-bold">
                {otherUser.avatar ? (
                  <Image src={otherUser.avatar} alt={otherUser.name} width={48} height={48} className="object-cover" />
                ) : (
                  otherUser.name.charAt(0)
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-white font-medium truncate">{otherUser.name}</h3>
                  {lastMessage && (
                    <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                      {new Date(lastMessage.createdAt).toLocaleDateString('tr-TR')}
                    </span>
                  )}
                </div>
                {lastMessage && (
                  <p className="text-gray-400 text-sm truncate">
                    {lastMessage.senderId === session!.user.id ? 'Siz: ' : ''}{lastMessage.content}
                  </p>
                )}
              </div>
            </Link>
          )
        }) : (
          <div className="text-center py-12 text-gray-500 bg-white/5 rounded-2xl border border-white/5">
            <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-20" />
            <p>Henüz mesajınız bulunmuyor.</p>
          </div>
        )}
      </div>
    </div>
  )
}
