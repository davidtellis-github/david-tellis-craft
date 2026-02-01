import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Play, ExternalLink, Figma, Smartphone, CheckCircle2, AlertCircle, Expand } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import ProjectNav from "@/components/portfolio/ProjectNav";
import { projectsData } from "@/data/projectData";
import { useProjectAssets } from "@/hooks/useProjectAssets";
import { UIGallery } from "@/components/portfolio/UIGallery";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { MetricsHighlight } from "@/components/portfolio/MetricsHighlight";
import { IdeabaazCaseStudy } from "@/components/portfolio/IdeabaazCaseStudy";
// Import mockup images
import weddingverseFeatured from "@/assets/weddingverse-featured.png";
import ideabaazFeatured from "@/assets/ideabaaz-featured.png";
import ideabaazLaptopMockup from "@/assets/ideabaaz-laptop-mockup.png";
import futurcraftFeatured from "@/assets/futurcraft-featured.png";
import turbocloudFeatured from "@/assets/turbocloud-featured.png";
import designSystem1 from "@/assets/wedding-verse-design-system-1.png";
import designSystem2 from "@/assets/wedding-verse-design-system-2.png";
import designSystem3 from "@/assets/wedding-verse-design-system-3.png";
import iterations1 from "@/assets/wedding-verse-iterations-1.png";
import iterations2 from "@/assets/wedding-verse-iterations-2.png";
import iterations3 from "@/assets/wedding-verse-iterations-3.png";
import weddingverseContext from "@/assets/wedding-verse-context.jpg";
import weddingverseRole from "@/assets/wedding-verse-role.jpg";
import bostonFinancial1 from "@/assets/boston-financial-1.png";
import bostonFinancial2 from "@/assets/boston-financial-2.png";
import turbocloudDashboard1 from "@/assets/turbocloud-dashboard-1.jpg";
import turbocloudProviderSelection from "@/assets/turbocloud-provider-selection.jpg";
import turbocloudSignup from "@/assets/turbocloud-signup.jpg";
// Ideabaaz UI screens
import ideabaazDashboard from "@/assets/ideabaaz-dashboard.png";
import ideabaazDocuments from "@/assets/ideabaaz-documents.png";
import ideabaazMentorProfile from "@/assets/ideabaaz-mentor-profile.png";
import ideabaazStartupTeam from "@/assets/ideabaaz-startup-team.png";
import ideabaazStartupPitch from "@/assets/ideabaaz-startup-pitch.png";
// Wedding Verse UI screens
import weddingVerseHome from "@/assets/wedding-verse-home.png";
import weddingVerseWelcome from "@/assets/wedding-verse-welcome.png";
import weddingVerseDatePicker from "@/assets/wedding-verse-date-picker.png";
import weddingVerseDashboard from "@/assets/wedding-verse-dashboard.png";
import weddingVerseVisionBoard from "@/assets/wedding-verse-vision-board.png";
import weddingVerseTheme from "@/assets/wedding-verse-theme.png";
import weddingVerseGallery from "@/assets/wedding-verse-gallery.png";
import weddingVerseBudget from "@/assets/wedding-verse-budget.png";
import weddingVerseTrending from "@/assets/wedding-verse-trending.png";
// Futurcraft AI UI screens
import futurcraftUrlInput from "@/assets/futurcraft-url-input.png";
import futurcraftBrandforge from "@/assets/futurcraft-brandforge.png";
import futurcraftContentCompare from "@/assets/futurcraft-content-compare.png";
import futurcraftDashboardDark from "@/assets/futurcraft-dashboard-dark.png";
import futurcraftBlogs from "@/assets/futurcraft-blogs.png";
import futurcraftBlogList from "@/assets/futurcraft-blog-list.png";
import futurcraftBlogEditor from "@/assets/futurcraft-blog-editor.png";
import futurcraftAi from "@/assets/futurcraft-ai.png";

