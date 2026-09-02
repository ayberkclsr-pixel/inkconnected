'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, ArrowUpRight, Download } from 'lucide-react'

type Message = {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  isTyping?: boolean
  imageUrl?: string
}

const QUICK_SUGGESTIONS = [
  "İlk dövmem olacak, nereden başlamalıyım?",
  "Sırt için geometrik kurt konsepti hazırla",
  "Minimalist kol dövmesi fikirleri öner",
  "Bana en uygun dövme tarzı hangisi?"
]

export default function ChatClient() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Merhaba! Ben InkBot, dövme danışmanınızım.\n\nHayalinizdeki dövme stilini keşfetmenize, profesyonel bir taslak oluşturmanıza ve stüdyoya hazır stencil çıktısı üretmenize rehberlik edeceğim.\n\nVücudunuzda hangi bölgeye, nasıl bir konsept veya tarz düşünüyorsunuz?"
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesContainerRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isLoading])

  const sendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: textToSend.trim()
    }

    setMessages(prev => [...prev, userMsg])
    setInput('')
    setIsLoading(true)

    const typingId = (Date.now() + 1).toString()
    setMessages(prev => [...prev, {
      id: typingId,
      role: 'assistant',
      content: 'Tasarım ve konsept analiz ediliyor...',
      isTyping: true
    }])

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMsg] })
      })
      
      const data = await res.json()
      
      setMessages(prev => prev.filter(m => m.id !== typingId))
      
      setMessages(prev => [...prev, {
        id: (Date.now() + 2).toString(),
        role: 'assistant',
        content: data.reply,
        imageUrl: data.imageUrl
      }])
    } catch (error) {
      setMessages(prev => prev.filter(m => m.id !== typingId))
      setMessages(prev => [...prev, {
        id: (Date.now() + 2).toString(),
        role: 'system',
        content: "Bağlantı hatası oluştu. Lütfen tekrar deneyin."
      }])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(input)
  }

  return (
    <div className="flex flex-col flex-1 w-full h-full overflow-hidden bg-[#0c0c0f]">
      {/* Messages Area */}
      <div 
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto px-4 md:px-8 py-6 space-y-6 custom-scrollbar"
      >
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex gap-3 md:gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {/* Assistant Avatar */}
            {msg.role !== 'user' && (
              <div className="w-8 h-8 rounded-full flex-shrink-0 bg-white/[0.08] border border-white/10 flex items-center justify-center self-start mt-1">
                <Bot className="w-4 h-4 text-white" />
              </div>
            )}
            
            {/* Message Bubble */}
            <div className={`max-w-[85%] md:max-w-[75%] rounded-3xl p-4 md:p-5 transition-all ${
              msg.role === 'user' 
                ? 'bg-white text-black font-medium shadow-sm' 
                : msg.role === 'system'
                ? 'bg-red-500/10 text-red-300 border border-red-500/20'
                : 'bg-[#16161a] border border-white/[0.08] text-[#f5f5f7]'
            }`}>
              
              <div className="flex items-center justify-between gap-2 mb-2 pb-1 border-b border-white/[0.06]">
                <span className={`text-[11px] font-semibold uppercase tracking-wider ${
                  msg.role === 'user' ? 'text-black/60' : 'text-[#8e8e93]'
                }`}>
                  {msg.role === 'user' ? 'Siz' : 'InkBot Danışman'}
                </span>
                <span className={`text-[10px] ${msg.role === 'user' ? 'text-black/40' : 'text-[#636366]'}`}>
                  {new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>

              {msg.isTyping ? (
                <div className="flex items-center gap-2 py-1">
                  <span className="w-2 h-2 rounded-full bg-white animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 rounded-full bg-white/70 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '300ms' }} />
                  <span className="text-xs text-[#8e8e93] ml-2">{msg.content}</span>
                </div>
              ) : (
                <div className={`text-sm md:text-base leading-relaxed whitespace-pre-wrap ${
                  msg.role === 'user' ? 'text-black' : 'text-[#e5e5ea]'
                }`}>
                  {msg.content}
                </div>
              )}

              {/* Generated Image Card */}
              {msg.imageUrl && (
                <div className="mt-4 rounded-2xl overflow-hidden border border-white/10 bg-white shadow-apple">
                  <div className="p-3 bg-[#1c1c1e] text-white flex items-center justify-between">
                    <span className="text-xs font-semibold">Çıktıya Hazır Stencil Tasarımı</span>
                    <a 
                      href={msg.imageUrl} 
                      target="_blank" 
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white text-black text-xs font-semibold hover:bg-[#e5e5ea] transition-all"
                    >
                      <Download className="w-3.5 h-3.5" /> İndir
                    </a>
                  </div>
                  
                  <div className="p-4 bg-white flex items-center justify-center">
                    <img 
                      src={msg.imageUrl} 
                      alt="AI Tattoo Stencil Design" 
                      className="w-full max-h-[460px] object-contain rounded-lg" 
                    />
                  </div>

                  <div className="px-4 py-2.5 bg-[#121215] text-center border-t border-white/[0.06]">
                    <p className="text-[11px] text-[#8e8e93]">
                      Bu görseli doğrudan dövme sanatçınıza iletebilir veya transfer kağıdı için yazıcıdan çıktı alabilirsiniz.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* User Avatar */}
            {msg.role === 'user' && (
              <div className="w-8 h-8 rounded-full flex-shrink-0 bg-white text-black flex items-center justify-center self-start mt-1 shadow-sm">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Quick Suggestions Bar */}
      {messages.length <= 2 && (
        <div className="px-4 md:px-8 py-2 overflow-x-auto flex gap-2 no-scrollbar bg-[#101014] border-t border-white/[0.06]">
          <span className="text-[11px] text-[#8e8e93] flex items-center gap-1 shrink-0 font-medium">
            Öneriler:
          </span>
          {QUICK_SUGGESTIONS.map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => sendMessage(suggestion)}
              disabled={isLoading}
              className="text-xs shrink-0 px-3.5 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/10 border border-white/[0.08] text-[#d1d1d6] hover:text-white transition-all flex items-center gap-1.5"
            >
              <span>{suggestion}</span>
              <ArrowUpRight className="w-3 h-3 text-[#8e8e93]" />
            </button>
          ))}
        </div>
      )}

      {/* Apple Clean Bottom Input Bar */}
      <div className="p-3 md:p-4 bg-[#0e0e11] border-t border-white/[0.08] relative z-20">
        <form onSubmit={handleSubmit} className="relative flex items-center max-w-4xl mx-auto">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Dövme fikrinizi veya stilinizi anlatın..."
            className="w-full bg-[#16161a] border border-white/[0.08] focus:border-white/30 rounded-full pl-5 pr-14 py-3.5 text-sm text-white placeholder-[#636366] focus:outline-none transition-colors"
            disabled={isLoading}
          />
          
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white hover:bg-[#e5e5ea] flex items-center justify-center text-black transition-all disabled:opacity-30"
          >
            <Send className="w-4 h-4 ml-0.5" />
          </button>
        </form>

        <div className="text-center mt-2 text-[11px] text-[#636366]">
          InkBot Neural Engine • Stüdyo & Stil Danışmanı
        </div>
      </div>
    </div>
  )
}
