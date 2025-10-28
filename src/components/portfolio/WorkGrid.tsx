import React, { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useProjects } from "@/hooks/useProjects";

const WorkGrid: React.FC = () => {
  const [expandedProjects, setExpandedProjects] = useState<Set<number>>(new Set());
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { projects, loading, error } = useProjects();

  // Take only the first 4 projects for the work grid
  const displayProjects = projects.slice(0, 4);

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
        <div className="space-y-8">
          {displayProjects.map((project, index) => {
            const isExpanded = expandedProjects.has(index);
            const featuredAsset = project.assets.find(asset => asset.is_featured);
            
            return (
              <div 
                key={project.id} 
                ref={el => projectRefs.current[index] = el}
                data-index={index}
                className="border-t border-border pt-10 first:border-t-0 first:pt-0 transition-all duration-500"
              >
                {/* Title Row - Full Width */}
                <div className="flex items-center justify-between w-full pb-10">
                  <div className="flex items-center gap-8 ">
                    {/* Number */}
                    <div className="text-2xl font-semibold text-muted-foreground ">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-2xl lg:text-4xl font-medium  tracking-loose">
                      {project.title}
                    </h3>
                  </div>
                  
                  {/* Arrow */}
                  <Link to={`/project/${project.slug}`} className="group" aria-label={`View case study: ${project.title}`}>
                    <div className="w-8 h-8 flex items-center justify-center    text-primary group-hover:translate-x-1 transition-transform duration-300">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="--background" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
                        <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </Link>
                </div>

                {/* Video and Content - Shown based on scroll */}
                <div className={`overflow-hidden autoplay-true transition-all duration-700 mt-6 ${
                  isExpanded 
                    ? 'opacity-100 max-h-full' 
                    : 'opacity-0 max-h-0'
                }`}>
                  {/* Featured Asset or Placeholder */}
                  <div className="aspect-video w-full mb-6">
                    {featuredAsset && featuredAsset.asset_type === 'video' ? (
                      <iframe
                        src={featuredAsset.file_path}
                        className="w-full h-full rounded-lg"
                        frameBorder="0"
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowFullScreen
                        title={`${project.title} video preview`}
                      ></iframe>
                    ) : featuredAsset && featuredAsset.asset_type === 'image' ? (
                      <img 
                        src={featuredAsset.file_path} 
                        alt={featuredAsset.alt_text || `${project.title} preview`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-full h-full bg-muted rounded-lg flex items-center justify-center">
                        <span className="text-muted-foreground">Preview coming soon</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Project Description */}
                  <div className="max-w-2xl">
                    <p className="max-w-full text-md font-light leading-[1.4] tracking-loose text-foreground text-left">
                      {project.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* View All Work CTA */}
        <div className="border-t border-border pt-12 mt-12">
        <Link to="/portfolio" className="group" aria-label="View all work">
          <div className="bg-foreground rounded-lg p-8 group hover:bg-foreground/90 transition-colors duration-300">
            <div className="flex items-center justify-between w-full">
              <div>
                <h3 className="text-3xl lg:text-4xl font-medium  tracking-relaxed mb-2 text-background">
                  View All Work
                </h3>
               
              </div>
              
              
                <div className="w-12 h-12 flex items-center justify-center text-background group-hover:translate-x-2 group-hover:scale-110 transition-all duration-300 bg-background/10 rounded-full">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
                    <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              
            </div>
          </div>
          </Link>
        </div>
        
      </div>
    </section>
  );
};
export default WorkGrid;