import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

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

      {/* Scrollable 3-column grid */}
      <div className="h-[60vh] overflow-y-auto pr-2 rounded-lg scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {previewImages.map((img, i) => (
            <div
              key={i}
              className="relative overflow-hidden rounded-lg bg-muted/30 border border-border/20 hover:border-border/60 transition-all duration-300 group"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-background/0 group-hover:bg-background/40 transition-colors duration-300 flex items-end">
                <span className="px-4 py-3 text-sm font-medium text-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {img.alt}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery3D;
