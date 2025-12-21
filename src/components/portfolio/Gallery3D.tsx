import React, { useState } from "react";
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
  // Add more images here as you create them
];

const Gallery3D: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  return (
    <section
      id="gallery"
      className="py-[12vh] lg:py-[15vh]"
    >
      {/* Section Header */}
      <div className="mb-10 lg:mb-14">
        <h2 className="text-[clamp(24px,4vw,40px)] font-medium text-foreground mb-3">
          Gallery
        </h2>
        <p className="text-muted-foreground text-[clamp(14px,1.4vw,18px)] max-w-xl">
          3D product recreations crafted in Figma — exploring form, light, and detail.
        </p>
      </div>

      {/* Horizontal Carousel */}
      <div className="relative -mx-4 sm:-mx-6 lg:-mx-8">
        <Carousel
          opts={{
            align: "start",
            loop: galleryImages.length > 1,
          }}
          className="w-full"
        >
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
                      {/* Image Container with generous padding */}
                      <div className="p-4 sm:p-6 lg:p-8">
                        <img
                          src={image.src}
                          alt={image.title}
                          className="w-full h-auto rounded-lg transition-transform duration-500 
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

          {/* Navigation Arrows - Only show if more than one image */}
          {galleryImages.length > 1 && (
            <>
              <CarouselPrevious className="left-4 lg:left-8 bg-background/80 backdrop-blur-sm border-border/50 hover:bg-background" />
              <CarouselNext className="right-4 lg:right-8 bg-background/80 backdrop-blur-sm border-border/50 hover:bg-background" />
            </>
          )}
        </Carousel>
      </div>
    </section>
  );
};

export default Gallery3D;
