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
      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Button
          variant={filter === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('all')}
        >
          All Work ({assets.length})
        </Button>
        {contributionLevels.map(level => (
          <Button
            key={level}
            variant={filter === level ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter(level)}
          >
            {level} ({assets.filter(a => a.contribution_level === level).length})
          </Button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAssets.map((asset, index) => (
          <div
            key={asset.id}
            className="group relative overflow-hidden rounded-lg border bg-card hover:shadow-lg transition-all duration-300"
          >
            {/* Image */}
            <div className="aspect-video relative overflow-hidden">
              <img
                src={asset.image_url}
                alt={asset.title || `${projectTitle} UI ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => setSelectedImage(asset.image_url)}
                  className="gap-2"
                >
                  <Eye className="h-4 w-4" />
                  View Details
                </Button>
              </div>

              {/* Featured Badge */}
              {asset.is_featured && (
                <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground">
                  Featured
                </Badge>
              )}
            </div>

            {/* Content */}
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold text-sm">
                  {asset.title || `UI Design ${index + 1}`}
                </h4>
                <Badge variant="outline" className="text-xs">
                  {asset.contribution_level}
                </Badge>
              </div>
              
              {asset.description && (
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {asset.description}
                </p>
              )}

              {/* Tags */}
              <div className="flex flex-wrap gap-1">
                {asset.tags.slice(0, 3).map(tag => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {asset.tags.length > 3 && (
                  <Badge variant="secondary" className="text-xs">
                    +{asset.tags.length - 3}
                  </Badge>
                )}
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