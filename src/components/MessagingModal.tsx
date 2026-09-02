'use client'

import { useState, useEffect, useRef } from 'react'
import { X, Send } from 'lucide-react'
import { useSession } from 'next-auth/react'

interface MessagingModalProps {
  artistProfileId: string
  artistName: string
  onClose: () => void
}

interface Message {
  id: string
  content: string
  senderId: string
  createdAt: string
}

export default function MessagingModal({ artistProfileId, artistName, onClose }: MessagingModalProps) {
  const { data: session } = useSession()
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetchMessages()
  }, [artistProfileId])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const fetchMessages = async () => {
    try {
      const res = await fetch(`/api/messages?artistProfileId=${artistProfileId}`)
      if (res.ok) {
        const data = await res.json()
        setMessages(data.messages)
      }
    } catch (error) {
      console.error('Error fetching messages:', error)
    } finally {
      setLoading(false)
    }
  }

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ artistProfileId, content: newMessage })
      })

      if (res.ok) {
        const data = await res.json()
        setMessages([...messages, data.message])
        setNewMessage('')
      }
    } catch (error) {
      console.error('Error sending message:', error)
    }
  }

  if (!session) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
        <div className="glass-card max-w-md w-full p-6 rounded-2xl relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
          <h3 className="text-xl font-bold mb-4">Giriş Yapmalısınız</h3>
          <p className="text-gray-300 mb-6">Mesaj gönderebilmek için giriş yapmanız gerekmektedir.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="glass-card max-w-md w-full rounded-2xl relative flex flex-col h-[600px] max-h-[90vh]">
        {/* Header */}
        <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5 rounded-t-2xl">
          <h3 className="text-lg font-bold text-white">{artistName} ile Sohbet</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {loading ? (
            <div className="text-center text-gray-400 mt-10">Yükleniyor...</div>
          ) : messages.length === 0 ? (
            <div className="text-center text-gray-400 mt-10">Henüz mesaj yok. İlk mesajı siz gönderin!</div>
          ) : (
            messages.map((msg) => {
              const isMine = msg.senderId === session.user.id
              return (
                <div key={msg.id} className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-2xl p-3 ${isMine ? 'bg-[#a855f7]/80 text-white rounded-br-sm' : 'bg-white/10 text-gray-200 rounded-bl-sm'}`}>
                    <p className="text-sm">{msg.content}</p>
                    <span className="text-[10px] opacity-60 mt-1 block text-right">
                      {new Date(msg.createdAt).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              )
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-white/10 bg-white/5 rounded-b-2xl">
          <form onSubmit={sendMessage} className="flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Mesajınızı yazın..."
              className="flex-1 bg-black/30 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-[#a855f7] transition-colors"
            />
            <button
              type="submit"
              disabled={!newMessage.trim()}
              className="bg-[#a855f7] hover:bg-[#7c3aed] text-white p-2 rounded-xl transition-colors disabled:opacity-50 flex items-center justify-center w-10 h-10"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
