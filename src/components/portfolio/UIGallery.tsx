import React, { useState } from 'react';
import { Eye, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';

interface UIAsset {
  id: string;
  title: string;
  description?: string;
  image_url: string;
  tags: string[];
  contribution_level: string;
  is_featured: boolean;
}

interface UIGalleryProps {
  assets: UIAsset[];
  projectTitle: string;
  className?: string;
}

export const UIGallery: React.FC<UIGalleryProps> = ({ 
  assets, 
  projectTitle, 
  className = "" 
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('all');

  // Only show assets with valid image URLs
  const validAssets = assets.filter(asset => 
    asset.image_url && 
    typeof asset.image_url === 'string' && 
    asset.image_url.trim() !== ''
  );

  const filteredAssets = validAssets.filter(asset => {
    if (filter === 'all') return true;
    return asset.contribution_level.toLowerCase().includes(filter.toLowerCase());
  });

  const contributionLevels = [...new Set(assets.map(asset => asset.contribution_level))];

  return (
    <div className={`ui-gallery ${className}`}>
      {/* Masonry Gallery Grid */}
      <div className="columns-1 md:columns-2 gap-3">
        {filteredAssets.map((asset, index) => (
          <div
            key={asset.id}
            className="break-inside-avoid mb-3 group cursor-pointer"
            onClick={() => setSelectedImage(asset.image_url)}
          >
            <div className="relative overflow-hidden rounded-lg">
              <img
                src={asset.image_url}
                alt={asset.title || `${projectTitle} UI ${index + 1}`}
                className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
                onError={(e) => {
                  // Hide broken images
                  (e.target as HTMLImageElement).parentElement!.parentElement!.style.display = 'none';
                }}
              />
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Eye className="h-6 w-6 md:h-8 md:w-8 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Dialog */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-5xl p-0 bg-transparent border-none">
          <img
            src={selectedImage || ''}
            alt="UI Design Detail"
            className="w-full h-auto rounded-lg"
          />
        </DialogContent>
      </Dialog>

      {filteredAssets.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No UI work found for the selected filter.
        </div>
      )}
    </div>
  );
};