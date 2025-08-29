import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Play, ExternalLink, ArrowUpRight, ArrowLeft } from "lucide-react";
import Header from "@/components/ui/Header";
import ProjectTimeline from "@/components/portfolio/ProjectTimeline";
import TimelineNav from "@/components/portfolio/TimelineNav";

// Import work images
import w1 from "@/assets/work-1.jpg";


const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Fixed Header */}
      <Header />

      {/* Back Button */}
      <div className="fixed top-6 right-6 z-50">
        <Link 
          to="/" 
          className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-muted/80 backdrop-blur-sm hover:bg-muted transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
      </div>

      {/* Timeline Navigation */}
      <TimelineNav 
        activeCategory={activeCategory} 
        onCategoryChange={setActiveCategory}
        hoveredProject={hoveredProject}
        onCategoryHover={setHoveredCategory}
      />

      {/* Main Content Container */}
      <div className="flex flex-col items-center justify-center min-h-screen px-8 pt-20">
        
        {/* My Work Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-left">
            My work
          </h1>
        </div>

        {/* Featured Video */}
        <div className="relative mb-16 w-full">
          <div className="relative overflow-hidden rounded-2xl">
            <div className="relative aspect-video">
              <img 
                src={w1} 
                alt="Featured Work"
                className="w-full h-full object-cover rounded-2xl"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 bg-primary/90 rounded-full flex items-center justify-center hover:scale-110 transition-transform cursor-pointer">
                  <Play className="w-10 h-10 text-primary-foreground ml-1" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Project Timeline */}
        <div className="w-full">
          <ProjectTimeline 
            activeCategory={activeCategory}
            onProjectHover={setHoveredProject}
            hoveredCategory={hoveredCategory}
          />
        </div>

        {/* Call to Action */}
        <section className="py-20 text-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-left">
                Like what you see?
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl text-left">
                Let's collaborate on your next project and create something amazing together.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-start">
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
      </div>
    </div>
  );
};

export default Portfolio;