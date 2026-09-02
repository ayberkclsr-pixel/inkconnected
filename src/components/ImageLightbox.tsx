'use client';

import { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

interface ImageLightboxProps {
  images: { id: string; imageUrl: string; title?: string | null }[];
  initialIndex?: number;
  onClose: () => void;
}

export default function ImageLightbox({ images, initialIndex = 0, onClose }: ImageLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(onClose, 300); // Wait for exit animation
  }, [onClose]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowRight') goToNext();
      if (e.key === 'ArrowLeft') goToPrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleClose, goToNext, goToPrev]);

  if (!images.length) return null;

  return (
    <div 
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      onClick={handleClose}
    >
      <button 
        onClick={(e) => { e.stopPropagation(); handleClose(); }}
        className="absolute top-6 right-6 text-white/70 hover:text-white bg-black/50 hover:bg-black/80 rounded-full p-2 transition-all z-10"
      >
        <X className="w-8 h-8" />
      </button>

      {images.length > 1 && (
        <>
          <button 
            onClick={(e) => { e.stopPropagation(); goToPrev(); }}
            className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-black/50 hover:bg-black/80 rounded-full p-3 transition-all z-10"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          
          <button 
            onClick={(e) => { e.stopPropagation(); goToNext(); }}
            className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-black/50 hover:bg-black/80 rounded-full p-3 transition-all z-10"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </>
      )}

      <div 
        className={`relative w-full h-full max-w-6xl max-h-[85vh] mx-auto p-4 flex flex-col items-center justify-center transition-transform duration-300 ${isVisible ? 'scale-100' : 'scale-95'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={images[currentIndex].imageUrl}
            alt={images[currentIndex].title || 'Tattoo Image'}
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
          />
        </div>
        
        {images[currentIndex].title && (
          <div className="absolute bottom-4 md:bottom-10 left-0 right-0 text-center">
            <span className="bg-black/70 backdrop-blur-md text-white px-6 py-2 rounded-full text-sm md:text-base border border-white/10">
              {images[currentIndex].title}
            </span>
          </div>
        )}
        
        {images.length > 1 && (
          <div className="absolute -bottom-10 left-0 right-0 text-center text-white/50 text-sm">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </div>
    </div>
  );
}
