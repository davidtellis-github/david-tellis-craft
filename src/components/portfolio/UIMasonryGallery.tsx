import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import uiDroneServices from "@/assets/ui-drone-services.png";
import uiFinopsDashboard from "@/assets/ui-finops-dashboard.png";
import uiFuturecraftOnboarding from "@/assets/ui-futurecraft-onboarding.png";
import uiFuturecraftSignup from "@/assets/ui-futurecraft-signup.png";
import uiLaptopMockup from "@/assets/ui-laptop-mockup.png";
import uiMusicController from "@/assets/ui-music-controller.png";
import uiReviewsSection from "@/assets/ui-reviews-section.png";
import uiTimelineVision from "@/assets/ui-timeline-vision.png";
import uiVisionBoard from "@/assets/ui-vision-board.png";
import uiWeddingPlanner from "@/assets/ui-wedding-planner.png";
import uiWeddingverseHome from "@/assets/ui-weddingverse-home.png";
import uiWeddingverseVendor from "@/assets/ui-weddingverse-vendor.png";

interface UIImage {
  id: string;
  src: string;
  alt: string;
}

const UIMasonryGallery = () => {
  const [selectedImage, setSelectedImage] = useState<UIImage | null>(null);

  const uiImages: UIImage[] = [
    { id: "1", src: uiDroneServices, alt: "Drone Services UI" },
    { id: "2", src: uiFinopsDashboard, alt: "FinOps Dashboard" },
    { id: "3", src: uiFuturecraftOnboarding, alt: "Futurecraft Onboarding" },
    { id: "4", src: uiFuturecraftSignup, alt: "Futurecraft Signup" },
    { id: "5", src: uiLaptopMockup, alt: "Laptop Mockup" },
    { id: "6", src: uiMusicController, alt: "Music Controller" },
    { id: "7", src: uiReviewsSection, alt: "Reviews Section" },
    { id: "8", src: uiTimelineVision, alt: "Timeline Vision" },
    { id: "9", src: uiVisionBoard, alt: "Vision Board" },
    { id: "10", src: uiWeddingPlanner, alt: "Wedding Planner" },
    { id: "11", src: uiWeddingverseHome, alt: "Weddingverse Home" },
    { id: "12", src: uiWeddingverseVendor, alt: "Weddingverse Vendor" },
  ];

  return (
    <>
      <section id="ui-designs-gallery" className="w-full py-20">
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          {uiImages.map((image) => (
            <div
              key={image.id}
              className="break-inside-avoid cursor-pointer group"
              onClick={() => setSelectedImage(image)}
            >
              <div className="relative overflow-hidden rounded-lg bg-muted/50">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox Dialog */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-[90vw] max-h-[90vh] p-0 overflow-hidden">
          {selectedImage && (
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="w-full h-full object-contain"
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UIMasonryGallery;
