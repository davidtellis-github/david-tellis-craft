import React from "react";
import { Link } from "react-router-dom";
import w1 from "@/assets/work-1.jpg";
import w2 from "@/assets/work-2.jpg";
import w3 from "@/assets/work-3.jpg";
import w4 from "@/assets/work-4.jpg";

const projects = [{
  title: "Wedding Verse",
  img: w1,
  slug: "wedding-verse",
  description: "End-to-end product design"
}, {
  title: "Futurcraft AI",
  img: w2,
  slug: "futurcraft-ai",
  description: "AI product prototyping"
}, {
  title: "Turbocloud",
  img: w3,
  slug: "turbocloud",
  description: "Enterprise FinOps platform"
}, {
  title: "Outrange / Seminar Room",
  img: w4,
  slug: "outrange-seminar-room",
  description: "Creative conceptual project"
}];

const WorkGrid: React.FC = () => {
  return <section id="work" className="min-h-screen flex flex-col justify-center py-12 sm:py-16 lg:py-20">
      <div className="w-full">
        {/* Projects List */}
        <div className="space-y-6 sm:space-y-8 lg:space-y-12">
          {projects.map((project, index) => (
            <div 
              key={project.title} 
              className={`border-t border-border pt-6 sm:pt-8 first:border-t-0 first:pt-0 group transition-all duration-500 ${
                index === 0 ? '' : 'hover:bg-muted/5'
              }`}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 items-start">
                {/* Title */}
                <div className="sm:col-span-1 lg:col-span-4">
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold uppercase tracking-tight">
                    {project.title}
                  </h3>
                </div>
                
                {/* Description - Always visible on mobile, hover on desktop */}
                <div className={`sm:col-span-1 lg:col-span-6 space-y-3 sm:space-y-4 transition-all duration-500 ${
                  index === 0 
                    ? 'opacity-100 max-h-none' 
                    : 'opacity-100 sm:opacity-0 max-h-none sm:max-h-0 overflow-hidden sm:group-hover:opacity-100 sm:group-hover:max-h-96'
                }`}>
                  <p className="text-sm sm:text-base text-foreground">
                    {project.description}
                  </p>
                  {index !== 0 && (
                    <Link 
                      to={`/work/${project.slug}`} 
                      className="inline-block mt-3 sm:mt-4 px-4 sm:px-6 py-2 sm:py-3 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-300 font-medium tracking-wide text-sm sm:text-base"
                    >
                      VIEW CASE STUDY
                    </Link>
                  )}
                </div>
                
                {/* Arrow */}
                <div className="hidden sm:flex lg:col-span-2 justify-end">
                  <Link to={`/work/${project.slug}`} className="group" aria-label={`View case study: ${project.title}`}>
                    <div className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center text-primary group-hover:translate-x-1 transition-transform duration-300">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 sm:w-6 sm:h-6">
                        <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>;
};

export default WorkGrid;