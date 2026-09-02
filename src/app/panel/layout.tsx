import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { LayoutDashboard, UserCircle, Image as ImageIcon, Calendar, Heart, MessageCircle, Palette } from 'lucide-react';

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect('/giris');
  }

  const isArtist = session.user.role === 'ARTIST';

  const customerLinks = [
    { href: '/panel', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/panel/randevular', label: 'Randevularım', icon: Calendar },
    { href: '/panel/mesajlar', label: 'Mesajlarım', icon: MessageCircle },
    { href: '/panel/favoriler', label: 'Favorilerim', icon: Heart },
    { href: '/panel/profil', label: 'Profil Ayarları', icon: UserCircle },
  ];

  const artistLinks = [
    { href: '/panel', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/panel/randevular', label: 'Randevu Talepleri', icon: Calendar },
    { href: '/panel/mesajlar', label: 'Mesajlarım', icon: MessageCircle },
    { href: '/panel/portfolyo', label: 'Portfolyo', icon: Palette },
    { href: '/panel/flash', label: 'Flash Dövmeler', icon: ImageIcon },
    { href: '/panel/gonderiler', label: 'İlham Gönderileri', icon: Heart },
    { href: '/panel/profil', label: 'Profil Ayarları', icon: UserCircle },
  ];

  const links = isArtist ? artistLinks : customerLinks;

  return (
    <div className="flex min-h-screen bg-[#0a0a1a] selection:bg-[#a855f7]/30">
      {/* Background decoration */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#a855f7]/10 via-[#0a0a1a] to-[#0a0a1a] pointer-events-none -z-10"></div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 glass-card border-r border-white/10 m-4 mr-0 rounded-l-none">
        <div className="p-6">
          <h2 className="text-xl font-bold text-white font-outfit">Yönetim Paneli</h2>
          <p className="text-sm text-gray-400 mt-1">{session.user.name}</p>
        </div>
        <nav className="flex-1 px-4 space-y-2 mt-4">
          {links.map(link => {
            const Icon = link.icon;
            return (
              <Link 
                key={link.href} 
                href={link.href}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all group"
              >
                <Icon size={20} className="group-hover:text-[#a855f7] transition-colors" />
                <span className="font-medium group-hover:text-white transition-colors">{link.label}</span>
              </Link>
            )
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 pb-20 md:pb-0">
        <main className="p-4 md:p-8 relative z-10">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Tabs */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 glass-card rounded-none rounded-t-2xl border-t border-white/10 flex justify-around p-3 z-50">
        {links.map(link => {
          const Icon = link.icon;
          return (
            <Link 
              key={link.href} 
              href={link.href}
              className="flex flex-col items-center gap-1 text-gray-400 hover:text-[#06b6d4] transition-colors"
            >
              <Icon size={22} />
              <span className="text-[10px] font-medium">{link.label}</span>
            </Link>
          )
        })}
      </div>
    </div>
  );
}
