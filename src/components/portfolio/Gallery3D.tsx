import React, { useState } from "react";
import Autoplay from "embla-carousel-autoplay";
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

// Import gallery images
import galleryDjController from "@/assets/gallery-dj-controller.png";
import gallerySynthUI from "@/assets/gallery-synth-ui.png";
import galleryKeysAngled from "@/assets/gallery-keys-angled.png";

interface GalleryImage {
  src: string;
  title: string;
  description?: string;
}

const galleryImages: GalleryImage[] = [
  {
    src: galleryDjController,
    title: "DJ Controller",
    description: "3D product recreation in Figma",
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

  return (
    <section
      id="gallery"
      className="py-[12vh] lg:py-[15vh]"
    >
      <Carousel
        opts={{
          align: "start",
          loop: galleryImages.length > 1,
        }}
        plugins={[
          Autoplay({
            delay: 4000,
            stopOnInteraction: true,
            stopOnMouseEnter: true,
          }),
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
              </CarouselItem>
            ))}
          </CarouselContent>
        </div>
      </Carousel>
    </section>
  );
};

export default Gallery3D;
