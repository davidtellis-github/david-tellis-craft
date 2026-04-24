import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { sanity } from "@/integrations/sanity/client";
import { urlFor } from "@/integrations/sanity/image";

interface GalleryItem {
  src: string;
  alt: string;
}

type GalleryNavState = {
  from?: string;
};

const SKELETON_COUNT = 20;
const MIN_SKELETON_MS = 900;
const PAGE_SIZE = 36;
const skeletonHeights = [
  180, 260, 220, 300, 210,
  280, 240, 320, 200, 270,
  230, 310, 190, 290, 250,
  340, 205, 295, 235, 315,
];

const GalleryPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const [images, setImages] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [loadError, setLoadError] = useState<string | null>(null);

  const thumbnailStripRef = React.useRef<HTMLDivElement>(null);
  const thumbnailRefs = React.useRef<(HTMLButtonElement | null)[]>([]);

  const goTo = React.useCallback(
    (index: number) => {
      if (images.length === 0) return;
      const wrapped = (index + images.length) % images.length;
      setSelectedIndex(wrapped);
    },
    [images.length]
  );

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      const startedAt = Date.now();
      try {
        setLoading(true);
        setLoadError(null);

        const docs = await sanity.fetch<Array<{ _id: string; title?: string; image?: unknown }>>(
          `*[_type == "galleryImage" && defined(image.asset)] | order(_createdAt desc)[$start...$end] {
            _id,
            title,
            image
          }`,
          { start: 0, end: PAGE_SIZE }
        );

        const fromSanity: GalleryItem[] = docs.map((d) => ({
          src: urlFor(d.image as never).width(1600).quality(80).auto("format").url(),
          alt: d.title || "Gallery image",
        }));

        if (!cancelled) {
          setImages(fromSanity);
          setHasMore(docs.length === PAGE_SIZE);
          setPage(1);
        }
      } catch (err) {
        // Most common cause in the browser is missing CORS origins in Sanity project settings.
        // Logging here helps debug "TypeError: Failed to fetch" cases.
        console.error("Sanity gallery fetch failed:", err);
        if (!cancelled) {
          setImages([]);
          setLoadError(err instanceof Error ? err.message : "Failed to load gallery");
        }
      } finally {
        const elapsed = Date.now() - startedAt;
        const remaining = Math.max(0, MIN_SKELETON_MS - elapsed);
        if (remaining > 0) {
          await new Promise((r) => setTimeout(r, remaining));
        }
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const loadMore = async () => {
    if (loadingMore || loading || !hasMore) return;
    setLoadingMore(true);
    setLoadError(null);

    const start = page * PAGE_SIZE;
    const end = start + PAGE_SIZE;

    try {
      const docs = await sanity.fetch<Array<{ _id: string; title?: string; image?: unknown }>>(
        `*[_type == "galleryImage" && defined(image.asset)] | order(_createdAt desc)[$start...$end] {
          _id,
          title,
          image
        }`,
        { start, end }
      );

      const next: GalleryItem[] = docs.map((d) => ({
        src: urlFor(d.image as never).width(1600).quality(80).auto("format").url(),
        alt: d.title || "Gallery image",
      }));

      setImages((prev) => {
        // De-dupe by src to avoid accidental duplicates.
        const seen = new Set(prev.map((p) => p.src));
        const appended = next.filter((n) => !seen.has(n.src));
        return prev.concat(appended);
      });

      setHasMore(docs.length === PAGE_SIZE);
      setPage((p) => p + 1);
    } catch (err) {
      console.error("Sanity gallery fetch (load more) failed:", err);
      setLoadError(err instanceof Error ? err.message : "Failed to load more images");
    } finally {
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    sessionStorage.removeItem("gallery-navigated");
    requestAnimationFrame(() => setMounted(true));
  }, []);

  useEffect(() => {
    if (selectedIndex === null) return;
    if (selectedIndex >= images.length) setSelectedIndex(null);
  }, [images.length, selectedIndex]);

  useEffect(() => {
    if (selectedIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goTo(selectedIndex - 1);
      else if (e.key === "ArrowRight") goTo(selectedIndex + 1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [selectedIndex, goTo]);

  useEffect(() => {
    if (selectedIndex === null) return;
    thumbnailRefs.current[selectedIndex]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [selectedIndex]);

  const backTo = (() => {
    const from = (location.state as GalleryNavState | null)?.from;
    if (typeof from === "string" && from.startsWith("/")) return from;
    return null;
  })();

  const handleBack = () => {
    if (backTo) {
      navigate(backTo);
      return;
    }
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/30">
        <div className="flex items-center justify-between px-6 py-4 max-w-[98vw] mx-auto">
          <Link to="/" className="text-xl font-bold tracking-tight text-foreground hover:text-primary transition-colors">
            DT
          </Link>
          <button
            type="button"
            onClick={handleBack}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors interactive"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        </div>
      </nav>

      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-[98vw] mx-auto">
        <div className="mb-10">
          <h1 className="text-[clamp(28px,4vw,44px)] font-medium tracking-tight text-foreground mb-3">
            Gallery
          </h1>
          <p className="text-muted-foreground text-[clamp(14px,1.4vw,18px)] max-w-xl">
            A complete collection of UI designs, 3D recreations, and visual explorations.
          </p>
        </div>

        {loading && <div className="text-sm text-muted-foreground">Loading gallery…</div>}

        {!loading && loadError && (
          <div className="text-sm text-destructive">
            Failed to load images from Sanity. Check `VITE_SANITY_PROJECT_ID`, `VITE_SANITY_DATASET`, CORS, and dataset
            visibility. ({loadError})
          </div>
        )}

        {!loading && !loadError && images.length === 0 && (
          <div className="text-sm text-muted-foreground">No images found in Sanity.</div>
        )}

        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-3 space-y-3">
          {loading &&
            Array.from({ length: SKELETON_COUNT }).map((_, index) => (
              <div
                key={`skeleton-${index}`}
                className={`break-inside-avoid group transition-all duration-500 ${
                  mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: mounted ? `${Math.min(index * 25, 600)}ms` : "0ms" }}
              >
                <div
                  className="relative overflow-hidden rounded-lg bg-muted/30 border border-border/20"
                  style={{ height: skeletonHeights[index % skeletonHeights.length], animationDuration: "2.8s" }}
                >
                  <div className="absolute inset-0 animate-pulse bg-gradient-to-b from-muted/40 via-muted/20 to-muted/40" />
                </div>
              </div>
            ))}
          {images.map((image, index) => (
            <div
              key={image.src}
              className={`break-inside-avoid cursor-pointer group interactive transition-all duration-500 ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: mounted ? `${Math.min(index * 30, 600)}ms` : "0ms" }}
              onClick={() => setSelectedIndex(index)}
            >
              <div className="relative overflow-hidden rounded-lg bg-muted/30 border border-border/20 hover:border-border/60 transition-all duration-300 hover:shadow-lg">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-background/0 group-hover:bg-background/40 transition-colors duration-300 flex items-end">
                  <span className="px-4 py-3 text-sm font-medium text-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                    {image.alt}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {!loading && !loadError && hasMore && (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={loadMore}
              disabled={loadingMore}
              className="inline-flex items-center justify-center rounded-full bg-foreground text-background px-5 py-3 text-sm md:text-base hover:bg-foreground/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed interactive"
            >
              {loadingMore ? "Loading…" : "Load more"}
            </button>
          </div>
        )}
      </main>

      <Dialog open={selectedIndex !== null} onOpenChange={(open) => !open && setSelectedIndex(null)}>
        <DialogContent className="max-w-[95vw] w-auto h-[90vh] p-0 border-border/30 bg-background/95 backdrop-blur-xl overflow-hidden flex flex-col gap-0 rounded-xl">
          <DialogTitle className="sr-only">
            {selectedIndex !== null ? images[selectedIndex]?.alt : "Image preview"}
          </DialogTitle>

          <div className="relative flex items-center justify-center flex-1 min-h-0 px-4 pt-10 pb-4">
            <button
              onClick={() => goTo((selectedIndex ?? 0) - 1)}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-muted/60 hover:bg-muted flex items-center justify-center transition-colors interactive"
              disabled={images.length === 0}
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>

            {selectedIndex !== null && images[selectedIndex] && (
              <img
                src={images[selectedIndex].src}
                alt={images[selectedIndex].alt}
                className="h-[65vh] max-w-full object-contain rounded-lg select-none"
                draggable={false}
              />
            )}

            <button
              onClick={() => goTo((selectedIndex ?? 0) + 1)}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-muted/60 hover:bg-muted flex items-center justify-center transition-colors interactive"
              disabled={images.length === 0}
            >
              <ChevronRight className="w-5 h-5 text-foreground" />
            </button>
          </div>

          <div className="border-t border-border/20 bg-muted/20 px-4 py-3">
            <div
              ref={thumbnailStripRef}
              className="flex gap-2 overflow-x-auto scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent pb-1"
            >
              {images.map((img, i) => (
                <button
                  key={img.src}
                  ref={(el) => {
                    thumbnailRefs.current[i] = el;
                  }}
                  onClick={() => setSelectedIndex(i)}
                  className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-all duration-200 interactive ${
                    i === selectedIndex
                      ? "border-primary ring-1 ring-primary/40 scale-105"
                      : "border-transparent opacity-50 hover:opacity-80"
                  }`}
                >
                  <img src={img.src} alt={img.alt} className="w-full h-full object-cover" draggable={false} />
                </button>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GalleryPage;