// Ideabaaz solution showcase data
const ideabaazShowcaseScreens = [
  {
    id: "founders-dashboard",
    title: "Startup Dashboard",
    description: "Personalized dashboard showing tasks, milestones, and funding readiness score for founders.",
    image: ideabaazDashboard,
    persona: "Founders",
    personaColor: "from-blue-500/20 to-blue-600/10",
  },
  {
    id: "founders-documents",
    title: "Document Management",
    description: "Structured document upload flow for pitch decks, financials, and legal documents.",
    image: ideabaazDocuments,
    persona: "Founders",
    personaColor: "from-blue-500/20 to-blue-600/10",
  },
  {
    id: "founders-team",
    title: "Team & Vision Profile",
    description: "Comprehensive startup profile showcasing team, vision, and company details.",
    image: ideabaazStartupTeam,
    persona: "Founders",
    personaColor: "from-blue-500/20 to-blue-600/10",
  },
  {
    id: "founders-pitch",
    title: "Pitch Details",
    description: "Detailed pitch information including funding requirements, traction, and market opportunity.",
    image: ideabaazStartupPitch,
    persona: "Founders",
    personaColor: "from-blue-500/20 to-blue-600/10",
  },
  {
    id: "mentors-profile",
    title: "Mentor Profile",
    description: "Searchable mentor profiles with expertise areas, booking workflows, and session availability.",
    image: ideabaazMentorProfile,
    persona: "Mentors",
    personaColor: "from-purple-500/20 to-purple-600/10",
  },
];

// Map of mockup images
const mockupImageMap: Record<string, string> = {
  "weddingverse-featured.png": weddingverseFeatured,
  "ideabaaz-featured.png": ideabaazFeatured,
  "ideabaaz-laptop-mockup.png": ideabaazLaptopMockup,
  "futurcraft-featured.png": futurcraftFeatured,
  "turbocloud-featured.png": turbocloudFeatured,
  "wedding-verse-design-system-1.png": designSystem1,
  "wedding-verse-design-system-2.png": designSystem2,
  "wedding-verse-design-system-3.png": designSystem3,
  "wedding-verse-iterations-1.png": iterations1,
  "wedding-verse-iterations-2.png": iterations2,
  "wedding-verse-iterations-3.png": iterations3,
  "wedding-verse-context.jpg": weddingverseContext,
  "wedding-verse-role.jpg": weddingverseRole,
  "boston-financial-1.png": bostonFinancial1,
  "boston-financial-2.png": bostonFinancial2,
  "turbocloud-dashboard-1.jpg": turbocloudDashboard1,
  "turbocloud-provider-selection.jpg": turbocloudProviderSelection,
  "turbocloud-signup.jpg": turbocloudSignup,
  "ideabaaz-dashboard.png": ideabaazDashboard,
  "ideabaaz-documents.png": ideabaazDocuments,
  "ideabaaz-mentor-profile.png": ideabaazMentorProfile,
  "ideabaaz-startup-team.png": ideabaazStartupTeam,
  "ideabaaz-startup-pitch.png": ideabaazStartupPitch,
  "wedding-verse-home.png": weddingVerseHome,
  "wedding-verse-welcome.png": weddingVerseWelcome,
  "wedding-verse-date-picker.png": weddingVerseDatePicker,
  "wedding-verse-dashboard.png": weddingVerseDashboard,
  "wedding-verse-vision-board.png": weddingVerseVisionBoard,
  "wedding-verse-theme.png": weddingVerseTheme,
  "wedding-verse-gallery.png": weddingVerseGallery,
  "wedding-verse-budget.png": weddingVerseBudget,
  "wedding-verse-trending.png": weddingVerseTrending,
  // Futurcraft AI
  "futurcraft-url-input.png": futurcraftUrlInput,
  "futurcraft-brandforge.png": futurcraftBrandforge,
  "futurcraft-content-compare.png": futurcraftContentCompare,
  "futurcraft-dashboard-dark.png": futurcraftDashboardDark,
  "futurcraft-blogs.png": futurcraftBlogs,
  "futurcraft-blog-list.png": futurcraftBlogList,
  "futurcraft-blog-editor.png": futurcraftBlogEditor,
  "futurcraft-ai.png": futurcraftAi,
};

// Futurcraft AI separated light/dark mode images
const futurcraftLightModeImages = [
  { src: futurcraftUrlInput, alt: "URL Input - Light Mode" },
  { src: futurcraftBrandforge, alt: "Brandforge - Light Mode" },
  { src: futurcraftContentCompare, alt: "Content Compare - Light Mode" },
  { src: futurcraftBlogs, alt: "Blogs Overview - Light Mode" },
  { src: futurcraftBlogList, alt: "Blog List - Light Mode" },
  { src: futurcraftBlogEditor, alt: "Blog Editor - Light Mode" },
];

