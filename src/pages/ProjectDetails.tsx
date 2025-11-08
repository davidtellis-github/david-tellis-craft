import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Play, ExternalLink, Github, Figma, Smartphone, AlertCircle, Target } from "lucide-react";
import ProjectNav from "@/components/portfolio/ProjectNav";
import { projectsData } from "@/data/projectData";
import { useProjectAssets } from "@/hooks/useProjectAssets";
import { UIGallery } from "@/components/portfolio/UIGallery";
import { ImageLightbox } from "@/components/portfolio/ImageLightbox";
import { ProgressIndicator } from "@/components/portfolio/ProgressIndicator";
import { BackToTop } from "@/components/portfolio/BackToTop";
import { AnimatedCounter } from "@/components/portfolio/AnimatedCounter";
import { ExpandableFeatureCard } from "@/components/portfolio/ExpandableFeatureCard";
import { ProcessTimeline } from "@/components/portfolio/ProcessTimeline";
import { QuickStatsBar } from "@/components/portfolio/QuickStatsBar";
import { ScrollIndicator } from "@/components/portfolio/ScrollIndicator";
import { MobileProjectNav } from "@/components/portfolio/MobileProjectNav";
import { ProjectNavigationFooter } from "@/components/portfolio/ProjectNavigationFooter";
// Import mockup images
import weddingverseFeatured from '@/assets/weddingverse-featured.png';
import ideabaazFeatured from '@/assets/ideabaaz-featured.png';
import futurcraftFeatured from '@/assets/futurcraft-featured.png';
import turbocloudFeatured from '@/assets/turbocloud-featured.png';
import designSystem1 from '@/assets/wedding-verse-design-system-1.png';
import designSystem2 from '@/assets/wedding-verse-design-system-2.png';
import designSystem3 from '@/assets/wedding-verse-design-system-3.png';
import iterations1 from '@/assets/wedding-verse-iterations-1.png';
import iterations2 from '@/assets/wedding-verse-iterations-2.png';
import iterations3 from '@/assets/wedding-verse-iterations-3.png';
import weddingverseContext from '@/assets/wedding-verse-context.jpg';
import weddingverseRole from '@/assets/wedding-verse-role.jpg';

// Map of mockup images
const mockupImageMap: Record<string, string> = {
  'weddingverse-featured.png': weddingverseFeatured,
  'ideabaaz-featured.png': ideabaazFeatured,
  'futurcraft-featured.png': futurcraftFeatured,
  'turbocloud-featured.png': turbocloudFeatured,
  'wedding-verse-design-system-1.png': designSystem1,
  'wedding-verse-design-system-2.png': designSystem2,
  'wedding-verse-design-system-3.png': designSystem3,
  'wedding-verse-iterations-1.png': iterations1,
  'wedding-verse-iterations-2.png': iterations2,
  'wedding-verse-iterations-3.png': iterations3,
  'wedding-verse-context.jpg': weddingverseContext,
  'wedding-verse-role.jpg': weddingverseRole,
};

