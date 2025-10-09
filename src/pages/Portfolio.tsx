import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Play, ExternalLink, ArrowUpRight, ArrowLeft } from "lucide-react";
import Header from "@/components/ui/Header";
import ProjectTimeline from "@/components/portfolio/ProjectTimeline";
import TimelineNav from "@/components/portfolio/TimelineNav";
import { UIGallery } from "@/components/portfolio/UIGallery";
import { useAllProjectAssets } from "@/hooks/useAllProjectAssets";
import { UploadUIAssetsButton } from "@/components/dev/UploadUIAssetsButton";

// Import work images
import w1 from "@/assets/work-1.jpg";
import tuboCloudImg from "@/assets/tubocloud-dashboard.png";
import futurCraftImg from "@/assets/futurcraft-ai.png";
import bostonFinancialImg from "@/assets/boston-financial.png";
import medpassImg from "@/assets/medpass-healthcare.png";


const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const { assets, isLoading } = useAllProjectAssets();

  return (
    <div className="min-h-screen bg-background text-foreground">
   

      {/* Back Button */}
      <div className="fixed top-6 right-6 z-50">
        <Link 
          to="/" 
          className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-muted/80 backdrop-blur-sm hover:bg-muted transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
      </div>

      <main className="w-[98vw] mx-auto px-4 md:px-6">
        {/* Main layout with TimelineNav + content */}
        <div className="flex m-0 gap-[4vw] lg:gap-[6vw]">
          <TimelineNav 
            activeCategory={activeCategory} 
            onCategoryChange={setActiveCategory}
            hoveredProject={hoveredProject}
            onCategoryHover={setHoveredCategory}
          />
          
          <section className="flex flex-col flex-1 min-w-0 py-[20vh]">
            {/* My Work Title */}
            {/* <div className="flex flex-col items-end mb-8 ">
              <div className="text-left">
              <h1 className="text-4xl md:text-5xl mb-8 font-medium tracking-tight">
                My work
              </h1> */}
               {/* Bottom Right: Paragraph */}
    {/* <div className="flex flex-col-2 justify-start items-start mb-0">
      <p className="max-w-2xl text-sm sm:text-base md:text-lg lg:text-[clamp(16px,1.4vmin,18px)] leading-relaxed text-foreground text-left">
        I make things that actually work — and work well. I’m allergic to “good
        enough,” “we’ll fix it later,” and anything that smells like it was
        designed for a presentation, not a human. I ask the awkward questions,
        obsess over the small details, and refuse to let a sloppy handoff ruin a
        solid design.
      </p>
      </div>
    </div>
            </div> */}

            

            {/* Project Timeline */}
            <div className="w-full mb-20">
              <ProjectTimeline 
                activeCategory={activeCategory}
                onProjectHover={setHoveredProject}
                hoveredCategory={hoveredCategory}
              />
            </div>

            {/* UI Gallery - Full Width Section */}
            {!isLoading && assets.length > 0 && (
              <section className="mb-20">
                <div className="mb-8 flex items-start justify-between">
                  <div>
                    <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-4">
                      UI Showcase
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl">
                      A collection of interface designs and explorations from all projects
                    </p>
                  </div>
                  <UploadUIAssetsButton />
                </div>
                
                {/* Break out of container for full-width gallery */}
                <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen px-0">
                  <UIGallery 
                    assets={assets} 
                    projectTitle="All Projects" 
                  />
                </div>
              </section>
            )}

            {/* Featured Video */}
            <div className="relative mb-16 w-full">
              <div className="relative overflow-hidden rounded-2xl">
                <div className="relative aspect-video">
                  <video 
                    src="https://gksxdznfdxrsjqkuzxmg.supabase.co/storage/v1/object/public/project-videos/keyboard%202.mp4"
                    className="w-full h-full object-cover rounded-2xl"
                    controls
                    poster={w1}
                  />
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <section className="py-20">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h2 className="text-4xl md:text-5xl font-medium tracking-tight">
                    Like what you see?
                  </h2>
                  <p className="text-xl text-muted-foreground max-w-2xl">
                    Let's collaborate on your next project and create something amazing together.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" asChild>
                    <Link to="/contact">
                      Start a Project
                      <ArrowUpRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline">
                    Download Resume
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </section>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Portfolio;