const futurcraftDarkModeImages = [
  { src: futurcraftDashboardDark, alt: "Dashboard - Dark Mode" },
  { src: futurcraftAi, alt: "AI Interface - Dark Mode" },
];
const ProjectDetails: React.FC = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [prototypeOpen, setPrototypeOpen] = useState(false);
  const [selectedUIImage, setSelectedUIImage] = useState<string | null>(null);

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
    ...assets.map((asset) => ({
      id: asset.id,
      title: asset.alt_text || `${project?.title || "Project"} UI`,
      description: asset.caption,
      image_url: asset.file_path,
      tags: asset.asset_tags,
      contribution_level: "full",
      is_featured: asset.is_featured,
    })),
    // Add UI explorations
    ...explorations.map((exploration) => ({
      id: exploration.id,
      title: exploration.title,
      description: exploration.description,
      image_url: exploration.image_url,
      tags: exploration.tags,
      contribution_level: exploration.contribution_level,
      is_featured: exploration.is_featured,
    })),
  ];

  // SEO setup
  useEffect(() => {
    if (project) {
      document.title = `${project.title} - Project Case Study`;
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", "description");
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", project.description);
    }
  }, [project]);

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
        <div className="flex gap-[4vw] lg:gap-[15%]">
          <ProjectNav />

          <section className="flex-col flex-1 min-w-0 py-[20vh] mx-0 flex items-start justify-start gap-0">
            {/* Hero Section with embedded metrics */}
            <section ref={heroAnim.ref} id="overview" className="">
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

              {/* Full-width UI Gallery for Wedding Verse */}
              {project.id === "wedding-verse" && project.images && project.images.length > 0 && (
                <div className="mt-20 space-y-8">
                  <h2 className="text-2xl font-light mb-8">UI Screens</h2>
                  <div className="space-y-8">
                    {project.images.slice(0, -1).map((imagePath, index) => {
                      const imageUrl = mockupImageMap[imagePath] || imagePath;
                      return (
                        <div 
                          key={index} 
                          onClick={() => setSelectedUIImage(imageUrl)}
                          className="group relative w-full rounded-2xl overflow-hidden cursor-pointer
                                     bg-muted/30 border border-border/40 p-3 md:p-4
                                     shadow-lg shadow-background/10
                                     transition-all duration-300 
                                     hover:border-border/80 hover:shadow-2xl hover:shadow-background/20"
                        >
                          <div className="relative overflow-hidden rounded-xl">
                            <img
                              src={imageUrl}
                              alt={`${project.title} - Screen ${index + 1}`}
                              className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                              loading="lazy"
                            />
                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                              <div className="bg-background/80 backdrop-blur-sm rounded-full p-3 border border-border/50">
                                <Expand className="h-6 w-6 text-foreground" />
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Lightbox Dialog */}
                  <Dialog open={!!selectedUIImage} onOpenChange={() => setSelectedUIImage(null)}>
                    <DialogContent className="w-[95vw] h-[90vh] max-w-none p-0 bg-background/95 backdrop-blur-md border-border/50">
                      <div className="p-4 sm:p-6 h-full flex items-center justify-center">
                        <img
                          src={selectedUIImage || ''}
                          alt="UI Design Detail"
                          className="max-w-full max-h-full object-contain rounded-lg"
                        />
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              )}

              {/* Full-width UI Gallery for Futurcraft AI - Separated Light/Dark Mode */}
              {project.id === "futurcraft-ai" && (
                <div className="mt-20 space-y-16">
                  {/* Light Mode Section */}
                  <div className="space-y-8">
                    <div className="flex items-center gap-4">
                      <div className="w-4 h-4 rounded-full bg-muted-foreground/20 border border-border" />
                      <h2 className="text-2xl font-light">Light Mode UI</h2>
                    </div>
                    <div className="space-y-8">
                      {futurcraftLightModeImages.map((image, index) => (
                        <div 
                          key={`light-${index}`}
                          onClick={() => setSelectedUIImage(image.src)}
                          className="group relative w-full rounded-2xl overflow-hidden cursor-pointer
                                     bg-muted/30 border border-border/40 p-3 md:p-4
                                     shadow-lg shadow-background/10
                                     transition-all duration-300 
                                     hover:border-border/80 hover:shadow-2xl hover:shadow-background/20"
                        >
                          <div className="relative overflow-hidden rounded-xl">
                            <img
                              src={image.src}
                              alt={image.alt}
                              className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                              loading="lazy"
                            />
                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-foreground/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                              <div className="bg-background/80 backdrop-blur-sm rounded-full p-3 border border-border/50">
                                <Expand className="h-6 w-6 text-foreground" />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Dark Mode Section */}
                  <div className="space-y-8">
                    <div className="flex items-center gap-4">
                      <div className="w-4 h-4 rounded-full bg-foreground border border-border" />
                      <h2 className="text-2xl font-light">Dark Mode UI</h2>
                    </div>
                    <div className="space-y-8">
                      {futurcraftDarkModeImages.map((image, index) => (
                        <div 
                          key={`dark-${index}`}
                          onClick={() => setSelectedUIImage(image.src)}
                          className="group relative w-full rounded-2xl overflow-hidden cursor-pointer
                                     bg-muted/30 border border-border/40 p-3 md:p-4
                                     shadow-lg shadow-background/10
                                     transition-all duration-300 
                                     hover:border-border/80 hover:shadow-2xl hover:shadow-background/20"
                        >
                          <div className="relative overflow-hidden rounded-xl">
                            <img
                              src={image.src}
                              alt={image.alt}
                              className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                              loading="lazy"
                            />
                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-foreground/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                              <div className="bg-background/80 backdrop-blur-sm rounded-full p-3 border border-border/50">
                                <Expand className="h-6 w-6 text-foreground" />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Lightbox Dialog */}
                  <Dialog open={!!selectedUIImage} onOpenChange={() => setSelectedUIImage(null)}>
                    <DialogContent className="w-[95vw] h-[90vh] max-w-none p-0 bg-background/95 backdrop-blur-md border-border/50">
                      <div className="p-4 sm:p-6 h-full flex items-center justify-center">
                        <img
                          src={selectedUIImage || ''}
                          alt="UI Design Detail"
                          className="max-w-full max-h-full object-contain rounded-lg"
                        />
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              )}

              {(project.id === "wedding-verse" || project.id === "ideabaaz") && (
                <div className="mt-20">
                  <h2 className="text-2xl font-light mb-4">Impact Metrics</h2>
                  <p className="text-muted-foreground font-light mb-12 max-w-2xl">
                    Measurable improvements that demonstrate real value delivered to users and business.
                  </p>
                  <MetricsHighlight
                    metrics={
                      project.id === "wedding-verse"
                        ? [
                            {
                              label: "faster vendor discovery",
                              value: "63%",
                            },
                            {
                              label: "higher vendor response rate",
                              value: "42%",
                            },
                            {
                              label: "better Week 1 retention",
                              value: "28%",
                            },
                          ]
                        : [
                            {
                              label: "faster vendor & service discovery",
                              value: "60%",
                            },
                            {
                              label: "higher vendor response rate",
                              value: "45%",
                            },
                            {
                              label: "improvement in founder retention",
                              value: "30%",
                            },
                          ]
                    }
                  />
                </div>
              )}

              {/* Gallery & Links - Second Fold for All Projects */}
              <section
                ref={galleryAnim.ref}
                id="gallery"
                className={`min-h-screen flex flex-col justify-start py-[20vh] transition-all duration-1000 ${galleryAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              >
                {/* Gallery */}
                <div className="mb-24">
                  <h2 className="text-3xl md:text-5xl font-light mb-20">UI Gallery</h2>
                  {!isLoading && allUIAssets.length > 0 && (
                    <UIGallery assets={allUIAssets} projectTitle={project.title} />
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

            {/* Ideabaaz uses a custom narrative case study */}
            {project.id === "ideabaaz" && project.caseStudy ? (
              <IdeabaazCaseStudy project={project} />
            ) : (
              <>
                {/* My Role - Enhanced for wedding-verse */}
                <section
                  ref={roleAnim.ref}
                  id="role"
                  className={`min-h-[80vh] flex flex-col justify-start pt-[20vh] transition-all duration-1000 ${roleAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                >
                  <h2 className="text-3xl md:text-4xl font-light mb-20">My Role</h2>
                  <div className="grid md:grid-cols-2 gap-12">
                    <div>
                      <div className="mb-8">
                        <p className="text-lg font-normal mb-2">Contributions</p>
                        <p className="text-sm text-muted-foreground">{project.role.duration}</p>
                      </div>

                      {project.id === "wedding-verse" ? (
                        <ul className="space-y-3">
                          <li className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                            <span className="text-base font-light leading-relaxed">
                              Defined product direction alongside CEO and engineering team
                            </span>
                          </li>
                          <li className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                            <span className="text-base font-light leading-relaxed">
                              Designed dual-sided platform experience (couples + vendors) and internal ops tools
                            </span>
                          </li>
                          <li className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                            <span className="text-base font-light leading-relaxed">
                              Built comprehensive design system from scratch to enable rapid iteration
                            </span>
                          </li>
                          <li className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                            <span className="text-base font-light leading-relaxed">
                              Designed AI voice agent flows with natural language scripting and error handling
                            </span>
                          </li>
                          <li className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                            <span className="text-base font-light leading-relaxed">
                              Led user research, journey mapping, prototyping, and validation through launch
                            </span>
                          </li>
                        </ul>
                      ) : project.id === "ideabaaz" ? (
                        <ul className="space-y-3">
                          <li className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                            <span className="text-base font-light leading-relaxed">
                              Led multi-persona platform strategy for 4 distinct user types (founders, investors,
                              mentors, providers)
                            </span>
                          </li>
                          <li className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                            <span className="text-base font-light leading-relaxed">
                              Designed ecosystem architecture: profiles → discovery → engagement → trust
                            </span>
                          </li>
                          <li className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                            <span className="text-base font-light leading-relaxed">
                              Created structured startup profiling system for AI-enabled matching
                            </span>
                          </li>
                          <li className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                            <span className="text-base font-light leading-relaxed">
                              Navigated constraints: limited engineering bandwidth, competing stakeholder goals
                            </span>
                          </li>
                          <li className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                            <span className="text-base font-light leading-relaxed">
                              Aligned digital platform with TV show branding and audience expectations
                            </span>
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
                        <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground mb-2 font-medium">
                          Team
                        </p>
                        <p className="text-base font-light">{project.role.team}</p>
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground mb-2 font-medium">
                          Tools
                        </p>
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
                <section ref={challengeAnim.ref} id="challenge" className="">
                  <h2 className="text-3xl md:text-4xl font-light mb-20">Challenge & Solution</h2>

                  <div className="grid md:grid-cols-2 gap-16">
                    {/* Problem Column */}
                    <div className="space-y-6">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted/30 border border-border/20">
                        <span className="w-2 h-2 rounded-full bg-red-500" />
                        <span className="text-sm font-medium text-muted-foreground">The Problem</span>
                      </div>
                      <p className="text-base leading-[1.8] font-light text-primary">{project.context.problem}</p>
                    </div>

                    {/* Solution Column */}
                    <div className="space-y-6">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted/30 border border-border/20">
                        <span className="w-2 h-2 rounded-full bg-green-500" />
                        <span className="text-sm font-medium text-muted-foreground">The Solution</span>
                      </div>
                      <p className="text-base leading-[1.8] font-light mb-6">{project.context.objective}</p>
                      {project.id === "wedding-verse" && (
                        <div className="bg-primary/5 border border-primary/10 rounded-xl p-6">
                          <p className="text-sm font-medium text-primary mb-2">Core Innovation</p>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            Transformed chaotic vendor search into a calm, personalized experience that respects
                            emotional decision-making patterns.
                          </p>
                        </div>
                      )}
                      {project.id === "ideabaaz" && (
                        <div className="bg-primary/5 border border-primary/10 rounded-xl p-6">
                          <p className="text-sm font-medium text-primary mb-2">Core Innovation</p>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            Transformed fragmented ecosystem into a structured, trust-designed platform connecting TV
                            show audience to actionable startup support.
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
                  className={`min-h-screen flex flex-col justify-start py-[20vh] transition-all duration-1000 ${featuresAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                >
                  <div className="mb-20">
                    <h2 className="text-3xl md:text-4xl font-light mb-6">Core Features Delivered</h2>
                    <p className="text-base md:text-lg text-muted-foreground font-light leading-relaxed max-w-3xl">
                      Key capabilities that solve user problems and deliver business value.
                    </p>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {project.features.map((feature, index) => (
                      <div
                        key={index}
                        className="bg-muted/10 rounded-2xl p-8 border border-border/20 hover:border-border/40 transition-all group"
                      >
                        <h3 className="text-lg font-medium mb-3">{feature.title}</h3>
                        <p className="text-sm text-muted-foreground leading-[1.8] font-light">{feature.description}</p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Ideabaaz Final Solution Showcase */}
                {project.id === "ideabaaz" && (
                  <section className="min-h-screen flex flex-col justify-start py-[20vh]">
                    <div className="mb-20">
                      <h2 className="text-3xl md:text-5xl font-light mb-6">The Platform Solution</h2>
                      <p className="text-base md:text-lg text-muted-foreground font-light leading-relaxed max-w-3xl">
                        A unified ecosystem connecting founders, investors, mentors, and solution providers—designed for
                        trust, clarity, and actionable next steps.
                      </p>
                    </div>

                    {/* Persona Pills */}
                    <div className="flex flex-wrap gap-3 mb-12">
                      <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20">
                        <span className="w-2 h-2 rounded-full bg-blue-500" />
                        <span className="text-sm font-medium text-blue-400">Founders</span>
                      </span>
                      <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20">
                        <span className="w-2 h-2 rounded-full bg-purple-500" />
                        <span className="text-sm font-medium text-purple-400">Mentors</span>
                      </span>
                      <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20">
                        <span className="w-2 h-2 rounded-full bg-green-500" />
                        <span className="text-sm font-medium text-green-400">Investors</span>
                      </span>
                      <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20">
                        <span className="w-2 h-2 rounded-full bg-amber-500" />
                        <span className="text-sm font-medium text-amber-400">Solution Providers</span>
                      </span>
                    </div>

                    {/* Solution Screens Grid */}
                    <div className="grid md:grid-cols-2 gap-8">
                      {ideabaazShowcaseScreens.map((screen) => (
                        <div
                          key={screen.id}
                          className={`group relative bg-gradient-to-br ${screen.personaColor} rounded-2xl overflow-hidden border border-border/20 hover:border-border/40 transition-all duration-300`}
                        >
                          {/* Persona Badge */}
                          <div className="absolute top-4 left-4 z-10">
                            <span
                              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full backdrop-blur-sm text-xs font-medium ${screen.persona === "Founders" ? "bg-blue-500/20 text-blue-300 border border-blue-500/30" : screen.persona === "Mentors" ? "bg-purple-500/20 text-purple-300 border border-purple-500/30" : screen.persona === "Investors" ? "bg-green-500/20 text-green-300 border border-green-500/30" : "bg-amber-500/20 text-amber-300 border border-amber-500/30"}`}
                            >
                              {screen.persona}
                            </span>
                          </div>

                          {/* Image */}
                          <div className="aspect-[16/10] overflow-hidden">
                            <img
                              src={screen.image}
                              alt={screen.title}
                              className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                            />
                          </div>

                          {/* Content */}
                          <div className="p-6 bg-background/80 backdrop-blur-sm">
                            <h3 className="text-lg font-medium mb-2">{screen.title}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">{screen.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Figma Prototype CTA */}
                    <div className="mt-16 text-center">
                      <button
                        onClick={() => setPrototypeOpen(true)}
                        className="inline-flex items-center gap-3 bg-primary/10 hover:bg-primary/20 border border-primary/20 px-8 py-4 rounded-full transition-colors"
                      >
                        <Figma className="w-5 h-5 text-primary" />
                        <span className="font-medium">Explore Interactive Prototype</span>
                        <Play className="w-4 h-4 text-muted-foreground" />
                      </button>
                    </div>
                  </section>
                )}
                <section
                  ref={howIWorkedAnim.ref}
                  id="how-i-worked"
                  className={`min-h-screen flex flex-col justify-start py-[20vh] transition-all duration-1000 ${howIWorkedAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
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
                              {String(index + 1).padStart(2, "0")}
                            </div>
                            <div>
                              <h4 className="text-base font-medium mb-2">{phase.step}</h4>
                              <p className="text-sm text-muted-foreground font-light leading-[1.7]">
                                {phase.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Constraints - wedding-verse and ideabaaz */}
                  {(project.id === "wedding-verse" || project.id === "ideabaaz") && (
                    <div>
                      <div className="mb-12">
                        <h3 className="text-2xl md:text-3xl font-light mb-4">Constraints & Challenges</h3>
                        <p className="text-base md:text-lg text-muted-foreground font-light leading-relaxed max-w-3xl">
                          Real-world limitations that shaped design decisions and demonstrated problem-solving maturity.
                        </p>
                      </div>
                      {project.id === "wedding-verse" ? (
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="flex items-start gap-4 p-6 bg-muted/10 rounded-xl border border-border/20">
                            <AlertCircle className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                            <div>
                              <h4 className="text-base font-medium mb-1">Resource Limits</h4>
                              <p className="text-sm text-muted-foreground leading-relaxed">
                                Small engineering team required strict scope discipline and phased delivery.
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-4 p-6 bg-muted/10 rounded-xl border border-border/20">
                            <AlertCircle className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                            <div>
                              <h4 className="text-base font-medium mb-1">Dual-Persona Complexity</h4>
                              <p className="text-sm text-muted-foreground leading-relaxed">
                                Designing for emotionally-driven couples vs. business-focused vendors simultaneously.
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-4 p-6 bg-muted/10 rounded-xl border border-border/20">
                            <AlertCircle className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                            <div>
                              <h4 className="text-base font-medium mb-1">AI Reliability</h4>
                              <p className="text-sm text-muted-foreground leading-relaxed">
                                Voice agent needed protective UX layers to handle edge cases gracefully.
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-4 p-6 bg-muted/10 rounded-xl border border-border/20">
                            <AlertCircle className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                            <div>
                              <h4 className="text-base font-medium mb-1">Data Inconsistency</h4>
                              <p className="text-sm text-muted-foreground leading-relaxed">
                                Vendor inputs varied wildly; required intelligent validation and normalization.
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-4 p-6 bg-muted/10 rounded-xl border border-border/20">
                            <AlertCircle className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                            <div>
                              <h4 className="text-base font-medium mb-1">Aggressive Timeline</h4>
                              <p className="text-sm text-muted-foreground leading-relaxed">
                                2 months for UI design, 5 months for MVP engineering, 3 months for expansion.
                              </p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="flex items-start gap-4 p-6 bg-muted/10 rounded-xl border border-border/20">
                            <AlertCircle className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                            <div>
                              <h4 className="text-base font-medium mb-1">Limited Engineering Bandwidth</h4>
                              <p className="text-sm text-muted-foreground leading-relaxed">
                                Required modular, low-complexity workflows that could be built incrementally.
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-4 p-6 bg-muted/10 rounded-xl border border-border/20">
                            <AlertCircle className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                            <div>
                              <h4 className="text-base font-medium mb-1">Multi-Persona Complexity</h4>
                              <p className="text-sm text-muted-foreground leading-relaxed">
                                4 user archetypes with competing goals: founders vs investors vs mentors vs providers.
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-4 p-6 bg-muted/10 rounded-xl border border-border/20">
                            <AlertCircle className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                            <div>
                              <h4 className="text-base font-medium mb-1">High Emotional Stakes</h4>
                              <p className="text-sm text-muted-foreground leading-relaxed">
                                Founders making critical decisions during financial pressure and uncertainty.
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-4 p-6 bg-muted/10 rounded-xl border border-border/20">
                            <AlertCircle className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                            <div>
                              <h4 className="text-base font-medium mb-1">Fragmented Ecosystem Trust</h4>
                              <p className="text-sm text-muted-foreground leading-relaxed">
                                Users mistrusted unknown vendors; needed credibility signals throughout.
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-4 p-6 bg-muted/10 rounded-xl border border-border/20">
                            <AlertCircle className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                            <div>
                              <h4 className="text-base font-medium mb-1">Brand Expectation Mismatch</h4>
                              <p className="text-sm text-muted-foreground leading-relaxed">
                                TV show audience expected entertainment; platform needed to deliver real utility.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </section>

                {/* Design Evolution - Iterations + Walkthrough Combined */}
                {(project.iterations || project.videoUrl) && (
                  <section
                    ref={designEvolutionAnim.ref}
                    id="design-evolution"
                    className={`min-h-screen flex flex-col justify-start py-[20vh] transition-all duration-1000 ${designEvolutionAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
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
                  className={`min-h-screen flex flex-col justify-start py-[20vh] transition-all duration-1000 ${impactAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
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
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              Couples find relevant vendors 63% faster, reducing drop-off
                            </p>
                          </div>
                          <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-6 border border-primary/20">
                            <h4 className="text-sm font-medium text-primary mb-2">Improved Engagement</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              Vendor response rates increased 42%, creating healthier marketplace dynamics
                            </p>
                          </div>
                          <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-6 border border-primary/20">
                            <h4 className="text-sm font-medium text-primary mb-2">Retention Lift</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              28% more couples returned in Week 1, indicating stronger early value perception
                            </p>
                          </div>
                          <div className="bg-muted/20 rounded-xl p-6 border border-border/20">
                            <h4 className="text-sm font-medium mb-2">Operational Efficiency</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              AI onboarding freed team from manual vendor setup, scaling to 100+ vendors/month
                            </p>
                          </div>
                          <div className="bg-muted/20 rounded-xl p-6 border border-border/20">
                            <h4 className="text-sm font-medium mb-2">Foundation for Growth</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              Design system accelerated Phase 2 feature development by 3x
                            </p>
                          </div>
                          <div className="bg-muted/20 rounded-xl p-6 border border-border/20">
                            <h4 className="text-sm font-medium mb-2">Platform Trust</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              Structured profiles and guided flows reduced uncertainty, increasing booking intent
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {project.outcomes.map((outcome, index) => (
                          <div
                            key={index}
                            className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-6 border border-primary/20 text-center"
                          >
                            <span className="block text-3xl md:text-4xl font-mono font-normal text-primary mb-2">
                              {outcome.value}
                            </span>
                            <span className="text-sm text-muted-foreground font-light">{outcome.metric}</span>
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
                              <p className="text-sm text-muted-foreground leading-relaxed">
                                Wedding planning requires UX that acknowledges anxiety, not just efficiency
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-2 h-2 rounded-full bg-primary mt-2" />
                            <div>
                              <h4 className="text-base font-medium mb-1">Scope discipline scales impact</h4>
                              <p className="text-sm text-muted-foreground leading-relaxed">
                                Saying "no" to 20 features enabled shipping 5 features that actually mattered
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-2 h-2 rounded-full bg-primary mt-2" />
                            <div>
                              <h4 className="text-base font-medium mb-1">
                                Multi-persona success requires unified mental models
                              </h4>
                              <p className="text-sm text-muted-foreground leading-relaxed">
                                Both users succeeded when platform logic felt consistent
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-2 h-2 rounded-full bg-primary mt-2" />
                            <div>
                              <h4 className="text-base font-medium mb-1">AI needs guardrails</h4>
                              <p className="text-sm text-muted-foreground leading-relaxed">
                                Conversational interfaces require both personality and strict boundary conditions
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-2 h-2 rounded-full bg-primary mt-2" />
                            <div>
                              <h4 className="text-base font-medium mb-1">Systems thinking creates velocity</h4>
                              <p className="text-sm text-muted-foreground leading-relaxed">
                                Design systems aren't documentation—they're strategic accelerators
                              </p>
                            </div>
                          </div>
                        </div>
                      ) : project.id === "ideabaaz" ? (
                        <div className="space-y-6">
                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-2 h-2 rounded-full bg-primary mt-2" />
                            <div>
                              <h4 className="text-base font-medium mb-1">Trust is designed, not assumed</h4>
                              <p className="text-sm text-muted-foreground leading-relaxed">
                                Marketplace ecosystems succeed only when credibility signals are built into every
                                interaction
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-2 h-2 rounded-full bg-primary mt-2" />
                            <div>
                              <h4 className="text-base font-medium mb-1">Ruthless prioritization is essential</h4>
                              <p className="text-sm text-muted-foreground leading-relaxed">
                                Multi-role platforms require scope discipline to avoid complexity that blocks users
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-2 h-2 rounded-full bg-primary mt-2" />
                            <div>
                              <h4 className="text-base font-medium mb-1">
                                Early stakeholder alignment prevents rework
                              </h4>
                              <p className="text-sm text-muted-foreground leading-relaxed">
                                Aligning with show production teams early prevented costly pivots downstream
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-2 h-2 rounded-full bg-primary mt-2" />
                            <div>
                              <h4 className="text-base font-medium mb-1">UX writing = UI decisions</h4>
                              <p className="text-sm text-muted-foreground leading-relaxed">
                                Clear copy was as critical as visual design for building user confidence
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-2 h-2 rounded-full bg-primary mt-2" />
                            <div>
                              <h4 className="text-base font-medium mb-1">Empathy-driven UX for stressed users</h4>
                              <p className="text-sm text-muted-foreground leading-relaxed">
                                Designing for emotionally stressed founders demands guidance-driven, not feature-driven
                                UX
                              </p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <p className="text-base text-muted-foreground leading-[1.8] font-light">{project.reflection}</p>
                      )}
                    </div>
                  </div>
                </section>
              </>
            )}
          </section>
        </div>
      </main>

      {/* Ideabaaz Prototype Modal */}
      <Dialog open={prototypeOpen} onOpenChange={setPrototypeOpen}>
        <DialogContent className="max-w-[95vw] w-full h-[90vh] p-0 bg-background border-border/50 overflow-hidden flex flex-col">
          <DialogHeader className="px-4 sm:px-6 py-4 border-b border-border/50 bg-background flex-shrink-0">
            <DialogTitle className="text-foreground font-medium text-lg">Ideabaaz — Interactive Prototype</DialogTitle>
            <DialogDescription className="text-muted-foreground text-sm">
              Explore the full platform experience
            </DialogDescription>
          </DialogHeader>
          <div className="flex-1 w-full bg-muted/20">
            <iframe
              src="https://embed.figma.com/proto/Ow4QpYUgooZfFeaK3PqNzi/UI?node-id=559-14557&viewport=316%2C209%2C0.16&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=559%3A14557&embed-host=share"
              className="w-full h-full border-0"
              allowFullScreen
              title="Ideabaaz Prototype"
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default ProjectDetails;
