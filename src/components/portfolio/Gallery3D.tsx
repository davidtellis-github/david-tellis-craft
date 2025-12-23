import React, { useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { X, ExternalLink } from "lucide-react";

// Import gallery images
import galleryDjController from "@/assets/gallery-dj-controller.png";
import gallerySynthUI from "@/assets/gallery-synth-ui.png";
import galleryKeysAngled from "@/assets/gallery-keys-angled.png";
import lunaAiHero from "@/assets/luna-ai-hero.png";

interface GalleryImage {
  src: string;
  title: string;
  description?: string;
  prototypeUrl?: string;
  isEmbed?: boolean; // Render as live embed instead of static image
}

const galleryImages: GalleryImage[] = [
  {
    src: lunaAiHero,
    title: "Luna AI",
    description: "AI co-worker landing page design",
    prototypeUrl: "https://embed.figma.com/proto/Ow4QpYUgooZfFeaK3PqNzi/UI?page-id=546%3A9435&node-id=546-9442&viewport=347%2C-5%2C0.27&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=546%3A9442&embed-host=share",
  },
  {
    src: galleryDjController,
    title: "DJ Controller",
    description: "3D product recreation in Figma",
  },
  {
    src: galleryDjController, // Fallback image
    title: "3D Orb - in Spline",
    description: "Interactive 3D orb created in Spline",
    prototypeUrl: "https://my.spline.design/orbitalbluestarcopy-nq984esCJzKdPTWNTKR2cD8d/",
    isEmbed: true,
  },
  {
    src: gallerySynthUI,
    title: "Synth UI",
    description: "3D synthesizer recreation in Figma",
  },
  {
    src: galleryKeysAngled,
    title: "Keys Angled",
    description: "3D keyboard keys detail in Figma",
  },
];

const Gallery3D: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [prototypeOpen, setPrototypeOpen] = useState(false);
  const [prototypeImage, setPrototypeImage] = useState<GalleryImage | null>(null);

  const handleOpenPrototype = (e: React.MouseEvent, image: GalleryImage) => {
    e.stopPropagation();
    setPrototypeImage(image);
    setPrototypeOpen(true);
  };

  return (
    <section
      id="gallery"
      className="py-[12vh] lg:py-[15vh]"
    >
      <Carousel
        opts={{
          align: "start",
          loop: galleryImages.length > 1,
          dragFree: true,
        }}
        plugins={[
          Autoplay({
            delay: 4000,
            stopOnInteraction: true,
            stopOnMouseEnter: true,
          }),
          WheelGesturesPlugin(),
        ]}
        className="w-full"
      >
        {/* Section Header with Navigation */}
        <div className="mb-10 lg:mb-14 flex items-end justify-between">
          <div>
            <h2 className="text-[clamp(24px,4vw,40px)] font-medium text-foreground mb-3">
              Gallery
            </h2>
            <p className="text-muted-foreground text-[clamp(14px,1.4vw,18px)] max-w-xl">
              3D product recreations crafted in Figma — exploring form, light, and detail.
            </p>
          </div>

          {/* Navigation Arrows - Bottom Right with 12px gap */}
          {galleryImages.length > 1 && (
            <div className="flex items-center gap-3">
              <CarouselPrevious className="static translate-x-0 translate-y-0 h-10 w-10 bg-background/80 backdrop-blur-sm border-border/50 hover:bg-background [&_svg]:h-6 [&_svg]:w-6" />
              <CarouselNext className="static translate-x-0 translate-y-0 h-10 w-10 bg-background/80 backdrop-blur-sm border-border/50 hover:bg-background [&_svg]:h-6 [&_svg]:w-6" />
            </div>
          )}
        </div>

        {/* Horizontal Carousel */}
        <div className="relative -mx-4 sm:-mx-6 lg:-mx-8">
          <CarouselContent className="-ml-4 lg:-ml-6">
            {galleryImages.map((image, index) => (
              <CarouselItem
                key={index}
                className="pl-4 lg:pl-6 basis-[90vw] sm:basis-[85vw] lg:basis-[70vw] xl:basis-[60vw]"
              >
                {image.isEmbed ? (
                  // Embedded item - no dialog, directly interactive
                  <div
                    className="group relative overflow-hidden rounded-xl lg:rounded-2xl 
                               bg-muted/30 border border-border/40 
                               transition-all duration-300 hover:border-border/80 hover:shadow-lg"
                  >
                    {/* Interactive Badge */}
                    <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10">
                      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/90 backdrop-blur-sm rounded-full text-xs font-medium text-primary-foreground">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-foreground opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-foreground"></span>
                        </span>
                        Interactive
                      </div>
                    </div>

                    {/* Embedded Iframe Container */}
                    <div className="p-4 sm:p-6 lg:p-8 h-[50vh] lg:h-[60vh]">
                      <iframe
                        src={image.prototypeUrl}
                        className="w-full h-full rounded-lg border-0"
                        title={image.title}
                        allowFullScreen
                      />
                    </div>

                    {/* Caption */}
                    <div className="px-4 sm:px-6 lg:px-8 pb-4 sm:pb-6 lg:pb-8 pt-0">
                      <h3 className="text-foreground font-medium text-lg lg:text-xl">
                        {image.title}
                      </h3>
                      {image.description && (
                        <p className="text-muted-foreground text-sm lg:text-base mt-1">
                          {image.description}
                        </p>
                      )}
                    </div>
                  </div>
                ) : (
                  // Regular image item - with dialog lightbox
                  <Dialog>
                    <DialogTrigger asChild>
                      <div
                        className="group cursor-pointer relative overflow-hidden rounded-xl lg:rounded-2xl 
                                   bg-muted/30 border border-border/40 
                                   transition-all duration-300 hover:border-border/80 hover:shadow-lg"
                        onClick={() => setSelectedImage(image)}
                      >
                        {/* Image Container with fixed height */}
                        <div className="p-4 sm:p-6 lg:p-8 h-[50vh] lg:h-[60vh]">
                          <img
                            src={image.src}
                            alt={image.title}
                            className="w-full h-full object-cover rounded-lg transition-transform duration-500 
                                       group-hover:scale-[1.02]"
                          />
                        </div>

                        {/* Caption Overlay */}
                        <div className="px-4 sm:px-6 lg:px-8 pb-4 sm:pb-6 lg:pb-8 pt-0 flex items-end justify-between">
                          <div>
                            <h3 className="text-foreground font-medium text-lg lg:text-xl">
                              {image.title}
                            </h3>
                            {image.description && (
                              <p className="text-muted-foreground text-sm lg:text-base mt-1">
                                {image.description}
                              </p>
                            )}
                          </div>
                          {image.prototypeUrl && (
                            <button
                              onClick={(e) => handleOpenPrototype(e, image)}
                              className="flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 
                                         border border-primary/30 rounded-full text-sm font-medium text-primary
                                         transition-colors"
                            >
                              View Prototype
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                <circle cx="8.5" cy="8.5" r="1.5" />
                                <polyline points="21 15 16 10 5 21" />
                              </svg>
                            </button>
                          )}
                        </div>

                        {/* Hover Expand Hint */}
                        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 
                                        opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="bg-background/80 backdrop-blur-sm rounded-full p-2 
                                          border border-border/50">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-foreground"
                            >
                              <path d="M15 3h6v6" />
                              <path d="M9 21H3v-6" />
                              <path d="M21 3l-7 7" />
                              <path d="M3 21l7-7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </DialogTrigger>

                    {/* Lightbox Dialog */}
                    <DialogContent className="max-w-[95vw] lg:max-w-[85vw] xl:max-w-[75vw] p-0 bg-background/95 backdrop-blur-md border-border/50">
                      <div className="p-4 sm:p-6 lg:p-8">
                        <img
                          src={image.src}
                          alt={image.title}
                          className="w-full h-auto rounded-lg"
                        />
                        <div className="mt-4 lg:mt-6">
                          <h3 className="text-foreground font-medium text-xl lg:text-2xl">
                            {image.title}
                          </h3>
                          {image.description && (
                            <p className="text-muted-foreground text-base lg:text-lg mt-2">
                              {image.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
              </CarouselItem>
            ))}
          </CarouselContent>
        </div>
      </Carousel>

      {/* Prototype Modal */}
      <Dialog open={prototypeOpen} onOpenChange={setPrototypeOpen}>
        <DialogContent className="max-w-[95vw] h-[90vh] p-0 bg-background border-border/50 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-border/50 bg-background">
            <div>
              <h3 className="text-foreground font-medium text-lg">
                {prototypeImage?.title} — Prototype
              </h3>
              <p className="text-muted-foreground text-sm">
                Interactive preview
              </p>
            </div>
          </div>
          
          {/* Iframe Container */}
          <div className="flex-1 w-full h-[calc(90vh-73px)] bg-muted/20">
            {prototypeImage?.prototypeUrl && (
              <iframe
                src={prototypeImage.prototypeUrl}
                className="w-full h-full border-0"
                allowFullScreen
                title={`${prototypeImage.title} Prototype`}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Gallery3D;
