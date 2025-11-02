import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, ExternalLink } from 'lucide-react';

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
      {/* Gallery Grid - Bento style full-width grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-0.4 md:gap-2 ">
        {filteredAssets.map((asset, index) => {
          // Create varied sizing patterns for visual interest
          const isLarge = index % 7 === 0;
          const isTall = index % 5 === 0;
          const isWide = index % 11 === 0;
          
          return (
            <div
              key={asset.id}
              className={`group relative overflow-hidden rounded-sm cursor-pointer
                ${isLarge ? 'col-span-2 row-span-2' : ''}
                ${isTall && !isLarge ? 'row-span-2' : ''}
                ${isWide && !isLarge ? 'col-span-2' : ''}
              `}
              onClick={() => setSelectedImage(asset.image_url)}
            >
              {/* Image */}
              <div className="relative overflow-hidden h-full">
                <img
                  src={asset.image_url}
                  alt={asset.title || `${projectTitle} UI ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Eye className="h-6 w-6 md:h-8 md:w-8 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-full">
            <img
              src={selectedImage}
              alt="UI Design Detail"
              className="max-w-full max-h-full rounded-lg"
            />
            <Button
              size="sm"
              variant="secondary"
              className="absolute top-4 right-4"
              onClick={() => setSelectedImage(null)}
            >
              Close
            </Button>
          </div>
        </div>
      )}

      {filteredAssets.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No UI work found for the selected filter.
        </div>
      )}
    </div>
  );
};