'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { User, PenTool, ArrowRight } from 'lucide-react'

export default function RegisterPage() {
  const router = useRouter()
  const [role, setRole] = useState<'CUSTOMER' | 'ARTIST'>('CUSTOMER')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (formData.password !== formData.confirmPassword) {
      setError('Şifreler eşleşmiyor.')
      return
    }

    setLoading(true)
    
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, role })
      })
      
      const data = await res.json()
      
      if (!res.ok) {
        throw new Error(data.error || 'Kayıt olurken bir hata oluştu.')
      }

      // Auto login after registration
      const signInRes = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false
      })

      if (signInRes?.error) {
        throw new Error('Kayıt başarılı ancak giriş yapılamadı.')
      }

      router.push('/')
      router.refresh()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#0a0a1a] flex">
      {/* Left side - Decorative */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden items-center justify-center">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/portfolio_1.jpg')" }} />
        <div className="absolute inset-0 bg-gradient-to-br from-[#a855f7]/80 via-[#0a0a1a]/80 to-[#0a0a1a]" />
        
        <div className="relative z-10 text-center px-12">
          <h2 className="text-4xl font-bold text-white mb-6 font-outfit">Sanatını Paylaşş</h2>
          <p className="text-xl text-gray-300">
            InkConnect ile yeteneğinizi binlerce kişiye ulaştırın veya hayalinizdeki dövmeciyle tanışın.
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

        <div className="glass-card w-full max-w-md p-8 rounded-3xl border-[#06b6d4]/20 relative z-10">
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-bold font-outfit text-white mb-2">Aramıza Katılın</h1>
            <p className="text-gray-400">InkConnect ailesine hoş geldiniz.</p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-4 rounded-xl mb-6 text-sm text-center">
              {error}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 mb-8">
            <button
              type="button"
              onClick={() => setRole('CUSTOMER')}
              className={`p-4 rounded-2xl flex flex-col items-center justify-center gap-2 border transition-all ${
                role === 'CUSTOMER' 
                  ? 'bg-[#06b6d4]/20 border-[#06b6d4] text-[#06b6d4]' 
                  : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
              }`}
            >
              <User className="w-6 h-6" />
              <span className="font-medium">Müşteri</span>
            </button>
            <button
              type="button"
              onClick={() => setRole('ARTIST')}
              className={`p-4 rounded-2xl flex flex-col items-center justify-center gap-2 border transition-all ${
                role === 'ARTIST' 
                  ? 'bg-[#a855f7]/20 border-[#a855f7] text-[#a855f7]' 
                  : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
              }`}
            >
              <PenTool className="w-6 h-6" />
              <span className="font-medium">Sanatçı</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Ad Soyad</label>
              <input
                type="text"
                required
                className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#06b6d4] transition-colors"
                placeholder="Örn: Ayberk Çalışır"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">E-posta</label>
              <input
                type="email"
                required
                className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#06b6d4] transition-colors"
                placeholder="ornek@email.com"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Şifre</label>
              <input
                type="password"
                required
                className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#06b6d4] transition-colors"
                placeholder="••••••••"
                value={formData.password}
                onChange={e => setFormData({...formData, password: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Şifre Tekrar</label>
              <input
                type="password"
                required
                className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#06b6d4] transition-colors"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={e => setFormData({...formData, confirmPassword: e.target.value})}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-xl font-medium flex items-center justify-center gap-2 transition-all ${
                role === 'ARTIST' ? 'bg-[#a855f7] hover:bg-[#7c3aed]' : 'bg-[#06b6d4] hover:bg-[#0891b2]'
              } text-white disabled:opacity-50`}
            >
              {loading ? 'Kayıt olunuyor...' : 'Kayıt Ol'}
              {!loading && <ArrowRight className="w-5 h-5" />}
            </button>
          </form>

            <div className="mt-8 text-center">
            <Link href="/giris" className="text-gray-400 hover:text-white transition-colors">
              Zaten hesabınız var mı? <span className={role === 'ARTIST' ? 'text-[#a855f7]' : 'text-[#06b6d4]'}>Giriş Yapın</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
