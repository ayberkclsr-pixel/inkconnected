'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ type: '', text: '' });
  const [formData, setFormData] = useState({
    bio: '',
    studioName: '',
    city: '',
    district: '',
    address: '',
    experienceYears: '',
    minPrice: '',
    maxPrice: '',
    phone: '',
    instagram: ''
  });

  useEffect(() => {
    // Ideally fetch from API, simplifying for now
    fetch('/api/profile')
      .then(res => res.json())
      .then(data => {
        if(data && data.profile) {
          setFormData({
            bio: data.profile.bio || '',
            studioName: data.profile.studioName || '',
            city: data.profile.city || '',
            district: data.profile.district || '',
            address: data.profile.address || '',
            experienceYears: data.profile.experienceYears?.toString() || '',
            minPrice: data.profile.minPrice?.toString() || '',
            maxPrice: data.profile.maxPrice?.toString() || '',
            phone: data.profile.phone || '',
            instagram: data.profile.instagram || ''
          });
        }
      }).catch(err => console.error("Could not load profile", err));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg({ type: '', text: '' });
    
    try {
      const res = await fetch('/api/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          experienceYears: formData.experienceYears ? parseInt(formData.experienceYears) : undefined,
          minPrice: formData.minPrice ? parseFloat(formData.minPrice) : undefined,
          maxPrice: formData.maxPrice ? parseFloat(formData.maxPrice) : undefined,
        })
      });
      
      if (!res.ok) throw new Error('Güncelleme başarısız');
      setMsg({ type: 'success', text: 'Profil başarıyla güncellendi.' });
    } catch (err) {
      setMsg({ type: 'error', text: 'Bir hata oluştu.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl space-y-8">
      <h1 className="text-3xl font-bold text-white">Profil Düzenle</h1>
      
      {msg.text && (
        <div className={`p-4 rounded-md ${msg.type === 'error' ? 'bg-red-500/10 text-red-500 border border-red-500' : 'bg-green-500/10 text-green-500 border border-green-500'}`}>
          {msg.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-gray-900 p-6 rounded-xl border border-gray-800 space-y-6">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="label text-sm text-gray-300">Stüdyo Adı</label>
              <input name="studioName" value={formData.studioName} onChange={handleChange} className="input-field w-full bg-gray-950 border border-gray-800 rounded-md p-3 text-white" />
            </div>
            <div className="space-y-2">
              <label className="label text-sm text-gray-300">Deneyim Yılı</label>
              <input name="experienceYears" type="number" value={formData.experienceYears} onChange={handleChange} className="input-field w-full bg-gray-950 border border-gray-800 rounded-md p-3 text-white" />
            </div>
            <div className="space-y-2">
              <label className="label text-sm text-gray-300">İl</label>
              <input name="city" value={formData.city} onChange={handleChange} className="input-field w-full bg-gray-950 border border-gray-800 rounded-md p-3 text-white" />
            </div>
            <div className="space-y-2">
              <label className="label text-sm text-gray-300">İlçe</label>
              <input name="district" value={formData.district} onChange={handleChange} className="input-field w-full bg-gray-950 border border-gray-800 rounded-md p-3 text-white" />
            </div>
            <div className="space-y-2">
              <label className="label text-sm text-gray-300">Telefon</label>
              <input name="phone" value={formData.phone} onChange={handleChange} className="input-field w-full bg-gray-950 border border-gray-800 rounded-md p-3 text-white" />
            </div>
            <div className="space-y-2">
              <label className="label text-sm text-gray-300">Instagram (Kullanıcı adı)</label>
              <input name="instagram" value={formData.instagram} onChange={handleChange} className="input-field w-full bg-gray-950 border border-gray-800 rounded-md p-3 text-white" />
            </div>
            <div className="space-y-2">
              <label className="label text-sm text-gray-300">Min Fiyat (₺)</label>
              <input name="minPrice" type="number" value={formData.minPrice} onChange={handleChange} className="input-field w-full bg-gray-950 border border-gray-800 rounded-md p-3 text-white" />
            </div>
            <div className="space-y-2">
              <label className="label text-sm text-gray-300">Max Fiyat (₺)</label>
              <input name="maxPrice" type="number" value={formData.maxPrice} onChange={handleChange} className="input-field w-full bg-gray-950 border border-gray-800 rounded-md p-3 text-white" />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="label text-sm text-gray-300">Biyografi</label>
            <textarea name="bio" value={formData.bio} onChange={handleChange} rows={4} className="input-field w-full bg-gray-950 border border-gray-800 rounded-md p-3 text-white"></textarea>
          </div>
          
          <div className="space-y-2">
            <label className="label text-sm text-gray-300">Açık Adres</label>
            <textarea name="address" value={formData.address} onChange={handleChange} rows={2} className="input-field w-full bg-gray-950 border border-gray-800 rounded-md p-3 text-white"></textarea>
          </div>
        </div>
        
        <button type="submit" disabled={loading} className="btn-primary w-full md:w-auto px-8 py-3 rounded-md font-semibold bg-ink-500 text-gray-950">
          {loading ? 'Kaydediliyor...' : 'Kaydet'}
        </button>
      </form>
    </div>
  );
}
