import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

// Gallery3D images
import galleryDjController from "@/assets/gallery-dj-controller.png";
import gallerySynthUI from "@/assets/gallery-synth-ui.png";
import galleryKeysAngled from "@/assets/gallery-keys-angled.png";
import lunaAiHero from "@/assets/luna-ai-hero.png";

// UIMasonry images
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

interface GalleryItem {
  id: string;
  src: string;
  alt: string;
}

const allImages: GalleryItem[] = [
  { id: "g1", src: lunaAiHero, alt: "Luna AI Hero" },
  { id: "g2", src: galleryDjController, alt: "DJ Controller" },
  { id: "g3", src: gallerySynthUI, alt: "Synth UI" },
  { id: "g4", src: galleryKeysAngled, alt: "Keys Angled" },
  { id: "u1", src: uiDroneServices, alt: "Drone Services UI" },
  { id: "u2", src: uiFinopsDashboard, alt: "FinOps Dashboard" },
  { id: "u3", src: uiFuturecraftOnboarding, alt: "Futurecraft Onboarding" },
  { id: "u4", src: uiFuturecraftSignup, alt: "Futurecraft Signup" },
  { id: "u5", src: uiLaptopMockup, alt: "Laptop Mockup" },
  { id: "u6", src: uiMusicController, alt: "Music Controller" },
  { id: "u7", src: uiReviewsSection, alt: "Reviews Section" },
  { id: "u8", src: uiTimelineVision, alt: "Timeline Vision" },
  { id: "u9", src: uiVisionBoard, alt: "Vision Board" },
  { id: "u10", src: uiWeddingPlanner, alt: "Wedding Planner" },
  { id: "u11", src: uiWeddingverseHome, alt: "Weddingverse Home" },
  { id: "u12", src: uiWeddingverseVendor, alt: "Weddingverse Vendor" },
];

const GalleryPage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Clear the navigation flag so user can trigger again next time
    sessionStorage.removeItem("gallery-navigated");
    // Trigger staggered entry animation
    requestAnimationFrame(() => setMounted(true));
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/30">
        <div className="flex items-center justify-between px-6 py-4 max-w-[98vw] mx-auto">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold tracking-tight text-foreground hover:text-primary transition-colors">
            DT
          </Link>

          {/* Back Button */}
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors interactive"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
        </div>
      </nav>

      {/* Gallery Grid */}
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-[98vw] mx-auto">
        <div className="mb-10">
          <h1 className="text-[clamp(28px,4vw,44px)] font-medium tracking-tight text-foreground mb-3">
            Gallery
          </h1>
          <p className="text-muted-foreground text-[clamp(14px,1.4vw,18px)] max-w-xl">
            A collection of UI designs, 3D recreations, and visual explorations.
          </p>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-3 space-y-3">
          {allImages.map((image, index) => (
            <div
              key={image.id}
              className={`break-inside-avoid cursor-pointer group interactive transition-all duration-500
                ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ transitionDelay: mounted ? `${index * 50}ms` : "0ms" }}
              onClick={() => setSelectedImage(image)}
            >
              <div className="relative overflow-hidden rounded-lg bg-muted/30 border border-border/20 hover:border-border/60 transition-all duration-300 hover:shadow-lg">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                />
                {/* Hover overlay with title */}
                <div className="absolute inset-0 bg-background/0 group-hover:bg-background/40 transition-colors duration-300 flex items-end">
                  <span className="px-4 py-3 text-sm font-medium text-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                    {image.alt}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Lightbox Dialog */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-[90vw] max-h-[90vh] p-2 sm:p-4 overflow-hidden bg-background/95 backdrop-blur-md border-border/50">
          {selectedImage && (
            <div className="flex flex-col h-full">
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="w-full h-full object-contain rounded-lg max-h-[80vh]"
              />
              <p className="mt-3 text-foreground font-medium text-lg">{selectedImage.alt}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GalleryPage;
