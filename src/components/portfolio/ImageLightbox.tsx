import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';

interface ImageLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  currentIndex: number;
  onNavigate: (index: number) => void;
  captions?: string[];
}

export const ImageLightbox: React.FC<ImageLightboxProps> = ({
  isOpen,
  onClose,
  images,
  currentIndex,
  onNavigate,
  captions
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      if (e.key === 'ArrowLeft' && currentIndex > 0) {
        onNavigate(currentIndex - 1);
      } else if (e.key === 'ArrowRight' && currentIndex < images.length - 1) {
        onNavigate(currentIndex + 1);
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, images.length, onNavigate, onClose]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 bg-background/95 backdrop-blur-xl border-border/50">
        <div className="relative w-full h-[90vh] flex items-center justify-center">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-muted/80 backdrop-blur-sm hover:bg-muted transition-colors flex items-center justify-center"
            aria-label="Close lightbox"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Previous Button */}
          {currentIndex > 0 && (
            <button
              onClick={() => onNavigate(currentIndex - 1)}
              className="absolute left-4 z-50 w-12 h-12 rounded-full bg-muted/80 backdrop-blur-sm hover:bg-muted transition-colors flex items-center justify-center"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* Image */}
          <div className="flex flex-col items-center justify-center max-w-full max-h-full p-8">
            <img
              src={images[currentIndex]}
              alt={captions?.[currentIndex] || `Image ${currentIndex + 1}`}
              className="max-w-full max-h-[75vh] object-contain rounded-lg"
            />
            
            {/* Caption */}
            {captions?.[currentIndex] && (
              <p className="mt-4 text-sm text-muted-foreground text-center max-w-2xl">
                {captions[currentIndex]}
              </p>
            )}

            {/* Image Counter */}
            <div className="mt-4 text-xs text-muted-foreground">
              {currentIndex + 1} / {images.length}
            </div>
          </div>

          {/* Next Button */}
          {currentIndex < images.length - 1 && (
            <button
              onClick={() => onNavigate(currentIndex + 1)}
              className="absolute right-4 z-50 w-12 h-12 rounded-full bg-muted/80 backdrop-blur-sm hover:bg-muted transition-colors flex items-center justify-center"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
