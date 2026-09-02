"use client";

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { formatPrice } from '@/lib/utils';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { 
  Wallet, TrendingUp, TrendingDown, CalendarClock, PlusCircle, Loader2 
} from 'lucide-react';

interface Stats {
  totalIncome: number;
  totalExpenses: number;
  netProfit: number;
  upcomingAppointments: number;
  chartData: { name: string; income: number; expense: number }[];
}

export default function StudioPanel() {
  const { data: session, status } = useSession();
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  // Expense form state
  const [expenseTitle, setExpenseTitle] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseCategory, setExpenseCategory] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/stats');
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === 'authenticated') {
      fetchStats();
    } else if (status === 'unauthenticated') {
      setLoading(false);
    }
  }, [status]);

  const handleAddExpense = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/expenses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: expenseTitle,
          amount: Number(expenseAmount),
          category: expenseCategory,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Gider eklenemedi');
      }

      setExpenseTitle('');
      setExpenseAmount('');
      setExpenseCategory('');
      fetchStats(); // Refresh stats
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-ink-500" />
      </div>
    );
  }

  if (status === 'unauthenticated' || session?.user.role !== 'ARTIST') {
    return (
      <div className="page-container py-12 text-center">
        <h1 className="text-2xl font-bold text-white mb-4">Yetkisiz Erişim</h1>
        <p className="text-gray-400">Bu sayfayı görüntülemek için sanatçı girişi yapmalısınız.</p>
      </div>
    );
  }

  return (
    <div className="page-container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Stüdyo Yönetimi</h1>
        <p className="text-gray-400 mt-2">Gelir, gider ve randevu istatistiklerinizi buradan takip edebilirsiniz.</p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="glass-card p-6 flex items-center space-x-4 border-l-4 border-l-ink-500">
          <div className="bg-ink-500/10 p-3 rounded-xl">
            <Wallet className="h-6 w-6 text-ink-500" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-400">Toplam Gelir</p>
            <p className="text-2xl font-bold text-white">{formatPrice(stats?.totalIncome || 0)}</p>
          </div>
        </div>

        <div className="glass-card p-6 flex items-center space-x-4 border-l-4 border-l-red-500">
          <div className="bg-red-500/10 p-3 rounded-xl">
            <TrendingDown className="h-6 w-6 text-red-500" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-400">Toplam Gider</p>
            <p className="text-2xl font-bold text-white">{formatPrice(stats?.totalExpenses || 0)}</p>
          </div>
        </div>

        <div className="glass-card p-6 flex items-center space-x-4 border-l-4 border-l-emerald-500">
          <div className="bg-emerald-500/10 p-3 rounded-xl">
            <TrendingUp className="h-6 w-6 text-emerald-500" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-400">Net Kâr</p>
            <p className="text-2xl font-bold text-white">{formatPrice(stats?.netProfit || 0)}</p>
          </div>
        </div>

        <div className="glass-card p-6 flex items-center space-x-4 border-l-4 border-l-blue-500">
          <div className="bg-blue-500/10 p-3 rounded-xl">
            <CalendarClock className="h-6 w-6 text-blue-500" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-400">Yaklaşan Randevular</p>
            <p className="text-2xl font-bold text-white">{stats?.upcomingAppointments || 0}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart Section */}
        <div className="lg:col-span-2 glass-card p-6">
          <h2 className="section-title mb-6">Gelir / Gider Grafiği</h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats?.chartData || []} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                <XAxis dataKey="name" stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `₺${value}`} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', borderRadius: '0.5rem', color: '#F3F4F6' }}
                  itemStyle={{ color: '#F3F4F6' }}
                />
                <Legend wrapperStyle={{ paddingTop: '20px' }} />
                <Bar dataKey="income" name="Gelir" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                <Bar dataKey="expense" name="Gider" fill="#EF4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Add Expense Form */}
        <div className="glass-card p-6">
          <h2 className="section-title flex items-center mb-6">
            <PlusCircle className="mr-2 h-5 w-5 text-ink-500" />
            Yeni Gider Ekle
          </h2>
          
          <form onSubmit={handleAddExpense} className="space-y-4">
            {error && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
                {error}
              </div>
            )}
            
            <div>
              <label className="label">Gider Başlığı</label>
              <input
                type="text"
                className="input-field"
                placeholder="Örn: Dövme İğneleri"
                value={expenseTitle}
                onChange={(e) => setExpenseTitle(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="label">Tutar (₺)</label>
              <input
                type="number"
                className="input-field"
                placeholder="500"
                value={expenseAmount}
                onChange={(e) => setExpenseAmount(e.target.value)}
                required
                min="1"
              />
            </div>

            <div>
              <label className="label">Kategori</label>
              <select
                className="input-field"
                value={expenseCategory}
                onChange={(e) => setExpenseCategory(e.target.value)}
                required
              >
                <option value="">Seçiniz...</option>
                <option value="Malzeme">Malzeme (Boyalar, İğneler vb.)</option>
                <option value="Kira">Kira</option>
                <option value="Reklam">Reklam / Pazarlama</option>
                <option value="Fatura">Faturalar</option>
                <option value="Diger">Diğer</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full flex justify-center items-center"
            >
              {isSubmitting ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                'Gideri Kaydet'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
