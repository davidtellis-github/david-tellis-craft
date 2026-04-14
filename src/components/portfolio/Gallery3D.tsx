import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Import a few preview images for the teaser grid
import galleryDjController from "@/assets/gallery-dj-controller.png";
import gallerySynthUI from "@/assets/gallery-synth-ui.png";
import galleryKeysAngled from "@/assets/gallery-keys-angled.png";
import lunaAiHero from "@/assets/luna-ai-hero.png";
import uiDroneServices from "@/assets/ui-drone-services.png";
import uiFinopsDashboard from "@/assets/ui-finops-dashboard.png";

const previewImages = [
  lunaAiHero,
  galleryDjController,
  gallerySynthUI,
  galleryKeysAngled,
  uiDroneServices,
  uiFinopsDashboard,
];

const Gallery3D: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const alreadyNavigated = sessionStorage.getItem("gallery-navigated");
    if (alreadyNavigated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isTransitioning) {
          sessionStorage.setItem("gallery-navigated", "true");
          setIsTransitioning(true);
          setTimeout(() => {
            navigate("/gallery");
          }, 600);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [navigate, isTransitioning]);

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className={`py-[12vh] lg:py-[15vh] transition-all duration-[600ms] ease-in-out
        ${isTransitioning ? "scale-105 opacity-0" : "scale-100 opacity-100"}`}
    >
      {/* Section Header */}
      <div className="mb-10 lg:mb-14">
        <h2 className="text-[clamp(24px,4vw,40px)] font-medium text-foreground mb-3">
          Gallery
        </h2>
        <p className="text-muted-foreground text-[clamp(14px,1.4vw,18px)] max-w-xl">
          A collection of UI designs, 3D recreations, and visual explorations.
        </p>
      </div>

      {/* Preview Grid — 3x2 teaser */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {previewImages.map((src, i) => (
          <div
            key={i}
            className="relative overflow-hidden rounded-lg bg-muted/30 border border-border/20 aspect-[4/3]"
          >
            <img
              src={src}
              alt={`Gallery preview ${i + 1}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            {/* Fade overlay on last row to hint "more" */}
            {i >= 3 && (
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
            )}
          </div>
        ))}
      </div>

      {/* "View All" hint */}
      <div className="mt-6 text-center">
        <span className="text-sm text-muted-foreground animate-pulse">
          Scroll to explore gallery →
        </span>
      </div>
    </section>
  );
};

export default Gallery3D;
