'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AppointmentActions({ 
  appointmentId, 
  status, 
  isArtist,
  depositPaid
}: { 
  appointmentId: string, 
  status: string, 
  isArtist: boolean,
  depositPaid?: boolean
}) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const updateStatus = async (newStatus: string) => {
    setLoading(true)
    try {
      const res = await fetch(`/api/appointments/${appointmentId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      })
      if (res.ok) {
        router.refresh()
      }
    } catch (error) {
      console.error(error)
    }
    setLoading(false)
  }

  const payDeposit = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/appointments/${appointmentId}/deposit`, {
        method: 'POST'
      })
      if (res.ok) {
        alert('Kapora başarıyla ödendi! Randevunuz kesinleşti.')
        router.refresh()
      } else {
        alert('Ödeme işlemi başarısız oldu.')
      }
    } catch (error) {
      console.error(error)
    }
    setLoading(false)
  }

  if (isArtist) {
    if (status === 'PENDING') {
      return (
        <div className="flex gap-2">
          <button onClick={() => updateStatus('APPROVED')} disabled={loading} className="px-4 py-2 bg-green-500/20 text-green-400 hover:bg-green-500/30 rounded-lg text-sm transition-colors">Onayla</button>
          <button onClick={() => updateStatus('REJECTED')} disabled={loading} className="px-4 py-2 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-lg text-sm transition-colors">Reddet</button>
        </div>
      )
    }
    if (status === 'DEPOSIT_PAID') {
      return (
        <button onClick={() => updateStatus('COMPLETED')} disabled={loading} className="px-4 py-2 bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 rounded-lg text-sm transition-colors">Tamamlandı İşaretle</button>
      )
    }
    return null
  }

  // For Customer
  if (status === 'APPROVED' && !depositPaid) {
    return (
      <button 
        onClick={payDeposit} 
        disabled={loading} 
        className="px-4 py-2 bg-[#a855f7] hover:bg-[#7c3aed] text-white rounded-lg text-sm transition-colors flex items-center gap-2"
      >
        500₺ Kapora Öde
      </button>
    )
  }

  if (status === 'PENDING') {
    return (
      <button onClick={() => updateStatus('CANCELLED')} disabled={loading} className="px-4 py-2 bg-gray-500/20 text-gray-400 hover:bg-gray-500/30 rounded-lg text-sm transition-colors">İptal Et</button>
    )
  }

  return null
}
