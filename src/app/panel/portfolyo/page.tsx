'use client';

import { useState, useEffect } from 'react';

export default function PortfolioPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const fetchItems = async () => {
    try {
      const res = await fetch('/api/portfolio');
      const data = await res.json();
      if (data.items) setItems(data.items);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    setLoading(true);

    try {
      // Fake upload logic for now since we don't have a real upload endpoint
      const formData = new FormData();
      formData.append('file', file);
      
      const uploadRes = await fetch('/api/upload', { method: 'POST', body: formData });
      const uploadData = await uploadRes.json();
      
      if(uploadData.url) {
        await fetch('/api/portfolio', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ imageUrl: uploadData.url, title, description })
        });
        
        setFile(null);
        setTitle('');
        setDescription('');
        fetchItems();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if(!confirm('Bu görseli silmek istediğinize emin misiniz?')) return;
    
    try {
      await fetch(`/api/portfolio?id=${id}`, { method: 'DELETE' });
      fetchItems();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-white">Portfolyo Yönetimi</h1>

      <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">Yeni Görsel Ekle</h2>
        <form onSubmit={handleUpload} className="space-y-4">
          <div className="space-y-2">
            <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} className="text-gray-300" required />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="Başlık" value={title} onChange={(e) => setTitle(e.target.value)} className="input-field bg-gray-950 border border-gray-800 rounded-md p-3 text-white" />
            <input type="text" placeholder="Açıklama" value={description} onChange={(e) => setDescription(e.target.value)} className="input-field bg-gray-950 border border-gray-800 rounded-md p-3 text-white" />
          </div>
          <button type="submit" disabled={loading || !file} className="btn-primary px-6 py-2 rounded-md font-semibold bg-ink-500 text-gray-950 disabled:opacity-50">
            {loading ? 'Yükleniyor...' : 'Yükle'}
          </button>
        </form>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white">Görseller ({items.length})</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map(item => (
            <div key={item.id} className="relative group aspect-square bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
              <img src={item.imageUrl} alt={item.title || ''} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                <p className="text-white font-medium truncate">{item.title}</p>
                <button onClick={() => handleDelete(item.id)} className="text-red-400 text-sm mt-2 text-left hover:text-red-300">
                  Sil
                </button>
              </div>
            </div>
          ))}
        </div>
        {items.length === 0 && <p className="text-gray-400">Henüz görsel eklemediniz.</p>}
      </div>
    </div>
  );
}
