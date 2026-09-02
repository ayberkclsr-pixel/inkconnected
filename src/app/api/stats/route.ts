import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'ARTIST') {
      return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 });
    }

    const artistProfileId = session.user.artistProfileId!;

    // 1. Fetch appointments for income
    const appointments = await prisma.appointment.findMany({
      where: {
        artistProfileId,
        OR: [
          { status: 'COMPLETED' },
          { depositPaid: true }
        ]
      },
      select: {
        depositAmount: true,
        createdAt: true,
      }
    });

    // 2. Fetch expenses
    const expenses = await prisma.expense.findMany({
      where: { artistProfileId },
      select: {
        amount: true,
        date: true,
      }
    });

    // 3. Upcoming appointments
    const upcomingAppointments = await prisma.appointment.count({
      where: {
        artistProfileId,
        status: 'APPROVED',
        requestedDate: {
          gte: new Date(),
        }
      }
    });

    let totalIncome = 0;
    appointments.forEach(app => {
      totalIncome += (app.depositAmount || 0);
    });

    let totalExpenses = 0;
    expenses.forEach(exp => {
      totalExpenses += exp.amount;
    });

    const netProfit = totalIncome - totalExpenses;

    // Monthly chart data logic
    const monthlyData: Record<string, { name: string, income: number, expense: number }> = {};
    
    // Initialize last 6 months
    for (let i = 5; i >= 0; i--) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      const monthStr = d.toLocaleString('tr-TR', { month: 'short' });
      monthlyData[monthStr] = { name: monthStr, income: 0, expense: 0 };
    }

    appointments.forEach(app => {
      const monthStr = new Date(app.createdAt).toLocaleString('tr-TR', { month: 'short' });
      if (monthlyData[monthStr]) {
        monthlyData[monthStr].income += (app.depositAmount || 0);
      }
    });

    expenses.forEach(exp => {
      const monthStr = new Date(exp.date).toLocaleString('tr-TR', { month: 'short' });
      if (monthlyData[monthStr]) {
        monthlyData[monthStr].expense += exp.amount;
      }
    });

    const chartData = Object.values(monthlyData);

    return NextResponse.json({
      totalIncome,
      totalExpenses,
      netProfit,
      upcomingAppointments,
      chartData
    });
  } catch (error) {
    console.error('Stats GET error:', error);
    return NextResponse.json({ error: 'İstatistikler yüklenirken hata oluştu' }, { status: 500 });
  }
}
