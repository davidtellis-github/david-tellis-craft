import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Play, ExternalLink, Figma, Smartphone, CheckCircle2, AlertCircle } from "lucide-react";
import ProjectNav from "@/components/portfolio/ProjectNav";
import { projectsData } from "@/data/projectData";
import { useProjectAssets } from "@/hooks/useProjectAssets";
import { UIGallery } from "@/components/portfolio/UIGallery";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { MetricsHighlight } from "@/components/portfolio/MetricsHighlight";
// Import mockup images
import weddingverseFeatured from '@/assets/weddingverse-featured.png';
import ideabaazFeatured from '@/assets/ideabaaz-featured.png';
import ideabaazLaptopMockup from '@/assets/ideabaaz-laptop-mockup.png';
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
import bostonFinancial1 from '@/assets/boston-financial-1.png';
import bostonFinancial2 from '@/assets/boston-financial-2.png';
import turbocloudDashboard1 from '@/assets/turbocloud-dashboard-1.jpg';
import turbocloudProviderSelection from '@/assets/turbocloud-provider-selection.jpg';
import turbocloudSignup from '@/assets/turbocloud-signup.jpg';

// Map of mockup images
const mockupImageMap: Record<string, string> = {
  'weddingverse-featured.png': weddingverseFeatured,
  'ideabaaz-featured.png': ideabaazFeatured,
  'ideabaaz-laptop-mockup.png': ideabaazLaptopMockup,
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
  'boston-financial-1.png': bostonFinancial1,
  'boston-financial-2.png': bostonFinancial2,
  'turbocloud-dashboard-1.jpg': turbocloudDashboard1,
  'turbocloud-provider-selection.jpg': turbocloudProviderSelection,
  'turbocloud-signup.jpg': turbocloudSignup,
};

