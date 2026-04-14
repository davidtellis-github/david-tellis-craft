import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

import galleryDjController from "@/assets/gallery-dj-controller.png";
import gallerySynthUI from "@/assets/gallery-synth-ui.png";
import galleryKeysAngled from "@/assets/gallery-keys-angled.png";
import lunaAiHero from "@/assets/luna-ai-hero.png";
import uiDroneServices from "@/assets/ui-drone-services.png";
import uiFinopsDashboard from "@/assets/ui-finops-dashboard.png";
import uiFuturecraftOnboarding from "@/assets/ui-futurecraft-onboarding.png";
import uiFuturecraftSignup from "@/assets/ui-futurecraft-signup.png";
import uiLaptopMockup from "@/assets/ui-laptop-mockup.png";
import uiMusicController from "@/assets/ui-music-controller.png";
import uiReviewsSection from "@/assets/ui-reviews-section.png";
import uiTimelineVision from "@/assets/ui-timeline-vision.png";

const previewImages = [
  { src: lunaAiHero, alt: "Luna AI Hero" },
  { src: galleryDjController, alt: "DJ Controller" },
  { src: gallerySynthUI, alt: "Synth UI" },
  { src: galleryKeysAngled, alt: "Keys Angled" },
  { src: uiDroneServices, alt: "Drone Services" },
  { src: uiFinopsDashboard, alt: "FinOps Dashboard" },
  { src: uiFuturecraftOnboarding, alt: "Futurecraft Onboarding" },
  { src: uiFuturecraftSignup, alt: "Futurecraft Signup" },
  { src: uiLaptopMockup, alt: "Laptop Mockup" },
  { src: uiMusicController, alt: "Music Controller" },
  { src: uiReviewsSection, alt: "Reviews Section" },
  { src: uiTimelineVision, alt: "Timeline Vision" },
];

const Gallery3D: React.FC = () => {
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const thumbnailStripRef = useRef<HTMLDivElement>(null);
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const goTo = useCallback((index: number) => {
    const wrapped = (index + previewImages.length) % previewImages.length;
    setSelectedIndex(wrapped);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (selectedIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goTo(selectedIndex - 1);
      else if (e.key === "ArrowRight") goTo(selectedIndex + 1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [selectedIndex, goTo]);

  // Auto-scroll active thumbnail into view
  useEffect(() => {
    if (selectedIndex === null) return;
    const thumb = thumbnailRefs.current[selectedIndex];
    thumb?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [selectedIndex]);

  return (
    <section id="gallery" className="py-[12vh] lg:py-[15vh]">
      {/* Section Header */}
      <div className="mb-10 lg:mb-14 flex items-end justify-between">
        <div>
          <h2 className="text-[clamp(24px,4vw,40px)] font-medium text-foreground mb-3">
            Gallery
          </h2>
          <p className="text-muted-foreground text-[clamp(14px,1.4vw,18px)] max-w-xl">
            A collection of UI designs, 3D recreations, and visual explorations.
          </p>
        </div>
        <button
          onClick={() => navigate("/gallery")}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group interactive"
        >
          View all
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* 3-column grid, internal scroll */}
      <div className="max-h-[80vh] overflow-y-auto pr-2 rounded-lg scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {previewImages.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelectedIndex(i)}
              className="relative overflow-hidden rounded-lg bg-muted/30 border border-border/20 hover:border-border/60 transition-all duration-300 group interactive text-left"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-background/0 group-hover:bg-background/40 transition-colors duration-300 flex items-end">
                <span className="px-4 py-3 text-sm font-medium text-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {img.alt}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* macOS-style Lightbox */}
      <Dialog open={selectedIndex !== null} onOpenChange={(open) => !open && setSelectedIndex(null)}>
        <DialogContent className="max-w-[95vw] w-auto h-[90vh] p-0 border-border/30 bg-background/95 backdrop-blur-xl overflow-hidden flex flex-col gap-0 rounded-xl">
          <DialogTitle className="sr-only">
            {selectedIndex !== null ? previewImages[selectedIndex].alt : "Image preview"}
          </DialogTitle>

          {/* Main preview area */}
          <div className="relative flex items-center justify-center flex-1 min-h-0 px-4 pt-10 pb-4">
            {/* Left arrow */}
            <button
              onClick={() => goTo((selectedIndex ?? 0) - 1)}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-muted/60 hover:bg-muted flex items-center justify-center transition-colors interactive"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>

            {/* Image */}
            {selectedIndex !== null && (
              <img
                src={previewImages[selectedIndex].src}
                alt={previewImages[selectedIndex].alt}
                className="h-[65vh] max-w-full object-contain rounded-lg select-none"
                draggable={false}
              />
            )}

            {/* Right arrow */}
            <button
              onClick={() => goTo((selectedIndex ?? 0) + 1)}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-muted/60 hover:bg-muted flex items-center justify-center transition-colors interactive"
            >
              <ChevronRight className="w-5 h-5 text-foreground" />
            </button>
          </div>

          {/* Thumbnail strip */}
          <div className="border-t border-border/20 bg-muted/20 px-4 py-3">
            <div
              ref={thumbnailStripRef}
              className="flex gap-2 overflow-x-auto scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent pb-1"
            >
              {previewImages.map((img, i) => (
                <button
                  key={i}
                  ref={(el) => { thumbnailRefs.current[i] = el; }}
                  onClick={() => setSelectedIndex(i)}
                  className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-all duration-200 interactive ${
                    i === selectedIndex
                      ? "border-primary ring-1 ring-primary/40 scale-105"
                      : "border-transparent opacity-50 hover:opacity-80"
                  }`}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                </button>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Gallery3D;
