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

      <main className="w-[98vw] mx-auto px-4 md:px-6 pt-16 lg:pt-0">
        {/* Main layout with ProjectNav + content */}
        <div className="flex gap-[4vw] lg:gap-[10%]">
          <ProjectNav />
          
          <section className="flex flex-col flex-1 min-w-0 py-[20vh]">
        {/* Hero Section */}
        <section id="overview" className="py-32">
            <div className="mb-24">
            {/* Project Tags */}
            <div className="flex flex-wrap gap-3 mb-12 animate-fade-in">
              <span className="px-4 py-2 text-xs rounded-full bg-muted/50 text-muted-foreground tracking-wider">
                {project.category.charAt(0).toUpperCase() + project.category.slice(1)} Design
              </span>
              <span className="px-4 py-2 text-xs rounded-full bg-muted/50 text-muted-foreground tracking-wider">
                {project.year}
              </span>
            </div>
            
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-extralight tracking-tight leading-[1.05] mb-12 animate-fade-in">
              {project.title}
            </h1>
            <p className="text-2xl md:text-3xl text-muted-foreground font-extralight leading-[1.6] mb-20 animate-fade-in max-w-4xl" style={{ animationDelay: '100ms' }}>
              {project.subtitle}
            </p>

            {/* Hero Image Section */}
            {project.mockupImages && project.mockupImages.length > 0 ? (
              <div 
                className="relative rounded-2xl overflow-hidden mb-20 animate-fade-in group cursor-pointer hover:shadow-2xl transition-all duration-500" 
                style={{ animationDelay: '200ms' }}
                onClick={() => openLightbox([mockupImageMap[project.mockupImages[0]] || project.mockupImages[0]], 0)}
              >
                <img 
                  src={mockupImageMap[project.mockupImages[0]] || project.mockupImages[0]} 
                  alt={`${project.title} interface mockup`}
                  className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-700"
                />
              </div>
            ) : (
              <div className="relative aspect-video bg-muted/30 rounded-2xl overflow-hidden group cursor-pointer mb-20 animate-fade-in" style={{ animationDelay: '200ms' }}>
                <div className="absolute inset-0 bg-gradient-to-br from-background/20 to-background/5 flex items-center justify-center">
                  <div className="bg-background/90 rounded-full p-8 group-hover:scale-110 transition-transform">
                    <Play className="h-12 w-12 text-foreground ml-1" />
                  </div>
                </div>
              </div>
            )}
            
            {/* Quick Stats Bar */}
            <div className="mb-20 animate-fade-in" style={{ animationDelay: '400ms' }}>
              <QuickStatsBar
                team={project.role.team}
                duration={project.role.duration}
                services={project.services}
                tools={project.role.tools}
              />
            </div>
            
            <div className="max-w-4xl">
              <p className="text-lg md:text-xl text-muted-foreground leading-[2] font-light">
                {project.description}
              </p>
              {project.id === "wedding-verse" && (
                <div className="mt-6 pt-6 border-t border-border/20">
                  <p className="text-sm text-muted-foreground">
                    🚀 <strong>Update:</strong> Mobile app launched on Play Store (2025).
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Challenge Highlight Callout */}
        <div className="py-32 animate-fade-in">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-3 mb-8 text-muted-foreground">
              <span className="text-xs uppercase tracking-[0.2em] font-light">Key Challenge</span>
            </div>
            <p className="text-3xl md:text-4xl lg:text-5xl font-extralight leading-[1.4] text-foreground">
              {project.context.problem.split('.')[0]}.
            </p>
          </div>
        </div>

        {/* Context Section */}
        <section id="context" className="py-32">
          <h2 className="text-4xl font-extralight mb-16 tracking-tight">Context & Challenge</h2>
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-16">
              <div>
                <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-[0.2em] mb-6">Problem</h3>
                <p className="text-lg leading-[2] font-light">
                  {project.context.problem}
                </p>
              </div>
              
              <div>
                <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-[0.2em] mb-6">Objective</h3>
                <p className="text-lg leading-[2] font-light">
                  {project.context.objective}
                </p>
              </div>
            </div>
            
            {project.mockupImages && project.mockupImages[1] ? (
              <div 
                className="rounded-2xl overflow-hidden cursor-pointer group hover:shadow-2xl transition-all duration-500 h-full"
                onClick={() => openLightbox([mockupImageMap[project.mockupImages[1]] || project.mockupImages[1]], 0)}
              >
                <img 
                  src={mockupImageMap[project.mockupImages[1]] || project.mockupImages[1]} 
                  alt={`${project.title} context mockup`}
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
                />
              </div>
            ) : (
              <div className="bg-muted/20 rounded-2xl h-96"></div>
            )}
          </div>
        </section>

        {/* Role & Impact */}
        <section id="role" className="py-32">
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-20 items-start">
            {/* Left Column - Role Info */}
            <div className="space-y-16">
              <div>
                <h2 className="text-4xl font-extralight mb-3 tracking-tight">Role & Impact</h2>
                <p className="text-muted-foreground text-lg font-light leading-relaxed">
                  Leading design strategy and execution
                </p>
              </div>

              {/* Role Card */}
              <div className="border border-border/30 rounded-2xl p-8 bg-muted/10 backdrop-blur-sm">
                <div className="flex items-start justify-between mb-8">
                  <h3 className="text-2xl font-light tracking-tight">
                    {project.role.title}
                  </h3>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-baseline gap-3 pb-4 border-b border-border/20">
                    <span className="text-xs text-muted-foreground uppercase tracking-[0.15em] font-medium min-w-[80px]">Duration</span>
                    <p className="font-light text-base">{project.role.duration}</p>
                  </div>
                  
                  <div className="flex items-baseline gap-3 pb-4 border-b border-border/20">
                    <span className="text-xs text-muted-foreground uppercase tracking-[0.15em] font-medium min-w-[80px]">Team</span>
                    <p className="font-light text-base">{project.role.team}</p>
                  </div>

                  {project.role.tools && project.role.tools.length > 0 && (
                    <div className="flex items-start gap-3 pt-2">
                      <span className="text-xs text-muted-foreground uppercase tracking-[0.15em] font-medium min-w-[80px]">Tools</span>
                      <div className="flex flex-wrap gap-2">
                        {project.role.tools.map((tool, idx) => (
                          <span 
                            key={idx}
                            className="px-3 py-1 text-xs rounded-full bg-muted/50 text-foreground/80 font-light"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Image/Visual */}
              {project.mockupImages && project.mockupImages[2] && (
                <div 
                  className="rounded-2xl overflow-hidden cursor-pointer group hover:shadow-2xl transition-all duration-500"
                  onClick={() => openLightbox([mockupImageMap[project.mockupImages[2]] || project.mockupImages[2]], 0)}
                >
                  <img 
                    src={mockupImageMap[project.mockupImages[2]] || project.mockupImages[2]} 
                    alt={`${project.title} role mockup`}
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
                  />
                </div>
              )}
            </div>

            {/* Right Column - Outcomes */}
            <div className="space-y-8 lg:mt-24">
              <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-[0.2em] mb-12">
                Key Outcomes
              </h3>
              
              <div className="space-y-4">
                {project.outcomes.map((outcome, index) => (
                  <div 
                    key={index} 
                    className="group relative overflow-hidden rounded-2xl border border-border/30 bg-gradient-to-br from-muted/5 to-muted/20 hover:from-muted/10 hover:to-muted/30 transition-all duration-500 animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="p-8">
                      <div className="flex flex-col gap-6">
                        <span className="text-sm font-light text-muted-foreground uppercase tracking-wider">
                          {outcome.metric}
                        </span>
                        <AnimatedCounter 
                          value={outcome.value}
                          className="text-5xl font-extralight text-foreground leading-none"
                        />
                      </div>
                    </div>
                    
                    {/* Subtle gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="py-32">
          <h2 className="text-4xl font-extralight mb-16 tracking-tight">Features & Complexity</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {project.features.map((feature, index) => (
              <div 
                key={index}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <ExpandableFeatureCard
                  title={feature.title}
                  description={feature.description}
                  icon=""
                  isComingSoon={feature.description.includes('Coming Soon')}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Process */}
        <section id="process" className="py-32">
          <h2 className="text-4xl font-extralight mb-16 tracking-tight">Process & Approach</h2>
          <div className="grid md:grid-cols-2 gap-12">
            {project.process.map((process, index) => (
              <div 
                key={index} 
                className="border-l border-border/30 pl-8 py-4 hover:border-foreground/50 transition-all duration-300 hover:pl-10"
              >
                <h3 className="text-lg font-light mb-4">{process.step}</h3>
                <p className="text-base text-muted-foreground leading-[2] font-light">
                  {process.description}
                </p>
              </div>
            ))}
          </div>
        </section>
        
        {/* Gallery Section - Moved Earlier */}
        <section id="gallery" className="py-32">
          <h2 className="text-4xl font-extralight mb-16 tracking-tight">UI Gallery</h2>
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
          <section id="design-system" className="py-32">
            <h2 className="text-4xl font-extralight mb-16 tracking-tight">Design System</h2>
            
            {project.designSystem.note && (
              <div className="bg-muted/20 rounded-xl p-8 mb-16">
                <p className="text-base text-muted-foreground leading-[2] font-light italic">
                  {project.designSystem.note}
                </p>
              </div>
            )}

            <div className="grid md:grid-cols-3 gap-8">
              {project.designSystem.images.map((imagePath, index) => (
                <div 
                  key={index} 
                  className="rounded-2xl overflow-hidden cursor-pointer group hover:shadow-2xl transition-all duration-500 animate-fade-in"
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
                    className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-700"
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Iterations & UX Decisions Section */}
        {project.iterations && (
          <section id="iterations" className="py-32">
            <h2 className="text-4xl font-extralight mb-16 tracking-tight">Iterations & UX Decisions</h2>
            {project.iterations.intro && (
              <p className="text-base text-muted-foreground leading-[2] font-light mb-12 max-w-4xl">
                {project.iterations.intro}
              </p>
            )}

            {project.iterations.note && (
              <div className="bg-muted/20 rounded-xl p-8 mb-16">
                <p className="text-base text-muted-foreground leading-[2] font-light italic">
                  {project.iterations.note}
                </p>
              </div>
            )}

            <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
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
                  <div className="rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500">
                    <img 
                      src={mockupImageMap[imagePath] || imagePath}
                      alt={`Design Iterations ${index + 1}`}
                      className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-700"
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}


        {/* Reflection */}
        <section id="reflection" className="py-32">
          <h2 className="text-4xl font-extralight mb-16 tracking-tight">Reflection & Learnings</h2>
          <div className="max-w-4xl">
            <p className="text-lg text-muted-foreground leading-[2] font-light">
              {project.reflection}
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section id="links" className="py-32 text-center">
          <h2 className="text-4xl font-extralight mb-16 tracking-tight">View the Project</h2>
          <div className="flex flex-wrap gap-6 justify-center">
            {project.links.live && (
                <a 
                href={project.links.live} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-foreground text-background px-10 py-5 rounded-full hover:bg-foreground/90 hover:scale-105 transition-all duration-300 text-base font-light"
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
                className="inline-flex items-center gap-3 border border-border/40 px-10 py-5 rounded-full hover:bg-muted/30 hover:scale-105 transition-all duration-300 text-base font-light"
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
                className="inline-flex items-center gap-3 border border-border/40 px-10 py-5 rounded-full hover:bg-muted/30 hover:scale-105 transition-all duration-300 text-base font-light"
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
                className="inline-flex items-center gap-3 border border-border/40 px-10 py-5 rounded-full hover:bg-muted/30 hover:scale-105 transition-all duration-300 text-base font-light"
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