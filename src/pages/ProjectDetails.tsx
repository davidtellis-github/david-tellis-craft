import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Play, ExternalLink, Github, Figma, Smartphone, Images, ChevronDown, ChevronUp } from "lucide-react";
import ProjectNav from "@/components/portfolio/ProjectNav";
import { projectsData } from "@/data/projectData";
import { useProjectAssets } from "@/hooks/useProjectAssets";
import { UIGallery } from "@/components/portfolio/UIGallery";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
// Import mockup images
import weddingverseFeatured from '@/assets/weddingverse-featured.png';
import ideabaazFeatured from '@/assets/ideabaaz-featured.png';
import futurcraftFeatured from '@/assets/futurcraft-featured.png';
import turbocloudFeatured from '@/assets/turbocloud-featured.png';

// Map of mockup images
const mockupImageMap: Record<string, string> = {
  'weddingverse-featured.png': weddingverseFeatured,
  'ideabaaz-featured.png': ideabaazFeatured,
  'futurcraft-featured.png': futurcraftFeatured,
  'turbocloud-featured.png': turbocloudFeatured,
};

const ProjectDetails: React.FC = () => {
  const { slug } = useParams();
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  // Get project data based on slug
  const project = slug ? projectsData[slug] : null;
  
  // Get project assets for gallery
  const { assets, explorations, isLoading } = useProjectAssets(slug || "");
  
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
    <div className="min-h-screen bg-background text-foreground">
     

      {/* Back Button */}
      <div className="fixed top-6 right-6 z-50">
        <Link 
          to="/portfolio" 
          className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-muted/80 backdrop-blur-sm hover:bg-muted transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
      </div>

      <main className="w-[98vw] mx-auto px-4 md:px-6">
        {/* Main layout with ProjectNav + content */}
        <div className="flex gap-8 lg:gap-12">
          <ProjectNav />
          
          <section className="flex flex-col flex-1 min-w-0 py-[20vh]">
        {/* Hero Section */}
        <section id="overview" className="py-20 pt-16">
            <div className="mb-16">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tight leading-[1.1] mb-6">
              {project.title}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed mb-12">
              {project.subtitle}
            </p>

            {/* Hero Image or Video Section */}
            {project.mockupImages && project.mockupImages.length > 0 ? (
              <div className="relative rounded-2xl overflow-hidden mb-16">
                <img 
                  src={mockupImageMap[project.mockupImages[0]] || project.mockupImages[0]} 
                  alt={`${project.title} interface mockup`}
                  className="w-full h-auto object-cover"
                />
              </div>
            ) : (
              <div className="relative aspect-video bg-muted/50 rounded-2xl overflow-hidden group cursor-pointer mb-16">
                <div className="absolute inset-0 bg-gradient-to-br from-background/20 to-background/5 flex items-center justify-center">
                  <div className="bg-background/90 rounded-full p-8 group-hover:scale-110 transition-transform">
                    <Play className="h-12 w-12 text-foreground ml-1" />
                  </div>
                </div>
              </div>
            )}
            
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

        {/* Gallery Section */}
        <section id="gallery" className="py-20">
          <Collapsible open={isGalleryOpen} onOpenChange={setIsGalleryOpen}>
            <CollapsibleTrigger className="w-full group">
              <div className="flex items-center justify-between py-6 hover:opacity-70 transition-opacity">
                  <div className="flex items-center gap-4">
                  <Images className="h-6 w-6" />
                  <h2 className="text-4xl md:text-5xl font-light">Gallery</h2>
                  <span className="text-xl md:text-2xl text-muted-foreground font-light">
                    ({allUIAssets.length})
                  </span>
                </div>
                {isGalleryOpen ? (
                  <ChevronUp className="h-6 w-6 transition-transform" />
                ) : (
                  <ChevronDown className="h-6 w-6 transition-transform" />
                )}
              </div>
            </CollapsibleTrigger>
            
            <CollapsibleContent className="mt-8">
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
            </CollapsibleContent>
          </Collapsible>
        </section>

        {/* Context Section */}
        <section id="context" className="py-20">
          <h2 className="text-4xl md:text-5xl font-light mb-16">Context & Challenge</h2>
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h3 className="text-sm font-medium mb-4 text-muted-foreground uppercase tracking-[0.15em]">Problem</h3>
              <p className="text-base md:text-lg leading-[1.8] font-light mb-8">
                {project.context.problem}
              </p>
              
              <h3 className="text-sm font-medium mb-4 text-muted-foreground uppercase tracking-[0.15em]">Objective</h3>
              <p className="text-base md:text-lg leading-[1.8] font-light">
                {project.context.objective}
              </p>
            </div>
            {project.mockupImages && project.mockupImages[1] ? (
              <div className="rounded-2xl overflow-hidden">
                <img 
                  src={mockupImageMap[project.mockupImages[1]] || project.mockupImages[1]} 
                  alt={`${project.title} context mockup`}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="bg-muted/30 rounded-2xl h-80"></div>
            )}
          </div>
        </section>

        {/* Role & Impact */}
        <section id="role" className="py-20">
          <h2 className="text-4xl md:text-5xl font-light mb-16">My Role & Impact</h2>
          <div className="grid md:grid-cols-2 gap-16">
...
            <div>
              <h3 className="text-sm font-medium mb-6 text-muted-foreground uppercase tracking-[0.15em]">Key Responsibilities</h3>
              <ul className="space-y-3 text-base md:text-lg font-light leading-relaxed mb-12">
                <li>Led end-to-end product design strategy</li>
                <li>Conducted user research and stakeholder interviews</li>
                <li>Designed multi-role interaction experiences</li>
                <li>Created and maintained design system</li>
                <li>Collaborated closely with engineering team</li>
              </ul>
              
              <h3 className="text-sm font-medium mb-6 text-muted-foreground uppercase tracking-[0.15em]">Outcomes</h3>
              <div className="space-y-4">
                {project.outcomes.map((outcome, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-border/20">
                    <span className="text-base md:text-lg font-light">{outcome.metric}</span>
                    <span className="text-base md:text-lg font-mono font-normal">{outcome.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="py-20">
          <h2 className="text-4xl md:text-5xl font-light mb-16">Features & Complexity</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {project.features.map((feature, index) => (
              <div key={index} className="border-l-2 border-border/20 pl-8 py-6">
                <h3 className="text-xl md:text-2xl font-normal mb-4">{feature.title}</h3>
                <p className="text-base md:text-lg text-muted-foreground leading-[1.8] font-light">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Process */}
        <section id="process" className="py-20">
          <h2 className="text-4xl md:text-5xl font-light mb-16">Process & Approach</h2>
          <div className="space-y-12">
            {project.process.map((phase, index) => (
              <div key={index} className="flex items-start gap-8">
                <div className="text-3xl md:text-4xl font-light text-muted-foreground">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-normal mb-2">{phase.step}</h3>
                  <p className="text-base md:text-lg text-muted-foreground font-light leading-[1.8]">{phase.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Video Walkthrough */}
        <section id="walkthrough" className="py-20">
          <h2 className="text-4xl md:text-5xl font-light mb-16">Video Walkthrough</h2>
          <div className="relative aspect-video bg-muted/50 rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-background/20 to-background/5 flex items-center justify-center">
              <div className="text-center">
                <div className="bg-background/90 rounded-full p-12 mb-6 inline-block">
                  <Play className="h-16 w-16 text-foreground ml-2" />
                </div>
                <p className="text-xl text-muted-foreground">Product Demo • 60 seconds</p>
              </div>
            </div>
          </div>
        </section>

        {/* Reflection */}
        <section id="reflection" className="py-20">
          <h2 className="text-4xl md:text-5xl font-light mb-16">Reflection & Learnings</h2>
          <div className="max-w-3xl">
            <p className="text-lg md:text-xl text-muted-foreground leading-[1.8] font-light">
              {project.reflection}
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section id="links" className="py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-light mb-8">View the Project</h2>
          <div className="flex flex-wrap gap-6 justify-center">
            {project.links.live && (
                <a 
                href={project.links.live} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-foreground text-background px-8 py-4 rounded-full hover:bg-foreground/90 transition-colors text-base font-normal"
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
                className="inline-flex items-center gap-2 border border-border px-8 py-4 rounded-full hover:bg-muted/50 transition-colors text-base font-normal"
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
                className="inline-flex items-center gap-2 border border-border px-8 py-4 rounded-full hover:bg-muted/50 transition-colors text-base font-normal"
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
                className="inline-flex items-center gap-2 border border-border px-8 py-4 rounded-full hover:bg-muted/50 transition-colors text-base font-normal"
              >
                <Smartphone className="h-5 w-5" />
                Download App
              </a>
            )}
          </div>
        </section>
          </section>
        </div>
      </main>
    </div>
  );
};

export default ProjectDetails;