const ProjectDetails: React.FC = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  // Get project data based on slug
  const project = slug ? projectsData[slug] : null;
  
  // Get project assets for gallery
  const { assets, explorations, isLoading } = useProjectAssets(slug || "");
  
  // Scroll animations for sections
  const heroAnim = useScrollAnimation();
  const roleAnim = useScrollAnimation();
  const challengeAnim = useScrollAnimation();
  const featuresAnim = useScrollAnimation();
  const howIWorkedAnim = useScrollAnimation();
  const designEvolutionAnim = useScrollAnimation();
  const impactAnim = useScrollAnimation();
  const galleryAnim = useScrollAnimation();
  
  const allUIAssets = [
    // Add database assets (now includes both mockupImages and images from useProjectAssets hook)
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
        <button 
          onClick={() => navigate(-1)}
          className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-muted/80 backdrop-blur-sm hover:bg-muted transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
      </div>

      <main className="w-[98vw] mx-auto px-4 md:px-6">
        {/* Main layout with ProjectNav + content */}
        <div className="flex gap-8 lg:gap-12">
          <ProjectNav />
          
          <section className="flex flex-col flex-1 min-w-0 py-[20vh]">
        {/* Hero Section with embedded metrics */}
        <section 
          ref={heroAnim.ref}
          id="overview" 
          className={`min-h-screen flex flex-col justify-start py-[20vh] transition-all duration-1000 ${
            heroAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
            <div className="mb-20 space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tight leading-[1.1]">
                {project.title}
              </h1>
              <div className="h-px w-20 bg-primary/40" />
            </div>
            
            <p className="text-xl md:text-2xl text-foreground font-light leading-[1.5] max-w-4xl">
              {project.subtitle}
            </p>
            
            <p className="text-base md:text-lg text-muted-foreground font-light leading-[1.8] max-w-3xl pt-4">
              {project.description}
            </p>
          </div>

            {/* Hero Image or Video Section */}
            {project.videoUrl ? (
              <div className="relative aspect-video rounded-lg overflow-hidden mb-20">
                <iframe
                  src={`${project.videoUrl}&background=1`}
                  className="absolute inset-0 w-full h-full"
                  frameBorder="0"
                  allow="autoplay"
                  title={`${project.title} Video`}
                />
              </div>
            ) : project.mockupImages && project.mockupImages.length > 0 ? (
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-background/20 mb-20">
                <img 
                  src={mockupImageMap[project.mockupImages[0]] || project.mockupImages[0]} 
                  alt={`${project.title} interface mockup`}
                  className="w-full h-auto object-cover"
                />
              </div>
            ) : (
              <div className="relative aspect-video bg-muted/50 rounded-2xl overflow-hidden group cursor-pointer mb-20">
                <div className="absolute inset-0 bg-gradient-to-br from-background/20 to-background/5 flex items-center justify-center">
                  <div className="bg-background/90 rounded-full p-8 group-hover:scale-110 transition-transform">
                    <Play className="h-12 w-12 text-foreground ml-1" />
                  </div>
                </div>
              </div>
            )}

            {/* Embedded Metrics - Only for wedding-verse */}
            {project.id === "wedding-verse" && (
              <div className="mt-20">
                <h2 className="text-2xl font-light mb-4">Impact Metrics</h2>
                <p className="text-muted-foreground font-light mb-12 max-w-2xl">
                  Measurable improvements that demonstrate real value delivered to users and business.
                </p>
                <MetricsHighlight 
                  metrics={[
                    { label: "faster vendor discovery", value: "63%" },
                    { label: "higher vendor response rate", value: "42%" },
                    { label: "better Week 1 retention", value: "28%" }
                  ]}
                />
              </div>
            )}
        </section>

        {/* My Role - Enhanced for wedding-verse */}
        <section 
          ref={roleAnim.ref}
          id="role" 
          className={`min-h-[80vh] flex flex-col justify-start pt-[20vh] transition-all duration-1000 ${
            roleAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-light mb-20">My Role</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <div className="mb-8">
                <p className="text-lg font-normal mb-2">{project.role.title}</p>
                <p className="text-sm text-muted-foreground">{project.role.duration}</p>
              </div>
              
              {project.id === "wedding-verse" ? (
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-base font-light leading-relaxed">Defined product direction alongside CEO and engineering team</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-base font-light leading-relaxed">Designed dual-sided platform experience (couples + vendors) and internal ops tools</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-base font-light leading-relaxed">Built comprehensive design system from scratch to enable rapid iteration</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-base font-light leading-relaxed">Designed AI voice agent flows with natural language scripting and error handling</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-base font-light leading-relaxed">Led user research, journey mapping, prototyping, and validation through launch</span>
                  </li>
                </ul>
              ) : (
                <ul className="space-y-2 text-base font-light leading-relaxed">
                  <li>Led end-to-end product design strategy</li>
                  <li>Conducted user research and stakeholder interviews</li>
                  <li>Designed multi-role interaction experiences</li>
                  <li>Created and maintained design system</li>
                  <li>Collaborated closely with engineering team</li>
                </ul>
              )}
            </div>
            <div className="space-y-6">
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
        </section>

        {/* Challenge & Solution - Combined */}
        <section 
          ref={challengeAnim.ref}
          id="challenge" 
          className={`min-h-[80vh] flex flex-col justify-start pt-[20vh] transition-all duration-1000 ${
            challengeAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-light mb-20">Challenge & Solution</h2>
          
          <div className="grid md:grid-cols-2 gap-16">
            {/* Problem Column */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted/30 border border-border/20">
                <AlertCircle className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">The Problem</span>
              </div>
              <p className="text-base leading-[1.8] font-light text-muted-foreground">
                {project.context.problem}
              </p>
            </div>

            {/* Solution Column */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">The Solution</span>
              </div>
              <p className="text-base leading-[1.8] font-light mb-6">
                {project.context.objective}
              </p>
              {project.id === "wedding-verse" && (
                <div className="bg-primary/5 border border-primary/10 rounded-xl p-6">
                  <p className="text-sm font-medium text-primary mb-2">Core Innovation</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Transformed chaotic vendor search into a calm, personalized experience that respects emotional decision-making patterns.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Solution Image */}
          {project.mockupImages && project.mockupImages[1] && (
            <div className="rounded-2xl overflow-hidden shadow-xl shadow-background/20 mt-16">
              <img 
                src={mockupImageMap[project.mockupImages[1]] || project.mockupImages[1]} 
                alt={`${project.title} solution mockup`}
                className="w-full h-auto object-cover"
              />
            </div>
          )}
        </section>

        {/* Core Features Delivered */}
        <section 
          ref={featuresAnim.ref}
          id="features" 
          className={`min-h-screen flex flex-col justify-start py-[20vh] transition-all duration-1000 ${
            featuresAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="mb-20">
            <h2 className="text-3xl md:text-4xl font-light mb-6">Core Features Delivered</h2>
            <p className="text-base md:text-lg text-muted-foreground font-light leading-relaxed max-w-3xl">
              Key capabilities that solve user problems and deliver business value.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {project.features.map((feature, index) => (
              <div key={index} className="bg-muted/10 rounded-2xl p-8 border border-border/20 hover:border-border/40 transition-all group">
                <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                <h3 className="text-lg font-medium mb-3">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-[1.8] font-light">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* How I Worked - Process + Constraints Combined */}
        <section 
          ref={howIWorkedAnim.ref}
          id="how-i-worked" 
          className={`min-h-screen flex flex-col justify-start py-[20vh] transition-all duration-1000 ${
            howIWorkedAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-3xl md:text-5xl font-light mb-20">How I Worked</h2>
          
          {/* Process */}
          <div className="mb-24">
            <div className="mb-12">
              <h3 className="text-2xl md:text-3xl font-light mb-4">Design Process</h3>
              <p className="text-base md:text-lg text-muted-foreground font-light leading-relaxed max-w-3xl">
                A structured approach from research to launch, with continuous iteration and validation.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {project.process.map((phase, index) => (
                <div key={index} className="relative">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium text-primary">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <div>
                      <h4 className="text-base font-medium mb-2">{phase.step}</h4>
                      <p className="text-sm text-muted-foreground font-light leading-[1.7]">{phase.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Constraints - wedding-verse only */}
          {project.id === "wedding-verse" && (
            <div>
              <div className="mb-12">
                <h3 className="text-2xl md:text-3xl font-light mb-4">Constraints & Challenges</h3>
                <p className="text-base md:text-lg text-muted-foreground font-light leading-relaxed max-w-3xl">
                  Real-world limitations that shaped design decisions and demonstrated problem-solving maturity.
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4 p-6 bg-muted/10 rounded-xl border border-border/20">
                  <AlertCircle className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-base font-medium mb-1">Resource Limits</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">Small engineering team required strict scope discipline and phased delivery.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-6 bg-muted/10 rounded-xl border border-border/20">
                  <AlertCircle className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-base font-medium mb-1">Dual-Persona Complexity</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">Designing for emotionally-driven couples vs. business-focused vendors simultaneously.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-6 bg-muted/10 rounded-xl border border-border/20">
                  <AlertCircle className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-base font-medium mb-1">AI Reliability</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">Voice agent needed protective UX layers to handle edge cases gracefully.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-6 bg-muted/10 rounded-xl border border-border/20">
                  <AlertCircle className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-base font-medium mb-1">Data Inconsistency</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">Vendor inputs varied wildly; required intelligent validation and normalization.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-6 bg-muted/10 rounded-xl border border-border/20">
                  <AlertCircle className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-base font-medium mb-1">Aggressive Timeline</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">2 months for UI design, 5 months for MVP engineering, 3 months for expansion.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>


        {/* Design Evolution - Iterations + Walkthrough Combined */}
        {(project.iterations || project.videoUrl) && (
          <section 
            ref={designEvolutionAnim.ref}
            id="design-evolution" 
            className={`min-h-screen flex flex-col justify-start py-[20vh] transition-all duration-1000 ${
              designEvolutionAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="text-3xl md:text-5xl font-light mb-20">Design Evolution</h2>
            
            {/* Iterations */}
            {project.iterations && (
              <div className="mb-24">
                <div className="mb-12">
                  <h3 className="text-2xl md:text-3xl font-light mb-4">Iterations & UX Decisions</h3>
                  {project.iterations.intro && (
                    <p className="text-base md:text-lg text-muted-foreground leading-relaxed font-light">
                      {project.iterations.intro}
                    </p>
                  )}
                </div>

                {project.iterations.note && (
                  <div className="bg-muted/30 rounded-lg p-4 mb-8">
                    <p className="text-sm text-muted-foreground leading-[1.8] font-light italic">
                      {project.iterations.note}
                    </p>
                  </div>
                )}

                <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
                  {project.iterations.images.map((imagePath, index) => (
                    <div key={index} className="break-inside-avoid cursor-pointer group">
                      <div className="rounded-xl overflow-hidden bg-muted/20">
                        <img 
                          src={mockupImageMap[imagePath] || imagePath}
                          alt={`Design Iterations ${index + 1}`}
                          className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Video Walkthrough */}
            {project.videoUrl && (
              <div>
                <h3 className="text-2xl md:text-3xl font-light mb-12">Video Walkthrough</h3>
                <div className="relative aspect-video bg-muted/50 rounded-xl overflow-hidden shadow-2xl shadow-background/20">
                  <iframe
                    src={project.videoUrl}
                    className="absolute inset-0 w-full h-full"
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
                    title={`${project.title} Video Walkthrough`}
                  />
                </div>
              </div>
            )}
          </section>
        )}

        {/* Impact - Outcomes + Learnings Combined */}
        <section 
          ref={impactAnim.ref}
          id="impact" 
          className={`min-h-screen flex flex-col justify-start py-[20vh] transition-all duration-1000 ${
            impactAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-3xl md:text-5xl font-light mb-20">Impact</h2>
          
          {/* Outcomes */}
          <div className="mb-24">
            <div className="mb-12">
              <h3 className="text-2xl md:text-3xl font-light mb-4">Outcomes & Business Value</h3>
              <p className="text-base md:text-lg text-muted-foreground font-light leading-relaxed max-w-3xl">
                Measurable results that demonstrate the product's success and strategic impact.
              </p>
            </div>
            
            {project.id === "wedding-verse" ? (
              <div className="space-y-8">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-6 border border-primary/20">
                    <h4 className="text-sm font-medium text-primary mb-2">Faster Time-to-Match</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">Couples find relevant vendors 63% faster, reducing drop-off</p>
                  </div>
                  <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-6 border border-primary/20">
                    <h4 className="text-sm font-medium text-primary mb-2">Improved Engagement</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">Vendor response rates increased 42%, creating healthier marketplace dynamics</p>
                  </div>
                  <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-6 border border-primary/20">
                    <h4 className="text-sm font-medium text-primary mb-2">Retention Lift</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">28% more couples returned in Week 1, indicating stronger early value perception</p>
                  </div>
                  <div className="bg-muted/20 rounded-xl p-6 border border-border/20">
                    <h4 className="text-sm font-medium mb-2">Operational Efficiency</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">AI onboarding freed team from manual vendor setup, scaling to 100+ vendors/month</p>
                  </div>
                  <div className="bg-muted/20 rounded-xl p-6 border border-border/20">
                    <h4 className="text-sm font-medium mb-2">Foundation for Growth</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">Design system accelerated Phase 2 feature development by 3x</p>
                  </div>
                  <div className="bg-muted/20 rounded-xl p-6 border border-border/20">
                    <h4 className="text-sm font-medium mb-2">Platform Trust</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">Structured profiles and guided flows reduced uncertainty, increasing booking intent</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {project.outcomes.map((outcome, index) => (
                  <div key={index} className="flex justify-between items-center py-4 border-b border-border/20">
                    <span className="text-base font-light">{outcome.metric}</span>
                    <span className="text-base font-mono font-normal">{outcome.value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Learnings */}
          <div>
            <div className="mb-12">
              <h3 className="text-2xl md:text-3xl font-light mb-4">Key Learnings</h3>
              <p className="text-base md:text-lg text-muted-foreground font-light leading-relaxed max-w-3xl">
                Strategic insights gained from designing and shipping this product.
              </p>
            </div>
            <div className="max-w-4xl">
              {project.id === "wedding-verse" ? (
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-2 h-2 rounded-full bg-primary mt-2" />
                    <div>
                      <h4 className="text-base font-medium mb-1">Emotion-first design wins</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">Wedding planning requires UX that acknowledges anxiety, not just efficiency</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-2 h-2 rounded-full bg-primary mt-2" />
                    <div>
                      <h4 className="text-base font-medium mb-1">Scope discipline scales impact</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">Saying "no" to 20 features enabled shipping 5 features that actually mattered</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-2 h-2 rounded-full bg-primary mt-2" />
                    <div>
                      <h4 className="text-base font-medium mb-1">Multi-persona success requires unified mental models</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">Both users succeeded when platform logic felt consistent</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-2 h-2 rounded-full bg-primary mt-2" />
                    <div>
                      <h4 className="text-base font-medium mb-1">AI needs guardrails</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">Conversational interfaces require both personality and strict boundary conditions</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-2 h-2 rounded-full bg-primary mt-2" />
                    <div>
                      <h4 className="text-base font-medium mb-1">Systems thinking creates velocity</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">Design systems aren't documentation—they're strategic accelerators</p>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-base text-muted-foreground leading-[1.8] font-light">
                  {project.reflection}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Gallery & Links - Combined */}
        <section 
          ref={galleryAnim.ref}
          id="gallery" 
          className={`min-h-screen flex flex-col justify-start py-[20vh] transition-all duration-1000 ${
            galleryAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Gallery */}
          <div className="mb-24">
            <h2 className="text-3xl md:text-5xl font-light mb-20">UI Gallery</h2>
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
          </div>

          {/* Links */}
          <div className="text-center border-t border-border/10 pt-24">
            <h3 className="text-2xl md:text-3xl font-light mb-12">View the Project</h3>
            <div className="flex flex-wrap gap-4 justify-center">
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
          </div>
        </section>
          </section>
        </div>
      </main>
    </div>
  );
};

export default ProjectDetails;