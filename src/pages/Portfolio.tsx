import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import ProjectTimeline from "@/components/portfolio/ProjectTimeline";
import TimelineNav from "@/components/portfolio/TimelineNav";
import PortfolioMobileNav from "@/components/portfolio/PortfolioMobileNav";

import Gallery3D from "@/components/portfolio/Gallery3D";


const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <PortfolioMobileNav />

      {/* Back Button */}
      <div className="fixed top-6 right-6 z-50">
        <Link
          to="/"
          className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-muted/80 backdrop-blur-sm hover:bg-muted transition-colors interactive"
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

          <section className="flex flex-col flex-1 min-w-0 py-[14vh] lg:py-[20vh]">
            {/* Project Timeline */}
            <div id="projects" className="w-full scroll-mt-20">
              <p className="text-sm text-muted-foreground mb-10 lg:mb-14">
                These are some of the projects I worked as a Product designer.
              </p>
              <ProjectTimeline
                activeCategory={activeCategory}
                onProjectHover={setHoveredProject}
                hoveredCategory={hoveredCategory}
              />
            </div>

            {/* 3D Product Gallery */}
            <div id="3d-gallery" className="scroll-mt-20">
              <Gallery3D />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Portfolio;