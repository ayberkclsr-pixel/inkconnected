'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, MapPin } from 'lucide-react';
import StyleBadge from './StyleBadge';

interface SearchFiltersProps {
  styles: { id: string; name: string; slug: string }[];
}

const CITIES = [
  'İstanbul', 'Ankara', 'İzmir', 'Antalya', 'Bursa', 
  'Adana', 'Konya', 'Gaziantep', 'Mersin', 'Kayseri'
];

export default function SearchFilters({ styles }: SearchFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [city, setCity] = useState(searchParams.get('city') || '');
  const [selectedStyles, setSelectedStyles] = useState<string[]>(
    searchParams.getAll('style')
  );

  const toggleStyle = (slug: string) => {
    setSelectedStyles(prev => 
      prev.includes(slug) ? prev.filter(s => s !== slug) : [...prev, slug]
    );
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (city) params.set('city', city);
    selectedStyles.forEach(s => params.append('style', s));
    
    router.push(`/kesfet?${params.toString()}`);
  };

  return (
    <div className="bg-[#0e0e11] border border-white/[0.08] rounded-3xl p-6 md:p-8 shadow-apple mb-8">
      <form onSubmit={handleSearch} className="flex flex-col gap-6">
        
        {/* Main Search Row */}
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-[#8e8e93]" />
            </div>
            <input
              type="text"
              placeholder="Sanatçı veya stüdyo ara..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 bg-[#151518] border border-white/[0.08] rounded-2xl text-white placeholder-[#636366] text-sm focus:outline-none focus:border-white/30 transition-colors"
            />
          </div>
          
          <div className="relative min-w-[200px]">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <MapPin className="h-4 w-4 text-[#8e8e93]" />
            </div>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full pl-11 pr-10 py-3.5 bg-[#151518] border border-white/[0.08] rounded-2xl text-white text-sm appearance-none focus:outline-none focus:border-white/30 transition-colors"
            >
              <option value="" className="bg-[#151518]">Tüm Şehirler</option>
              {CITIES.map(c => (
                <option key={c} value={c} className="bg-[#151518]">{c}</option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn-primary text-sm px-7 py-3.5 w-full md:w-auto">
            Filtrele
          </button>
        </div>

        {/* Style Filters */}
        <div>
          <h3 className="text-xs uppercase tracking-wider font-semibold text-[#8e8e93] mb-3">Tarzlar</h3>
          <div className="flex flex-wrap gap-2 max-h-[140px] overflow-y-auto pr-2 custom-scrollbar">
            {styles.map(style => (
              <StyleBadge
                key={style.id}
                name={style.name}
                slug={style.slug}
                selected={selectedStyles.includes(style.slug)}
                onClick={() => toggleStyle(style.slug)}
              />
            ))}
          </div>
        </div>

      </form>
    </div>
  );
}
