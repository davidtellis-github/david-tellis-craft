import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, ExternalLink, ArrowUpRight, ArrowLeft } from "lucide-react";
import PortfolioNav from "@/components/portfolio/PortfolioNav";

// Import work images
import w1 from "@/assets/work-1.jpg";
import w2 from "@/assets/work-2.jpg";
import w3 from "@/assets/work-3.jpg";
import w4 from "@/assets/work-4.jpg";
import w5 from "@/assets/work-5.jpg";
import w6 from "@/assets/work-6.jpg";
import w7 from "@/assets/work-7.jpg";
import w8 from "@/assets/work-8.jpg";
import w9 from "@/assets/work-9.jpg";

const featuredProject = {
  id: "wedding-verse-featured",
  title: "Wedding Verse",
  tagline: "Transforming wedding planning through collaborative design",
  description: "A comprehensive workspace connecting couples, planners, and vendors. This project demonstrates my ability to design for multiple stakeholders while maintaining clarity under tight timeline constraints.",
  category: "live",
  tags: ["UX Design", "Product Strategy", "Prototyping", "2024"],
  image: w1,
  hasVideo: true,
  link: "/work/wedding-verse"
};

const projects = {
  b2c: [
    {
      id: "wedding-verse",
      title: "Wedding Verse",
      tagline: "Shared workspace for wedding stakeholders",
      category: "b2c",
      tags: ["Product Design", "UX Research", "2024"],
      image: w1,
      link: "/work/wedding-verse"
    },
    {
      id: "project-alpha",
      title: "Project Alpha",
      tagline: "E-commerce redesign for fashion brand",
      category: "b2c",
      tags: ["E-commerce", "Visual Design", "2024"],
      image: w5,
      link: "/project/project-alpha"
    }
  ],
  ai: [
    {
      id: "futurcraft-ai",
      title: "Futurcraft AI",
      tagline: "Brand-aligned AI content engine",
      category: "ai",
      tags: ["AI/ML", "Content Tools", "2025"],
      image: w2,
      link: "/work/futurcraft-ai"
    }
  ],
  healthcare: [
    {
      id: "health-project",
      title: "HealthCare Platform",
      tagline: "Patient management system",
      category: "healthcare",
      tags: ["Healthcare", "UX Design", "2024"],
      image: w4,
      link: "/project/health-project"
    }
  ],
  finops: [
    {
      id: "turbocloud",
      title: "Turbocloud",
      tagline: "FinOps platform for cloud optimization",
      category: "finops", 
      tags: ["Dashboard Design", "Enterprise UX", "2025"],
      image: w3,
      link: "/work/turbocloud"
    }
  ],
  webdesigns: [
    {
      id: "web-design-1",
      title: "Corporate Website",
      tagline: "Modern corporate identity redesign",
      category: "webdesigns",
      tags: ["Web Design", "Branding", "2024"],
      image: w6,
      link: "/project/web-design-1"
    }
  ],
  interactions: [
    {
      id: "ui-exploration-1",
      title: "UI Exploration #1",
      tagline: "Banking app interface exploration",
      category: "interactions",
      tags: ["Mobile UI", "FinTech", "2024"],
      image: w7,
      link: "/project/ui-exploration-1"
    },
    {
      id: "ui-exploration-2",
      title: "UI Exploration #2", 
      tagline: "Music streaming app concept",
      category: "interactions",
      tags: ["Music", "Mobile UI", "2024"],
      image: w8,
      link: "/project/ui-exploration-2"
    }
  ],
  b2b: [
    {
      id: "project-beta", 
      title: "Project Beta",
      tagline: "SaaS dashboard for analytics platform",
      category: "b2b",
      tags: ["SaaS", "Data Viz", "2023"],
      image: w9,
      link: "/project/project-beta"
    }
  ]
};

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState("b2c");

  const getAllProjects = () => {
    return [
      ...projects.b2c,
      ...projects.ai,
      ...projects.healthcare,
      ...projects.finops,
      ...projects.webdesigns,
      ...projects.interactions,
      ...projects.b2b
    ];
  };

  const getAllProjectsByCategory = () => {
    return [
      { category: "b2c", label: "B2C", projects: projects.b2c },
      { category: "ai", label: "AI", projects: projects.ai },
      { category: "healthcare", label: "Healthcare", projects: projects.healthcare },
      { category: "finops", label: "Finops", projects: projects.finops },
      { category: "webdesigns", label: "Web designs", projects: projects.webdesigns },
      { category: "interactions", label: "Interactions", projects: projects.interactions },
      { category: "b2b", label: "B2B", projects: projects.b2b }
    ];
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Back Button */}
      <div className="fixed top-6 left-6 z-50">
        <Link 
          to="/" 
          className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-muted/80 backdrop-blur-sm hover:bg-muted transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
      </div>

      {/* Hero Section */}
      <section className="pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-6 text-right">
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight">
              My Work
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl ml-auto">
              A mix of live projects, audience-loved designs, freelance gigs, and passion projects
            </p>
          </div>
        </div>
      </section>

      {/* Main layout with Navigation + Projects */}
      <div className="flex gap-[4vw] lg:gap-[6vw]">
        <PortfolioNav 
          activeCategory={activeCategory} 
          onCategoryChange={setActiveCategory} 
        />
        
        {/* Projects Section */}
        <section id="projects-section" className="flex flex-col flex-1 min-w-0 py-20">
          {getAllProjectsByCategory().map((categoryData, categoryIndex) => (
            <div key={categoryData.category}>
              {/* Category Section */}
              <div id={`category-${categoryData.category}`} className="scroll-mt-20 mb-16">
                {categoryData.projects.length >= 2 ? (
                  // Horizontal scroll for 2+ cards
                  <div className="overflow-x-auto pb-4">
                    <div className="flex gap-8 w-max">
                      {categoryData.projects.map((project) => (
                        <Link 
                          key={project.id}
                          to={project.link}
                          className="group block w-[400px] flex-shrink-0"
                        >
                          <Card className="overflow-hidden border-0 bg-transparent hover:scale-105 transition-transform duration-300">
                            <div className="relative overflow-hidden rounded-2xl aspect-[4/3]">
                              <img 
                                src={project.image} 
                                alt={project.title}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                              
                              {/* Content overlay */}
                              <div className="absolute bottom-6 left-6 right-6">
                                <div className="flex flex-wrap gap-2 mb-3">
                                  {project.tags.map((tag) => (
                                    <Badge key={tag} variant="secondary" className="text-xs bg-white/20 text-white border-white/30">
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                                
                                <h3 className="text-xl font-bold text-white mb-2">
                                  {project.title}
                                </h3>
                                <p className="text-sm text-white/80 leading-relaxed">
                                  {project.tagline}
                                </p>
                              </div>
                              
                              {/* Arrow icon */}
                              <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <ArrowUpRight className="w-4 h-4 text-white" />
                              </div>
                            </div>
                          </Card>
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  // Single card layout
                  <div className="w-[400px]">
                    {categoryData.projects.map((project) => (
                      <Link 
                        key={project.id}
                        to={project.link}
                        className="group block"
                      >
                        <Card className="overflow-hidden border-0 bg-transparent hover:scale-105 transition-transform duration-300">
                          <div className="relative overflow-hidden rounded-2xl aspect-[4/3]">
                            <img 
                              src={project.image} 
                              alt={project.title}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                            
                            {/* Content overlay */}
                            <div className="absolute bottom-6 left-6 right-6">
                              <div className="flex flex-wrap gap-2 mb-3">
                                {project.tags.map((tag) => (
                                  <Badge key={tag} variant="secondary" className="text-xs bg-white/20 text-white border-white/30">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                              
                              <h3 className="text-xl font-bold text-white mb-2">
                                {project.title}
                              </h3>
                              <p className="text-sm text-white/80 leading-relaxed">
                                {project.tagline}
                              </p>
                            </div>
                            
                            {/* Arrow icon */}
                            <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <ArrowUpRight className="w-4 h-4 text-white" />
                            </div>
                          </div>
                        </Card>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Divider line between categories (except after last category) */}
              {categoryIndex < getAllProjectsByCategory().length - 1 && (
                <div className="w-full h-px bg-border mb-16"></div>
              )}
            </div>
          ))}
        </section>
      </div>

      {/* Featured Project - Moved to end */}
      <section className="px-6 py-8">
        <div className="relative overflow-hidden rounded-2xl">
          <div className="relative min-h-[85vh]">
            <img 
              src={featuredProject.image} 
              alt={featuredProject.title}
              className="w-full h-full object-cover rounded-2xl"
            />
            {featuredProject.hasVideo && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 bg-primary/90 rounded-full flex items-center justify-center hover:scale-110 transition-transform cursor-pointer">
                  <Play className="w-10 h-10 text-primary-foreground ml-1" />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto ml-[22vw] space-y-12">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
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
    </div>
  );
};

export default Portfolio;