const ProjectDetails: React.FC = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  // Get project data based on slug
  const project = slug ? projectsData[slug] : null;
  
  // Get project assets for gallery
  const { assets, explorations, isLoading } = useProjectAssets(slug || "");
  
  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxCaptions, setLightboxCaptions] = useState<string[]>([]);

  const openLightbox = (images: string[], index: number, captions?: string[]) => {
    setLightboxImages(images);
    setLightboxIndex(index);
    setLightboxCaptions(captions || []);
    setLightboxOpen(true);
  };
  
  const allUIAssets = [
    // Add mockup images from projectData
    ...(project?.mockupImages || []).map((imagePath, index) => ({
      id: `mockup-${index}`,
      title: `${project?.title || 'Project'} - UI ${index + 1}`,
      description: undefined,
      image_url: mockupImageMap[imagePath] || imagePath,
      tags: [],
      contribution_level: 'full',
      is_featured: index === 0
    })),
    // Add database assets
    ...assets.map(asset => ({
      id: asset.id,
      title: asset.alt_text || `${project?.title || 'Project'} UI`,
      description: asset.caption,
      image_url: asset.file_path,
      tags: asset.asset_tags,
      contribution_level: 'full',
      is_featured: asset.is_featured
    })),
    // Add UI explorations
    ...explorations.map(exploration => ({
      id: exploration.id,
      title: exploration.title,
      description: exploration.description,
      image_url: exploration.image_url,
      tags: exploration.tags,
      contribution_level: exploration.contribution_level,
      is_featured: exploration.is_featured
    }))
  ];

  // Redirect to 404 if project not found
  if (!project) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-end justify-center">
        <div className="text-end">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <p className="text-muted-foreground mb-8">The project you're looking for doesn't exist.</p>
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 bg-foreground text-background px-6 py-3 rounded-full hover:bg-foreground/90 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Portfolio
          </Link>
        </div>
      </div>
    );
  }

  // SEO setup
  useEffect(() => {
    document.title = `${project.title} - Project Case Study`;
    
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", project.description);
  }, [project.title, project.description]);

  return (
    <div className="min-h-screen bg-background text-foreground pb-20 lg:pb-0">
      {/* Progress Indicator */}
      <ProgressIndicator />
      
      {/* Back to Top */}
      <BackToTop />
      
      {/* Mobile Navigation */}
      <MobileProjectNav />

      {/* Back Button */}
      <div className="fixed top-6 right-6 z-50">
        <button 
          onClick={() => navigate(-1)}
          className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-muted/80 backdrop-blur-sm hover:bg-muted transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
      </div>
      
      {/* Image Lightbox */}
      <ImageLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={lightboxImages}
        currentIndex={lightboxIndex}
        onNavigate={setLightboxIndex}
        captions={lightboxCaptions}
      />

      <main className="w-[98vw] mx-auto px-4 md:px-6">
        {/* Main layout with ProjectNav + content */}
        <div className="flex gap-8 lg:gap-12">
          <ProjectNav />
          
          <section className="flex flex-col flex-1 min-w-0 py-[20vh]">
        {/* Hero Section */}
        <section id="overview" className="py-20 pt-16">
            <div className="mb-16">
            {/* Project Tags */}
            <div className="flex flex-wrap gap-2 mb-6 animate-fade-in">
              <span className="px-3 py-1 text-xs rounded-full bg-muted text-muted-foreground">
                {project.category.charAt(0).toUpperCase() + project.category.slice(1)} Design
              </span>
              <span className="px-3 py-1 text-xs rounded-full bg-muted text-muted-foreground">
                {project.year}
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tight leading-[1.1] mb-6 animate-fade-in">
              {project.title}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed mb-12 animate-fade-in" style={{ animationDelay: '100ms' }}>
              {project.subtitle}
            </p>

            {/* Hero Image or Video Section */}
            {project.videoUrl ? (
              <div className="relative aspect-video rounded-lg overflow-hidden mb-8 animate-fade-in group" style={{ animationDelay: '200ms' }}>
                <iframe
                  src={project.videoUrl}
                  className="absolute inset-0 w-full h-full"
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
                  title={`${project.title} Video`}
                />
              </div>
            ) : project.mockupImages && project.mockupImages.length > 0 ? (
              <div 
                className="relative rounded-lg overflow-hidden mb-8 animate-fade-in group cursor-pointer hover:shadow-xl transition-shadow duration-300" 
                style={{ animationDelay: '200ms' }}
                onClick={() => openLightbox([mockupImageMap[project.mockupImages[0]] || project.mockupImages[0]], 0)}
              >
                <img 
                  src={mockupImageMap[project.mockupImages[0]] || project.mockupImages[0]} 
                  alt={`${project.title} interface mockup`}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            ) : (
              <div className="relative aspect-video bg-muted/50 rounded-lg overflow-hidden group cursor-pointer mb-8 animate-fade-in" style={{ animationDelay: '200ms' }}>
                <div className="absolute inset-0 bg-gradient-to-br from-background/20 to-background/5 flex items-center justify-center">
                  <div className="bg-background/90 rounded-full p-8 group-hover:scale-110 transition-transform">
                    <Play className="h-12 w-12 text-foreground ml-1" />
                  </div>
                </div>
              </div>
            )}
            
            {/* Scroll Indicator */}
            <div className="flex justify-center mb-16 animate-fade-in" style={{ animationDelay: '300ms' }}>
              <ScrollIndicator />
            </div>
            
            {/* Quick Stats Bar */}
            <div className="mb-16 animate-fade-in" style={{ animationDelay: '400ms' }}>
              <QuickStatsBar
                team={project.role.team}
                duration={project.role.duration}
                services={project.services}
                tools={project.role.tools}
              />
            </div>
            
            <div className="grid md:grid-cols-2 gap-16 mb-16">
              <div>
                <p className="text-base md:text-lg text-muted-foreground leading-[1.8] font-light">
                  {project.description}
                </p>
              </div>
              
              <div className="space-y-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground mb-2 font-medium">Role</p>
                  <p className="text-base font-light">{project.role.title}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground mb-2 font-medium">Duration</p>
                  <p className="text-base font-light">{project.role.duration}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground mb-2 font-medium">Team</p>
                  <p className="text-base font-light">{project.role.team}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground mb-2 font-medium">Tools</p>
                  <p className="text-base font-light">{project.role.tools.join(" • ")}</p>
                </div>
                {project.id === "wedding-verse" && (
                  <div className="pt-4 border-t border-border/20">
                    <p className="text-sm text-muted-foreground">
                      🚀 <strong>Update:</strong> Mobile app launched on Play Store (2025).
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Challenge Highlight Callout */}
        <div className="py-12 animate-fade-in">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 mb-4 text-muted-foreground">
              <AlertCircle className="w-5 h-5" />
              <span className="text-sm uppercase tracking-wider">Key Challenge</span>
            </div>
            <p className="text-2xl md:text-3xl font-light leading-relaxed text-foreground">
              {project.context.problem.split('.')[0]}.
            </p>
          </div>
        </div>

        {/* Context Section */}
        <section id="context" className="py-12 border-b border-border/10">
          <h2 className="text-2xl font-light mb-8">Context & Challenge</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              {/* Problem Card */}
              <div className="border border-border rounded-lg p-6 hover:border-foreground/20 hover:shadow-md transition-all duration-300 bg-card">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
                    <AlertCircle className="w-5 h-5 text-destructive" />
                  </div>
                  <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-[0.15em]">Problem</h3>
                </div>
                <p className="text-base leading-[1.8] font-light">
                  {project.context.problem}
                </p>
              </div>
              
              {/* Objective Card */}
              <div className="border border-border rounded-lg p-6 hover:border-foreground/20 hover:shadow-md transition-all duration-300 bg-card">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Target className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-[0.15em]">Objective</h3>
                </div>
                <p className="text-base leading-[1.8] font-light">
                  {project.context.objective}
                </p>
              </div>
            </div>
            
            {project.mockupImages && project.mockupImages[1] ? (
              <div 
                className="rounded-lg overflow-hidden cursor-pointer group hover:shadow-xl transition-shadow duration-300"
                onClick={() => openLightbox([mockupImageMap[project.mockupImages[1]] || project.mockupImages[1]], 0)}
              >
                <img 
                  src={mockupImageMap[project.mockupImages[1]] || project.mockupImages[1]} 
                  alt={`${project.title} context mockup`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            ) : (
              <div className="bg-muted/30 rounded-lg h-80"></div>
            )}
          </div>
        </section>

        {/* Role & Impact */}
        <section id="role" className="py-12 border-b border-border/10">
          <h2 className="text-2xl font-light mb-8">Role & Impact</h2>
          <div className="grid md:grid-cols-2 gap-12">
            {project.mockupImages && project.mockupImages[2] ? (
              <div 
                className="rounded-lg overflow-hidden h-full cursor-pointer group hover:shadow-xl transition-shadow duration-300"
                onClick={() => openLightbox([mockupImageMap[project.mockupImages[2]] || project.mockupImages[2]], 0)}
              >
                <img 
                  src={mockupImageMap[project.mockupImages[2]] || project.mockupImages[2]} 
                  alt={`${project.title} role mockup`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            ) : (
              <div className="bg-muted/30 rounded-lg h-80"></div>
            )}
            <div>
              <h3 className="text-sm font-medium mb-4 text-muted-foreground uppercase tracking-[0.15em]">
                {project.role.title}
              </h3>
              <div className="bg-muted/30 rounded-lg p-4 mb-6">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Duration:</span>
                    <p className="font-medium">{project.role.duration}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Team:</span>
                    <p className="font-medium">{project.role.team.split('•')[0].trim()}</p>
                  </div>
                </div>
              </div>
              
              <h3 className="text-sm font-medium mb-4 text-muted-foreground uppercase tracking-[0.15em]">Key Outcomes</h3>
              <div className="space-y-4">
                {project.outcomes.map((outcome, index) => (
                  <div 
                    key={index} 
                    className="group hover:bg-muted/30 rounded-lg p-3 transition-all duration-300 animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex justify-between items-start gap-4">
                      <span className="text-sm font-light text-muted-foreground">{outcome.metric}</span>
                      <AnimatedCounter 
                        value={outcome.value}
                        className="text-2xl font-light text-foreground"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="py-12 border-b border-border/10">
          <h2 className="text-2xl font-light mb-8">Features & Complexity</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {project.features.map((feature, index) => (
              <div 
                key={index}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <ExpandableFeatureCard
                  title={feature.title}
                  description={feature.description}
                  icon={feature.icon}
                  isComingSoon={feature.description.includes('Coming Soon')}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Process */}
        <section id="process" className="py-12 border-b border-border/10">
          <h2 className="text-2xl font-light mb-8">Process & Approach</h2>
          <ProcessTimeline steps={project.process} />
        </section>
        
        {/* Gallery Section - Moved Earlier */}
        <section id="gallery" className="py-12 border-b border-border/10">
          <h2 className="text-2xl font-light mb-8">UI Gallery</h2>
          {!isLoading && allUIAssets.length > 0 && (
            <UIGallery 
              assets={allUIAssets} 
              projectTitle={project.title}
            />
          )}
          {!isLoading && allUIAssets.length === 0 && (
            <p className="text-muted-foreground text-center py-12">
              No UI assets available for this project yet.
            </p>
          )}
        </section>

        {/* Design System Section */}
        {project.designSystem && (
          <section id="design-system" className="py-12 border-b border-border/10">
            <h2 className="text-2xl font-light mb-8">Design System</h2>
            <div className="mb-8">
              <h3 className="text-sm font-medium mb-4 text-muted-foreground uppercase tracking-[0.15em]">System Goals</h3>
              <ul className="space-y-2 text-sm font-light leading-relaxed">
                {project.designSystem.goals.map((goal, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-muted-foreground mt-1">•</span>
                    <span>{goal}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-8">
              <h3 className="text-sm font-medium mb-4 text-muted-foreground uppercase tracking-[0.15em]">Core Elements</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {project.designSystem.coreElements.map((element, index) => (
                  <div key={index} className="border-l-2 border-border/20 pl-6 py-3">
                    <h4 className="text-base font-normal mb-1">{element.title}</h4>
                    <p className="text-sm text-muted-foreground leading-[1.8] font-light">
                      {element.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {project.designSystem.note && (
              <div className="bg-muted/30 rounded-lg p-4 mb-8">
                <p className="text-sm text-muted-foreground leading-[1.8] font-light italic">
                  {project.designSystem.note}
                </p>
              </div>
            )}

            <div className="grid md:grid-cols-3 gap-4">
              {project.designSystem.images.map((imagePath, index) => (
                <div 
                  key={index} 
                  className="rounded-xl overflow-hidden bg-muted/20 cursor-pointer group hover:shadow-xl transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => openLightbox(
                    project.designSystem!.images.map(img => mockupImageMap[img] || img),
                    index,
                    project.designSystem!.images.map((_, i) => `Design System ${i + 1}`)
                  )}
                >
                  <img 
                    src={mockupImageMap[imagePath] || imagePath}
                    alt={`Design System ${index + 1}`}
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="p-2 text-xs text-center text-muted-foreground">
                    Design System {index + 1}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Iterations & UX Decisions Section */}
        {project.iterations && (
          <section id="iterations" className="py-12 border-b border-border/10">
            <h2 className="text-2xl font-light mb-8">Iterations & UX Decisions</h2>
            {project.iterations.intro && (
              <p className="text-sm text-muted-foreground leading-[1.8] font-light mb-8">
                {project.iterations.intro}
              </p>
            )}

            {project.iterations.note && (
              <div className="bg-muted/30 rounded-lg p-4 mb-8">
                <p className="text-sm text-muted-foreground leading-[1.8] font-light italic">
                  {project.iterations.note}
                </p>
              </div>
            )}

            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
              {project.iterations.images.map((imagePath, index) => (
                <div 
                  key={index} 
                  className="break-inside-avoid cursor-pointer group animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                  onClick={() => openLightbox(
                    project.iterations!.images.map(img => mockupImageMap[img] || img),
                    index,
                    project.iterations!.images.map((_, i) => `Iteration ${i + 1}`)
                  )}
                >
                  <div className="rounded-xl overflow-hidden bg-muted/20 hover:shadow-xl transition-all duration-300">
                    <img 
                      src={mockupImageMap[imagePath] || imagePath}
                      alt={`Design Iterations ${index + 1}`}
                      className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="p-2 text-xs text-center text-muted-foreground">
                      Iteration {index + 1}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Video Walkthrough */}
        <section id="walkthrough" className="py-12 border-b border-border/10">
          <h2 className="text-2xl font-light mb-8">Video Walkthrough</h2>
          <div className="relative aspect-video bg-muted/50 rounded-xl overflow-hidden">
            {project.videoUrl ? (
              <iframe
                src={project.videoUrl}
                className="absolute inset-0 w-full h-full"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
                title={`${project.title} Video Walkthrough`}
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-background/20 to-background/5 flex items-center justify-center">
                <div className="text-center">
                  <div className="bg-background/90 rounded-full p-8 mb-4 inline-block">
                    <Play className="h-12 w-12 text-foreground ml-2" />
                  </div>
                  <p className="text-base text-muted-foreground">Product Demo • 60 seconds</p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Reflection */}
        <section id="reflection" className="py-12 border-b border-border/10">
          <h2 className="text-2xl font-light mb-8">Reflection & Learnings</h2>
          <div className="max-w-3xl">
            <p className="text-base text-muted-foreground leading-[1.8] font-light">
              {project.reflection}
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section id="links" className="py-16 text-center">
          <h2 className="text-2xl font-light mb-8">View the Project</h2>
          <div className="flex flex-wrap gap-4 justify-center">
            {project.links.live && (
                <a 
                href={project.links.live} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-foreground text-background px-8 py-4 rounded-full hover:bg-foreground/90 hover:scale-105 transition-all duration-300 text-base font-normal"
              >
                <ExternalLink className="h-5 w-5" />
                Live Project
              </a>
            )}
            {project.links.figma && (
                <a 
                href={project.links.figma} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-border px-8 py-4 rounded-full hover:bg-muted/50 hover:scale-105 transition-all duration-300 text-base font-normal"
              >
                <Figma className="h-5 w-5" />
                Figma
              </a>
            )}
            {project.links.github && (
                <a 
                href={project.links.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-border px-8 py-4 rounded-full hover:bg-muted/50 hover:scale-105 transition-all duration-300 text-base font-normal"
              >
                <Github className="h-5 w-5" />
                GitHub
              </a>
            )}
            {project.links.playstore && (
                <a 
                href={project.links.playstore} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-border px-8 py-4 rounded-full hover:bg-muted/50 hover:scale-105 transition-all duration-300 text-base font-normal"
              >
                <Smartphone className="h-5 w-5" />
                Download App
              </a>
            )}
          </div>
        </section>
        
        {/* Project Navigation Footer */}
        <ProjectNavigationFooter currentProjectId={project.id} />
        
          </section>
        </div>
      </main>
    </div>
  );
};

export default ProjectDetails;