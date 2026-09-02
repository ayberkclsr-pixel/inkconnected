import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Twitter, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-[#090a10]/80 backdrop-blur-xl border-t border-white/[0.08] mt-16 md:mt-24 text-[#8e8e93]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12 mb-12">
          
          {/* Brand Info */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="relative w-8 h-8 rounded-xl overflow-hidden border border-white/15 bg-white/5">
                <Image src="/images/logo.jpg" alt="InkConnect Logo" fill className="object-cover" />
              </div>
              <span className="text-base font-semibold tracking-tight text-white">
                InkConnect
              </span>
            </Link>
            <p className="text-xs text-[#8e8e93] max-w-sm leading-relaxed mb-6">
              Dünyanın ve Türkiye'nin en seçkin dövme sanatçılarıyla buluştuğunuz, yeni nesil dövme keşif ve stüdyo ekosistemi.
            </p>
            <div className="flex items-center gap-2">
              <a href="#" className="w-8 h-8 rounded-full bg-white/[0.04] hover:bg-white/10 flex items-center justify-center text-[#aeaeb2] hover:text-white transition-all border border-white/[0.08]">
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/[0.04] hover:bg-white/10 flex items-center justify-center text-[#aeaeb2] hover:text-white transition-all border border-white/[0.08]">
                <Twitter className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Sütun 1: Platform */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">Platform</h4>
            <ul className="flex flex-col gap-2.5 text-xs">
              <li><Link href="/kesfet" className="hover:text-white transition-colors">Keşfet</Link></li>
              <li><Link href="/match" className="hover:text-white transition-colors">Tattoo Match</Link></li>
              <li><Link href="/ilham" className="hover:text-white transition-colors">İlham Akışı</Link></li>
              <li><Link href="/danisman" className="hover:text-white transition-colors">AI Danışman</Link></li>
            </ul>
          </div>

          {/* Sütun 2: Sanatçılar */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">Sanatçılar</h4>
            <ul className="flex flex-col gap-2.5 text-xs">
              <li><Link href="/kayit" className="hover:text-white transition-colors">Sanatçı Katılımı</Link></li>
              <li><Link href="/panel" className="hover:text-white transition-colors">Stüdyo Paneli</Link></li>
              <li><Link href="/kesfet/flash" className="hover:text-white transition-colors">Flash Tasarımlar</Link></li>
              <li><Link href="/bakim-rehberi" className="hover:text-white transition-colors">Bakım Kılavuzu</Link></li>
            </ul>
          </div>

          {/* Sütun 3: Kurumsal */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">Destek</h4>
            <ul className="flex flex-col gap-2.5 text-xs">
              <li><Link href="#nasil-calisir" className="hover:text-white transition-colors">Nasıl Çalışır?</Link></li>
              <li><Link href="/giris" className="hover:text-white transition-colors">Giriş Yap</Link></li>
              <li><Link href="/gizlilik" className="hover:text-white transition-colors">Gizlilik & Şartlar</Link></li>
              <li><a href="mailto:destek@inkconnect.com" className="hover:text-white transition-colors flex items-center gap-1">İletişim <ArrowUpRight className="w-3 h-3" /></a></li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#636366]">
          <p>© {new Date().getFullYear()} InkConnect Inc. Tüm hakları saklıdır.</p>
          <div className="flex gap-4">
            <span>Türkiye</span>
            <span>•</span>
            <span>Global Sanat Ekosistemi</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
