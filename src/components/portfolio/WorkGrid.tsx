import React from "react";
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
  return <section id="work" className="min-h-screen flex flex-col justify-center py-20">
      <div className="container mx-auto lg:px-10 px-0">
        {/* Header */}
        

        {/* Projects List */}
        <div className="space-y-8">
          {projects.map((project, index) => (
            <div key={project.title} className="border-t border-border pt-8 first:border-t-0 first:pt-0 group transition-all duration-500 hover:bg-muted/5">
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
                <Link to={`/work/${project.slug}`} className="group" aria-label={`View case study: ${project.title}`}>
                  <div className="w-8 h-8 flex items-center justify-center text-primary group-hover:translate-x-1 transition-transform duration-300">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
                      <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </Link>
              </div>

              {/* Video and Content - Hidden by default, shown on hover */}
              <div className="opacity-0 max-h-0 overflow-hidden group-hover:opacity-100 group-hover:max-h-[800px] transition-all duration-500 mt-6">
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
                
                {/* Project Card */}
                <div className="grid lg:grid-cols-2 gap-8 items-start">
                  {/* Project Image */}
                  <div className="aspect-[4/3] overflow-hidden rounded-lg">
                    <img 
                      src={project.img} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  
                  {/* Project Details */}
                  <div className="space-y-4">
                    <p className="text-foreground">
                      {project.description}
                    </p>
                    <ul className="space-y-2">
                      {project.details.map((detail, i) => (
                        <li key={i} className="text-sm text-muted-foreground">
                          {detail}
                        </li>
                      ))}
                    </ul>
                    <Link 
                      to={`/work/${project.slug}`} 
                      className="inline-block mt-4 px-6 py-3 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-300 font-medium tracking-wide"
                    >
                      VIEW CASE STUDY
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>;
};
export default WorkGrid;