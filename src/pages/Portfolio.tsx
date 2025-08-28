import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, ExternalLink, ArrowUpRight, ArrowLeft } from "lucide-react";

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
  live: [
    {
      id: "wedding-verse",
      title: "Wedding Verse",
      tagline: "Shared workspace for wedding stakeholders",
      category: "live",
      tags: ["Product Design", "UX Research", "2024"],
      image: w1,
      link: "/work/wedding-verse"
    },
    {
      id: "turbocloud",
      title: "Turbocloud",
      tagline: "FinOps platform for cloud optimization",
      category: "live", 
      tags: ["Dashboard Design", "Enterprise UX", "2025"],
      image: w3,
      link: "/work/turbocloud"
    }
  ],
  audience: [
    {
      id: "futurcraft-ai",
      title: "Futurcraft AI",
      tagline: "Brand-aligned AI content engine",
      category: "audience",
      tags: ["AI/ML", "Content Tools", "2025"],
      image: w2,
      link: "/work/futurcraft-ai"
    }
  ],
  freelance: [
    {
      id: "project-alpha",
      title: "Project Alpha",
      tagline: "E-commerce redesign for fashion brand",
      category: "freelance",
      tags: ["E-commerce", "Visual Design", "2024"],
      image: w5,
      link: "/project/project-alpha"
    },
    {
      id: "project-beta", 
      title: "Project Beta",
      tagline: "SaaS dashboard for analytics platform",
      category: "freelance",
      tags: ["SaaS", "Data Viz", "2023"],
      image: w6,
      link: "/project/project-beta"
    }
  ],
  passion: [
    {
      id: "outrange",
      title: "Outrange",
      tagline: "Community-driven adventure planning concept",
      category: "passion",
      tags: ["Concept", "Mobile UI", "2024"],
      image: w4,
      link: "/work/outrange"
    },
    {
      id: "ui-exploration-1",
      title: "UI Exploration #1",
      tagline: "Banking app interface exploration",
      category: "passion",
      tags: ["Mobile UI", "FinTech", "2024"],
      image: w7,
      link: "/project/ui-exploration-1"
    },
    {
      id: "ui-exploration-2",
      title: "UI Exploration #2", 
      tagline: "Music streaming app concept",
      category: "passion",
      tags: ["Music", "Mobile UI", "2024"],
      image: w8,
      link: "/project/ui-exploration-2"
    }
  ]
};

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const getAllProjects = () => {
    return [
      ...projects.live,
      ...projects.audience,
      ...projects.freelance,
      ...projects.passion
    ];
  };

  const getFilteredProjects = () => {
    if (activeCategory === "all") return getAllProjects();
    return projects[activeCategory as keyof typeof projects] || [];
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
          <div className="space-y-6">
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight">
              My Work
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl">
              A mix of live projects, audience-loved designs, freelance gigs, and passion projects
            </p>
          </div>
        </div>
      </section>

      {/* Full-screen Featured Project */}
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

      {/* Project Categories */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
            <div className="flex justify-center mb-12">
              <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full max-w-2xl">
                <TabsTrigger value="all" className="text-sm">All</TabsTrigger>
                <TabsTrigger value="live" className="text-sm">Live Projects</TabsTrigger>
                <TabsTrigger value="audience" className="text-sm">Mass Audience</TabsTrigger>
                <TabsTrigger value="freelance" className="text-sm">Freelance</TabsTrigger>
                <TabsTrigger value="passion" className="text-sm">Passion UI</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value={activeCategory} className="mt-0">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {getFilteredProjects().map((project) => (
                  <Card 
                    key={project.id} 
                    className="group overflow-hidden border hover:border-primary/20 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="relative overflow-hidden">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-8 h-8 bg-primary/90 rounded-full flex items-center justify-center">
                          <ArrowUpRight className="w-4 h-4 text-primary-foreground" />
                        </div>
                      </div>
                    </div>
                    
                    <CardContent className="p-6 space-y-4">
                      <div className="flex flex-wrap gap-1">
                        {project.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {project.tagline}
                        </p>
                      </div>
                      
                      <Link 
                        to={project.link}
                        className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                      >
                        View Project
                        <ArrowUpRight className="w-3 h-3 ml-1" />
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto space-y-12">
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