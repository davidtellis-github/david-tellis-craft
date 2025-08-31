import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import w1 from "@/assets/work-1.jpg";
import w2 from "@/assets/work-2.jpg";
import w3 from "@/assets/work-3.jpg";
import w4 from "@/assets/work-4.jpg";
import w5 from "@/assets/work-5.jpg";
import w6 from "@/assets/work-6.jpg";
import w7 from "@/assets/work-7.jpg";
import w8 from "@/assets/work-8.jpg";
import w9 from "@/assets/work-9.jpg";
const projects = [{
  title: "Wedding Verse",
  img: w1,
  slug: "wedding-verse",
  video: "https://player.vimeo.com/video/123456789",
  description: "A shared workspace for couples, planners, and vendors that turns inspiration into booked services.",
  details: ["Guided workspace that compresses decisions into packages", "Multi-stakeholder collaboration platform", "Improved clarity and velocity under wedding timeline constraints"]
}, {
  title: "Futurcraft AI",
  img: w2,
  slug: "futurcraft-ai",
  video: "https://player.vimeo.com/video/987654321",
  description: "A brand-aligned AI content engine for creating consistent, multi-format content at scale.",
  details: ["Brand DNA capture for AI-generated consistency", "Multi-format content creation and repurposing", "Reduced content turnaround by 70%"]
}, {
  title: "Turbocloud",
  img: w3,
  slug: "turbocloud",
  video: "https://player.vimeo.com/video/456789123",
  description: "FinOps platform for monitoring and optimizing cloud costs across AWS, Azure, and GCP.",
  details: ["Unified cloud cost visibility and management", "CI/CD workflow integration with cost tracking", "Automated optimization recommendations"]
}, {
  title: "Outrange",
  img: w4,
  slug: "outrange",
  video: "https://player.vimeo.com/video/789123456",
  description: "Conceptual lifestyle app exploring community-driven adventure planning and discovery.",
  details: ["Moodboard-driven experience discovery", "Collaborative group planning with polls", "Interactive map interface for adventure planning"]
}];
const WorkGrid: React.FC = () => {
  const [expandedProjects, setExpandedProjects] = useState<Set<number>>(new Set());
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            // Add a staggered delay for sequential opening
            setTimeout(() => {
              setExpandedProjects(prev => new Set(prev).add(index));
            }, index * 300);
          }
        });
      },
      { 
        threshold: 0.3,
        rootMargin: '-100px 0px'
      }
    );

    projectRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return <section id="work" className="min-h-screen flex flex-col justify-center py-20">
      <div className="container mx-auto lg:px-0 px-0">
        {/* Header */}
        

        {/* Projects List */}
        <div className="space-y-8">
          {projects.map((project, index) => {
            const isExpanded = expandedProjects.has(index);
            return (
            <div 
              key={project.title} 
              ref={el => projectRefs.current[index] = el}
              data-index={index}
              className="border-t border-border pt-8 first:border-t-0 first:pt-0 transition-all duration-500"
            >
              {/* Title Row - Full Width */}
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-8">
                  {/* Number */}
                  <div className="text-2xl font-bold text-muted-foreground">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-2xl lg:text-3xl font-bold uppercase tracking-tight">
                    {project.title}
                  </h3>
                </div>
                
                {/* Arrow */}
                <Link to={`/project/${project.slug}`} className="group" aria-label={`View case study: ${project.title}`}>
                  <div className="w-8 h-8 flex items-center justify-center text-primary group-hover:translate-x-1 transition-transform duration-300">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
                      <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </Link>
              </div>

              {/* Video and Content - Shown based on scroll */}
              <div className={`overflow-hidden transition-all duration-700 mt-6 ${
                isExpanded 
                  ? 'opacity-100 max-h-[800px]' 
                  : 'opacity-0 max-h-0'
              }`}>
                {/* Video Preview */}
                <div className="aspect-video w-full mb-6">
                  <iframe
                    src={project.video}
                    className="w-full h-full rounded-lg"
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                
                {/* Project Description Only */}
                <div className="max-w-2xl">
                  <p className="text-foreground text-lg leading-relaxed">
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
          <div className="bg-foreground rounded-lg p-8 group hover:bg-foreground/90 transition-colors duration-300">
            <div className="flex items-center justify-between w-full">
              <div>
                <h3 className="text-3xl lg:text-4xl font-bold uppercase tracking-tight mb-2 text-background">
                  View All Work
                </h3>
                <p className="text-background/70 text-lg">
                  Explore my complete portfolio
                </p>
              </div>
              
              <Link to="/portfolio" className="group" aria-label="View all work">
                <div className="w-12 h-12 flex items-center justify-center text-background group-hover:translate-x-2 group-hover:scale-110 transition-all duration-300 bg-background/10 rounded-full">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
                    <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default WorkGrid;