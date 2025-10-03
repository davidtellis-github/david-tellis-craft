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

  const filteredAssets = assets.filter(asset => {
    if (filter === 'all') return true;
    return asset.contribution_level.toLowerCase().includes(filter.toLowerCase());
  });

  const contributionLevels = [...new Set(assets.map(asset => asset.contribution_level))];

  return (
    <div className={`ui-gallery ${className}`}>
      {/* Gallery Grid - Pinterest style masonry */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
        {filteredAssets.map((asset, index) => (
          <div
            key={asset.id}
            className="group relative overflow-hidden rounded-lg break-inside-avoid mb-4 cursor-pointer"
            onClick={() => setSelectedImage(asset.image_url)}
          >
            {/* Image */}
            <div className="relative overflow-hidden">
              <img
                src={asset.image_url}
                alt={asset.title || `${projectTitle} UI ${index + 1}`}
                className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Eye className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>
        ))}
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