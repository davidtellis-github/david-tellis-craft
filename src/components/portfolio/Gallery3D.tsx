import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { sanity } from "@/integrations/sanity/client";
import { urlFor } from "@/integrations/sanity/image";

interface GalleryItem {
  src: string;
  alt: string;
}

const HOME_GALLERY_TITLES = [
  "gallery dj controller",
  "gallery keys angled",
  "ui wedding planner",
  "gallery synth ui", 
  "ui music controller",
  
  
  // keep a few more after the requested order
  "gallery synth ui",
  "luna ai hero",
  "ui drone services",
  "turbocloud dashboard mockup",
];

const SKELETON_COUNT = 9;
const skeletonHeights = [190, 260, 220, 300, 210, 280, 240, 320, 200];

const Gallery3D: React.FC = () => {
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [images, setImages] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const thumbnailStripRef = useRef<HTMLDivElement>(null);
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const goTo = useCallback((index: number) => {
    if (images.length === 0) return;
    const wrapped = (index + images.length) % images.length;
    setSelectedIndex(wrapped);
  }, [images.length]);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        setLoading(true);
        const docs = await sanity.fetch<Array<{ _id: string; title?: string; image?: unknown }>>(
          `*[_type == "galleryImage" && defined(image.asset)]{
            _id,
            title,
            image
          }`
        );

        const wanted = HOME_GALLERY_TITLES.map((t) => t.trim().toLowerCase()).filter(Boolean);
        const byTitle = new Map(
          docs
            .filter((d) => d.image)
            .map((d) => [(d.title || "").trim().toLowerCase(), d] as const)
        );

        const selectedDocs = wanted.map((t) => byTitle.get(t)).filter(Boolean) as Array<{
          _id: string;
          title?: string;
          image?: unknown;
        }>;

        const fromSanity: GalleryItem[] = selectedDocs.map((d) => ({
          src: urlFor(d.image as never).width(1200).quality(80).auto("format").url(),
          alt: d.title || "Gallery image",
        }));

        if (!cancelled) setImages(fromSanity);
      } catch (err) {
        console.error("Sanity home gallery fetch failed:", err);
        if (!cancelled) setImages([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
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

      {/* 3-column grid, fixed preview */}
      <div className="relative max-h-[70vh] overflow-hidden">
        <div className="columns-1 sm:columns-2 gap-3">
          {loading &&
            Array.from({ length: SKELETON_COUNT }).map((_, i) => (
              <div
                key={`skeleton-${i}`}
                className="relative overflow-hidden rounded-xl bg-muted/30 border border-border/20 break-inside-avoid mb-3 w-full"
                style={{ height: skeletonHeights[i % skeletonHeights.length], animationDuration: "2.8s" }}
              >
                <div className="absolute inset-0 animate-pulse bg-gradient-to-b from-muted/40 via-muted/20 to-muted/40" />
              </div>
            ))}

          {!loading &&
            images.map((img, i) => (
              <button
                key={img.src}
                onClick={() => setSelectedIndex(i)}
                className="relative overflow-hidden rounded-xl bg-muted/30 border border-border/20 hover:border-border/60 transition-all duration-300 group interactive text-left break-inside-avoid mb-3 w-full"
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
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
      </div>

      {/* macOS-style Lightbox */}
      <Dialog open={selectedIndex !== null} onOpenChange={(open) => !open && setSelectedIndex(null)}>
        <DialogContent className="max-w-[95vw] w-auto h-[90vh] p-0 border-border/30 bg-background/95 backdrop-blur-xl overflow-hidden flex flex-col gap-0 rounded-xl">
          <DialogTitle className="sr-only">
            {selectedIndex !== null ? images[selectedIndex]?.alt : "Image preview"}
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
                src={images[selectedIndex].src}
                alt={images[selectedIndex].alt}
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
              {images.map((img, i) => (
                <button
                  key={img.src}
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
