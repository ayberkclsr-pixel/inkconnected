'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    
    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (res?.error) {
        setError('E-posta veya şifre hatalı.')
      } else {
        router.push('/')
        router.refresh()
      }
    } catch (err) {
      setError('Giriş yapılırken bir hata oluştu.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#0a0a1a] flex">
      {/* Left side - Decorative */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden items-center justify-center">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/hero-bg.jpg')" }} />
        <div className="absolute inset-0 bg-gradient-to-br from-[#06b6d4]/80 via-[#0a0a1a]/80 to-[#0a0a1a]" />
        
        {/* Floating shapes */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-[#a855f7] rounded-full mix-blend-screen filter blur-[50px] opacity-50 animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-[#06b6d4] rounded-full mix-blend-screen filter blur-[60px] opacity-50" />
        
        <div className="relative z-10 text-center px-12">
          <h2 className="text-4xl font-bold text-white mb-6 font-outfit">İlham Veren Sanat</h2>
          <p className="text-xl text-gray-300">
            Dövme sanatının en iyileri InkConnect'te buluşuyor.
          </p>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative">
        <div className="absolute top-8 left-8 lg:hidden">
          <Link href="/" className="text-xl font-bold font-outfit gradient-text">
            InkConnect
          </Link>
        </div>

        <div className="glass-card w-full max-w-md p-8 rounded-3xl border-[#a855f7]/20 relative z-10">
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-bold font-outfit text-white mb-2">Hoş Geldiniz</h1>
            <p className="text-gray-400">InkConnect hesabınıza giriş yapın.</p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-4 rounded-xl mb-6 text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">E-posta</label>
              <input
                type="email"
                required
                className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#a855f7] transition-colors"
                placeholder="ornek@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-400">Şifre</label>
                <Link href="#" className="text-xs text-[#a855f7] hover:text-white transition-colors">Şifremi Unuttum</Link>
              </div>
              <input
                type="password"
                required
                className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#a855f7] transition-colors"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-4 rounded-xl font-medium flex items-center justify-center gap-2 disabled:opacity-50 mt-8"
            >
              {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
              {!loading && <ArrowRight className="w-5 h-5" />}
            </button>
          </form>

          <div className="mt-8 text-center">
            <Link href="/kayit" className="text-gray-400 hover:text-white transition-colors">
              Hesabınız yok mu? <span className="text-[#06b6d4]">Kayıt Olun</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
