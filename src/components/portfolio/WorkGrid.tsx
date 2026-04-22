import React, { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useProjects } from "@/hooks/useProjects";
import { useSanityProjectFeaturedImages } from "@/hooks/useSanityProjectFeaturedImages";

const WorkGrid: React.FC = () => {
  const [expandedProjects, setExpandedProjects] = useState<Set<number>>(new Set());
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { projects, loading, error } = useProjects();

  // Take only the first 4 projects for the work grid
  const displayProjects = projects.slice(0, 4);
  const { byId: sanityFeaturedById } = useSanityProjectFeaturedImages(displayProjects.map((p) => p.slug));

  // Memoized intersection observer callback
  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const index = parseInt(entry.target.getAttribute('data-index') || '0');
        console.log(`Project ${index} intersecting`); // Debug log
        // Add a staggered delay for sequential opening
        setTimeout(() => {
          setExpandedProjects(prev => new Set(prev).add(index));
        }, index * 200); // Reduced delay for faster response
      }
    });
  }, []);

  // Set up intersection observer after projects are loaded and DOM is ready
  useEffect(() => {
    if (loading || projects.length === 0) return;

    // Ensure refs array is properly sized
    projectRefs.current = projectRefs.current.slice(0, displayProjects.length);

    // Small delay to ensure DOM elements are fully rendered
    const timer = setTimeout(() => {
      const observer = new IntersectionObserver(handleIntersection, { 
        threshold: 0.2, // Lower threshold for earlier triggering
        rootMargin: '-50px 0px' // Less restrictive margin
      });

      // Observe all project elements that exist
      projectRefs.current.forEach((ref, index) => {
        if (ref) {
          console.log(`Observing project ${index}`); // Debug log
          observer.observe(ref);
        }
      });

      // Cleanup function
      return () => {
        console.log('Cleaning up observer'); // Debug log
        observer.disconnect();
      };
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, [projects.length, loading, handleIntersection]);

  // Fallback scroll listener for additional reliability
  useEffect(() => {
    if (loading || projects.length === 0) return;

    const handleScroll = () => {
      projectRefs.current.forEach((ref, index) => {
        if (ref && !expandedProjects.has(index)) {
          const rect = ref.getBoundingClientRect();
          const isVisible = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;
          
          if (isVisible) {
            setTimeout(() => {
              setExpandedProjects(prev => new Set(prev).add(index));
            }, index * 200);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check in case elements are already in view
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [projects.length, loading, expandedProjects]);

  if (loading) {
    return (
      <section id="work" className="min-h-screen flex flex-col justify-center py-20">
        <div className="container  lg:px-0 ">
          <div className="space-y-8">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="border-t border-border pt-8 first:border-t-0 first:pt-0">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-8">
                    <div className="w-8 h-8 bg-muted rounded animate-pulse"></div>
                    <div className="w-48 h-8 bg-muted rounded animate-pulse"></div>
                  </div>
                  <div className="w-8 h-8 bg-muted rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="work" className="min-h-screen flex flex-col justify-center py-20">
        <div className="container mx-auto lg:px-0 px-0">
          <div className="text-center text-muted-foreground">
            Error loading projects: {error}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="work" className="min-h-screen flex flex-col justify-center py-20">
      <div className="">
        {/* Projects List */}
        <div className="space-y-14 md:space-y-16">
          {displayProjects.map((project, index) => {
            const isExpanded = expandedProjects.has(index);
            const featuredAsset =
              project.assets.find((asset) => /featured/i.test(asset.file_name ?? asset.file_path ?? "")) ||
              project.assets.find((asset) => asset.is_featured) ||
              project.assets[0];
            const sanityFeaturedUrl = sanityFeaturedById[project.slug];
            
            return (
            <div 
                key={project.id} 
                ref={el => projectRefs.current[index] = el}
                data-index={index}
                className="transition-all duration-500"
              >
                <Link to={`/project/${project.slug}`} className="block group cursor-pointer interactive" aria-label={`View case study: ${project.title}`}>
                  {/* Title + description (outside thumbnail) */}
                  <div className="mb-5 md:mb-6 flex items-end justify-between gap-6">
                    <div className="min-w-0">
                      <h3 className="text-2xl md:text-4xl lg:text-5xl font-medium tracking-tight text-foreground">
                        {project.title}
                      </h3>
                    {project.description && (
                      <p className="mt-3 text-sm md:text-base text-muted-foreground max-w-3xl leading-relaxed overflow-hidden [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical]">
                        {project.description}
                      </p>
                    )}
                      <div className="flex flex-wrap gap-2 mt-4">
                        {project.role_title?.split('/').map((role, i) => (
                          <span
                            key={i}
                            className="text-xs md:text-sm text-foreground/80 bg-muted/60 backdrop-blur-sm px-3 py-1 rounded-full border border-border/40"
                          >
                            {role.trim()}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Arrow CTA (bottom-right of header) */}
                    <div className="w-10 h-10 md:w-12 md:h-12 flex-shrink-0 flex items-center justify-center bg-muted/70 backdrop-blur-sm text-foreground rounded-full group-hover:bg-foreground group-hover:text-background group-hover:scale-110 transition-all duration-300 border border-border/40">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        aria-hidden="true"
                      >
                        <path
                          d="M7 17L17 7M17 7H7M17 7V17"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Image with Gradient Overlay */}
                  <div className={`relative overflow-hidden rounded-2xl transition-all duration-700 ${
                    isExpanded 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-8'
                  }`}>
                    {/* Featured Asset */}
                    {featuredAsset && featuredAsset.asset_type === 'video' ? (
                      <iframe
                        src={featuredAsset.file_path}
                        className="w-full h-full absolute inset-0 pointer-events-none"
                        frameBorder="0"
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowFullScreen
                        title={`${project.title} video preview`}
                      ></iframe>
                    ) : sanityFeaturedUrl ? (
                      <img
                        src={sanityFeaturedUrl}
                        alt={`${project.title} featured preview`}
                        className="w-full h-auto block rounded-2xl"
                        loading="lazy"
                      />
                    ) : featuredAsset && featuredAsset.asset_type === 'image' ? (
                      <img 
                        src={featuredAsset.file_path} 
                        alt={featuredAsset.alt_text || `${project.title} preview`}
                        className="w-full h-auto block rounded-2xl"
                      />
                    ) : (
                      <div className="w-full h-full absolute inset-0 bg-muted flex items-center justify-center">
                        <span className="text-muted-foreground">Preview coming soon</span>
                      </div>
                    )}

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
        
        {/* View All Work CTA */}
        <div className="border-t border-border pt-10 mt-12 flex justify-end">
          <Link
            to="/portfolio"
            className="group interactive inline-flex items-center gap-3 rounded-full bg-foreground text-background px-5 py-3 text-sm md:text-base hover:bg-foreground/90 transition-colors"
            aria-label="View all work"
          >
            <span className="font-medium">View all work</span>
            <span className="w-9 h-9 flex items-center justify-center bg-background/10 rounded-full group-hover:translate-x-1 group-hover:scale-110 transition-all duration-300">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                aria-hidden="true"
              >
                <path
                  d="M7 17L17 7M17 7H7M17 7V17"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </Link>
        </div>
        
      </div>
    </section>
  );
};
export default WorkGrid;
