import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })
    }

    const appointment = await prisma.appointment.findUnique({
      where: { id: params.id }
    })

    if (!appointment) {
      return NextResponse.json({ error: 'Randevu bulunamadı' }, { status: 404 })
    }

    if (appointment.customerId !== session.user.id) {
      return NextResponse.json({ error: 'Yetkisiz işlem' }, { status: 403 })
    }

    // Update appointment status to DEPOSIT_PAID
    const updatedAppointment = await prisma.appointment.update({
      where: { id: params.id },
      data: { 
        status: 'DEPOSIT_PAID',
        depositPaid: true
      }
    })

    return NextResponse.json(updatedAppointment)
  } catch (error) {
    console.error('Deposit payment error:', error)
    return NextResponse.json({ error: 'Ödeme işlemi başarısız' }, { status: 500 })
  }
}
