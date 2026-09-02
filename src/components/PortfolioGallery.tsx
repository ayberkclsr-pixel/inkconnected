"use client";

import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

interface PortfolioItemData {
  id: string;
  imageUrl: string;
  title: string | null;
  description: string | null;
  styleName: string | null;
  createdAt: Date;
}

interface PortfolioGalleryProps {
  items: PortfolioItemData[];
}

export default function PortfolioGallery({ items }: PortfolioGalleryProps) {
  const [selectedItem, setSelectedItem] = useState<PortfolioItemData | null>(
    null
  );

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg">
          Henüz portfolyo görseli eklenmemiş.
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="masonry-grid">
        {items.map((item) => (
          <div
            key={item.id}
            className="group relative cursor-pointer overflow-hidden rounded-lg"
            onClick={() => setSelectedItem(item)}
          >
            <img
              src={item.imageUrl}
              alt={item.title || "Portfolyo görseli"}
              className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-4">
                {item.title && (
                  <h4 className="text-white font-semibold text-sm">
                    {item.title}
                  </h4>
                )}
                {item.styleName && (
                  <span className="badge-style text-xs mt-1 inline-block">
                    {item.styleName}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={() => setSelectedItem(null)}
        >
          <button
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-10"
            onClick={() => setSelectedItem(null)}
          >
            <X className="w-8 h-8" />
          </button>
          <div
            className="max-w-4xl max-h-[90vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedItem.imageUrl}
              alt={selectedItem.title || "Portfolyo görseli"}
              className="w-full max-h-[75vh] object-contain rounded-lg"
            />
            <div className="mt-4 text-center">
              {selectedItem.title && (
                <h3 className="text-white text-xl font-semibold">
                  {selectedItem.title}
                </h3>
              )}
              {selectedItem.description && (
                <p className="text-gray-400 mt-2">{selectedItem.description}</p>
              )}
              {selectedItem.styleName && (
                <span className="badge-style mt-3 inline-block">
                  {selectedItem.styleName}
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
