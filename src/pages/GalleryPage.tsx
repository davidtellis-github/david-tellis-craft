import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

// All project images
import galleryDjController from "@/assets/gallery-dj-controller.png";
import gallerySynthUI from "@/assets/gallery-synth-ui.png";
import galleryKeysAngled from "@/assets/gallery-keys-angled.png";
import lunaAiHero from "@/assets/luna-ai-hero.png";
import uiDroneServices from "@/assets/ui-drone-services.png";
import uiFinopsDashboard from "@/assets/ui-finops-dashboard.png";
import uiFuturecraftOnboarding from "@/assets/ui-futurecraft-onboarding.png";
import uiFuturecraftSignup from "@/assets/ui-futurecraft-signup.png";
import uiLaptopMockup from "@/assets/ui-laptop-mockup.png";
import uiMusicController from "@/assets/ui-music-controller.png";
import uiReviewsSection from "@/assets/ui-reviews-section.png";
import uiTimelineVision from "@/assets/ui-timeline-vision.png";
import uiVisionBoard from "@/assets/ui-vision-board.png";
import uiWeddingPlanner from "@/assets/ui-wedding-planner.png";
import uiWeddingverseHome from "@/assets/ui-weddingverse-home.png";
import uiWeddingverseVendor from "@/assets/ui-weddingverse-vendor.png";
import galleryUpload1 from "@/assets/gallery-upload-1.png";
import galleryUpload2 from "@/assets/gallery-upload-2.png";
import galleryUpload3 from "@/assets/gallery-upload-3.png";
import galleryUpload4 from "@/assets/gallery-upload-4.png";
import galleryUpload5 from "@/assets/gallery-upload-5.png";
import galleryUpload6 from "@/assets/gallery-upload-6.jpg";
import galleryUpload7 from "@/assets/gallery-upload-7.jpg";
import galleryUpload8 from "@/assets/gallery-upload-8.jpg";
import bostonFinancial1 from "@/assets/boston-financial-1.png";
import bostonFinancial2 from "@/assets/boston-financial-2.png";
import bostonFinancial from "@/assets/boston-financial.png";
import futurcraftAi from "@/assets/futurcraft-ai.png";
import futurcraftAnalyticsMockup from "@/assets/futurcraft-analytics-mockup.jpg";
import futurcraftAnalyticsPedestal from "@/assets/futurcraft-analytics-pedestal.jpg";
import futurcraftBlogEditor from "@/assets/futurcraft-blog-editor.png";
import futurcraftBlogExport from "@/assets/futurcraft-blog-export.jpg";
import futurcraftBlogList from "@/assets/futurcraft-blog-list.png";
import futurcraftBlogSeo from "@/assets/futurcraft-blog-seo.jpg";
import futurcraftBlogs from "@/assets/futurcraft-blogs.png";
import futurcraftBrandforge from "@/assets/futurcraft-brandforge.png";
import futurcraftContentCompare from "@/assets/futurcraft-content-compare.png";
import futurcraftDashboardDark from "@/assets/futurcraft-dashboard-dark.png";
import futurcraftFeatured from "@/assets/futurcraft-featured.png";
import futurcraftGeoAnalytics from "@/assets/futurcraft-geo-analytics.jpg";
import futurcraftImagePicker from "@/assets/futurcraft-image-picker.jpg";
import futurcraftPostEditor from "@/assets/futurcraft-post-editor.jpg";
import futurcraftSocialPreview from "@/assets/futurcraft-social-preview.jpg";
import futurcraftStatsBlue from "@/assets/futurcraft-stats-blue.jpg";
import futurcraftUrlInput from "@/assets/futurcraft-url-input.png";
import ideabaazDashboard from "@/assets/ideabaaz-dashboard.png";
import ideabaazDocuments from "@/assets/ideabaaz-documents.png";
import ideabaazFeatured from "@/assets/ideabaaz-featured.png";
import ideabaazLaptopMockup from "@/assets/ideabaaz-laptop-mockup.png";
import ideabaazMentorProfile from "@/assets/ideabaaz-mentor-profile.png";
import ideabaazStartupPitch from "@/assets/ideabaaz-startup-pitch.png";
import ideabaazStartupTeam from "@/assets/ideabaaz-startup-team.png";
import medpassHealthcare from "@/assets/medpass-healthcare.png";
import portfolioGallery from "@/assets/portfolio-gallery.png";
import turbocloud1 from "@/assets/turbocloud-dashboard-1.jpg";
import turbocloudMain from "@/assets/turbocloud-dashboard-main.png";
import turbocloudDashboard from "@/assets/tubocloud-dashboard.png";
import turbocloudMockup from "@/assets/turbocloud-dashboard-mockup.jpg";
import turbocloudFeatured from "@/assets/turbocloud-featured.png";
import turbocloudFinops from "@/assets/turbocloud-finops-dashboard.png";
import turbocloudFinopsMockup from "@/assets/turbocloud-finops-mockup.jpg";
import turbocloudMainDash from "@/assets/turbocloud-main-dashboard.png";
import turbocloudMonitoring from "@/assets/turbocloud-monitoring.png";
import turbocloudProviderMockup from "@/assets/turbocloud-provider-mockup.jpg";
import turbocloudProviderSelection from "@/assets/turbocloud-provider-selection.jpg";
import turbocloudSignupMockup from "@/assets/turbocloud-signup-mockup.jpg";
import turbocloudSignup from "@/assets/turbocloud-signup.jpg";
import weddingverseBudget from "@/assets/wedding-verse-budget.png";
import weddingverseContext from "@/assets/wedding-verse-context.jpg";
import weddingverseDashboard from "@/assets/wedding-verse-dashboard.png";
import weddingverseDatePicker from "@/assets/wedding-verse-date-picker.png";
import weddingverseDS1 from "@/assets/wedding-verse-design-system-1.png";
import weddingverseDS2 from "@/assets/wedding-verse-design-system-2.png";
import weddingverseDS3 from "@/assets/wedding-verse-design-system-3.png";
import weddingverseGallery from "@/assets/wedding-verse-gallery.png";
import weddingverseHome from "@/assets/wedding-verse-home.png";
import weddingverseIter1 from "@/assets/wedding-verse-iterations-1.png";
import weddingverseIter2 from "@/assets/wedding-verse-iterations-2.png";
import weddingverseIter3 from "@/assets/wedding-verse-iterations-3.png";
import weddingverseIter4 from "@/assets/wedding-verse-iterations-4.png";
import weddingverseIter5 from "@/assets/wedding-verse-iterations-5.png";
import weddingverseRole from "@/assets/wedding-verse-role.jpg";
import weddingverseTheme from "@/assets/wedding-verse-theme.png";
import weddingverseTrending from "@/assets/wedding-verse-trending.png";
import weddingverseUxFlow from "@/assets/wedding-verse-ux-flow.png";
import weddingverseVisionBoard from "@/assets/wedding-verse-vision-board.png";
import weddingverseWelcome from "@/assets/wedding-verse-welcome.png";
import weddingverseFeatured from "@/assets/weddingverse-featured.png";
import weddingvPng from "@/assets/Weddingv.png";
import work1 from "@/assets/work-1.jpg";
import work2 from "@/assets/work-2.jpg";
import work3 from "@/assets/work-3.jpg";
import work4 from "@/assets/work-4.jpg";
import work5 from "@/assets/work-5.jpg";
import work6 from "@/assets/work-6.jpg";
import work7 from "@/assets/work-7.jpg";
import work8 from "@/assets/work-8.jpg";
import work9 from "@/assets/work-9.jpg";

interface GalleryItem {
  src: string;
  alt: string;
}

const allImages: GalleryItem[] = [
  { src: lunaAiHero, alt: "Luna AI Hero" },
  { src: galleryDjController, alt: "DJ Controller" },
  { src: gallerySynthUI, alt: "Synth UI" },
  { src: galleryKeysAngled, alt: "Keys Angled" },
  { src: galleryUpload1, alt: "Portfolio Design 1" },
  { src: galleryUpload2, alt: "Portfolio Design 2" },
  { src: galleryUpload3, alt: "Portfolio Design 3" },
  { src: galleryUpload4, alt: "Index Page Design" },
  { src: galleryUpload5, alt: "Future Songs Layout" },
  { src: galleryUpload6, alt: "VYBE Landing Page" },
  { src: galleryUpload7, alt: "Portfolio Dashboard" },
  { src: galleryUpload8, alt: "Portfolio Dashboard Alt" },
  { src: uiDroneServices, alt: "Drone Services UI" },
  { src: uiFinopsDashboard, alt: "FinOps Dashboard" },
  { src: uiFuturecraftOnboarding, alt: "Futurecraft Onboarding" },
  { src: uiFuturecraftSignup, alt: "Futurecraft Signup" },
  { src: uiLaptopMockup, alt: "Laptop Mockup" },
  { src: uiMusicController, alt: "Music Controller" },
  { src: uiReviewsSection, alt: "Reviews Section" },
  { src: uiTimelineVision, alt: "Timeline Vision" },
  { src: uiVisionBoard, alt: "Vision Board" },
  { src: uiWeddingPlanner, alt: "Wedding Planner" },
  { src: uiWeddingverseHome, alt: "Weddingverse Home" },
  { src: uiWeddingverseVendor, alt: "Weddingverse Vendor" },
  { src: bostonFinancial, alt: "Boston Financial" },
  { src: bostonFinancial1, alt: "Boston Financial 1" },
  { src: bostonFinancial2, alt: "Boston Financial 2" },
  { src: futurcraftAi, alt: "Futurcraft AI" },
  { src: futurcraftAnalyticsMockup, alt: "Futurcraft Analytics Mockup" },
  { src: futurcraftAnalyticsPedestal, alt: "Futurcraft Analytics Pedestal" },
  { src: futurcraftBlogEditor, alt: "Futurcraft Blog Editor" },
  { src: futurcraftBlogExport, alt: "Futurcraft Blog Export" },
  { src: futurcraftBlogList, alt: "Futurcraft Blog List" },
  { src: futurcraftBlogSeo, alt: "Futurcraft Blog SEO" },
  { src: futurcraftBlogs, alt: "Futurcraft Blogs" },
  { src: futurcraftBrandforge, alt: "Futurcraft Brandforge" },
  { src: futurcraftContentCompare, alt: "Futurcraft Content Compare" },
  { src: futurcraftDashboardDark, alt: "Futurcraft Dashboard Dark" },
  { src: futurcraftFeatured, alt: "Futurcraft Featured" },
  { src: futurcraftGeoAnalytics, alt: "Futurcraft Geo Analytics" },
  { src: futurcraftImagePicker, alt: "Futurcraft Image Picker" },
  { src: futurcraftPostEditor, alt: "Futurcraft Post Editor" },
  { src: futurcraftSocialPreview, alt: "Futurcraft Social Preview" },
  { src: futurcraftStatsBlue, alt: "Futurcraft Stats Blue" },
  { src: futurcraftUrlInput, alt: "Futurcraft URL Input" },
  { src: ideabaazDashboard, alt: "Ideabaaz Dashboard" },
  { src: ideabaazDocuments, alt: "Ideabaaz Documents" },
  { src: ideabaazFeatured, alt: "Ideabaaz Featured" },
  { src: ideabaazLaptopMockup, alt: "Ideabaaz Laptop Mockup" },
  { src: ideabaazMentorProfile, alt: "Ideabaaz Mentor Profile" },
  { src: ideabaazStartupPitch, alt: "Ideabaaz Startup Pitch" },
  { src: ideabaazStartupTeam, alt: "Ideabaaz Startup Team" },
  { src: medpassHealthcare, alt: "MedPass Healthcare" },
  { src: portfolioGallery, alt: "Portfolio Gallery" },
  { src: turbocloudDashboard, alt: "TurboCloud Dashboard" },
  { src: turbocloud1, alt: "TurboCloud Dashboard 1" },
  { src: turbocloudMain, alt: "TurboCloud Dashboard Main" },
  { src: turbocloudMockup, alt: "TurboCloud Dashboard Mockup" },
  { src: turbocloudFeatured, alt: "TurboCloud Featured" },
  { src: turbocloudFinops, alt: "TurboCloud FinOps Dashboard" },
  { src: turbocloudFinopsMockup, alt: "TurboCloud FinOps Mockup" },
  { src: turbocloudMainDash, alt: "TurboCloud Main Dashboard" },
  { src: turbocloudMonitoring, alt: "TurboCloud Monitoring" },
  { src: turbocloudProviderMockup, alt: "TurboCloud Provider Mockup" },
  { src: turbocloudProviderSelection, alt: "TurboCloud Provider Selection" },
  { src: turbocloudSignupMockup, alt: "TurboCloud Signup Mockup" },
  { src: turbocloudSignup, alt: "TurboCloud Signup" },
  { src: weddingvPng, alt: "Weddingverse" },
  { src: weddingverseFeatured, alt: "Weddingverse Featured" },
  { src: weddingverseHome, alt: "Wedding Verse Home" },
  { src: weddingverseDashboard, alt: "Wedding Verse Dashboard" },
  { src: weddingverseBudget, alt: "Wedding Verse Budget" },
  { src: weddingverseContext, alt: "Wedding Verse Context" },
  { src: weddingverseDatePicker, alt: "Wedding Verse Date Picker" },
  { src: weddingverseDS1, alt: "Wedding Verse Design System 1" },
  { src: weddingverseDS2, alt: "Wedding Verse Design System 2" },
  { src: weddingverseDS3, alt: "Wedding Verse Design System 3" },
  { src: weddingverseGallery, alt: "Wedding Verse Gallery" },
  { src: weddingverseIter1, alt: "Wedding Verse Iteration 1" },
  { src: weddingverseIter2, alt: "Wedding Verse Iteration 2" },
  { src: weddingverseIter3, alt: "Wedding Verse Iteration 3" },
  { src: weddingverseIter4, alt: "Wedding Verse Iteration 4" },
  { src: weddingverseIter5, alt: "Wedding Verse Iteration 5" },
  { src: weddingverseRole, alt: "Wedding Verse Role" },
  { src: weddingverseTheme, alt: "Wedding Verse Theme" },
  { src: weddingverseTrending, alt: "Wedding Verse Trending" },
  { src: weddingverseUxFlow, alt: "Wedding Verse UX Flow" },
  { src: weddingverseVisionBoard, alt: "Wedding Verse Vision Board" },
  { src: weddingverseWelcome, alt: "Wedding Verse Welcome" },
  { src: work1, alt: "Work 1" },
  { src: work2, alt: "Work 2" },
  { src: work3, alt: "Work 3" },
  { src: work4, alt: "Work 4" },
  { src: work5, alt: "Work 5" },
  { src: work6, alt: "Work 6" },
  { src: work7, alt: "Work 7" },
  { src: work8, alt: "Work 8" },
  { src: work9, alt: "Work 9" },
];

const GalleryPage: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const thumbnailStripRef = React.useRef<HTMLDivElement>(null);
  const thumbnailRefs = React.useRef<(HTMLButtonElement | null)[]>([]);

  const goTo = React.useCallback((index: number) => {
    const wrapped = (index + allImages.length) % allImages.length;
    setSelectedIndex(wrapped);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    sessionStorage.removeItem("gallery-navigated");
    requestAnimationFrame(() => setMounted(true));
  }, []);

  // Keyboard nav
  useEffect(() => {
    if (selectedIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goTo(selectedIndex - 1);
      else if (e.key === "ArrowRight") goTo(selectedIndex + 1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [selectedIndex, goTo]);

  // Auto-scroll thumbnail
  useEffect(() => {
    if (selectedIndex === null) return;
    thumbnailRefs.current[selectedIndex]?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [selectedIndex]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/30">
        <div className="flex items-center justify-between px-6 py-4 max-w-[98vw] mx-auto">
          <Link to="/" className="text-xl font-bold tracking-tight text-foreground hover:text-primary transition-colors">
            DT
          </Link>
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors interactive"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
        </div>
      </nav>

      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-[98vw] mx-auto">
        <div className="mb-10">
          <h1 className="text-[clamp(28px,4vw,44px)] font-medium tracking-tight text-foreground mb-3">
            Gallery
          </h1>
          <p className="text-muted-foreground text-[clamp(14px,1.4vw,18px)] max-w-xl">
            A complete collection of UI designs, 3D recreations, and visual explorations.
          </p>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-3 space-y-3">
          {allImages.map((image, index) => (
            <div
              key={index}
              className={`break-inside-avoid cursor-pointer group interactive transition-all duration-500
                ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ transitionDelay: mounted ? `${Math.min(index * 30, 600)}ms` : "0ms" }}
              onClick={() => setSelectedIndex(index)}
            >
              <div className="relative overflow-hidden rounded-lg bg-muted/30 border border-border/20 hover:border-border/60 transition-all duration-300 hover:shadow-lg">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-background/0 group-hover:bg-background/40 transition-colors duration-300 flex items-end">
                  <span className="px-4 py-3 text-sm font-medium text-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                    {image.alt}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Lightbox */}
      <Dialog open={selectedIndex !== null} onOpenChange={(open) => !open && setSelectedIndex(null)}>
        <DialogContent className="max-w-[95vw] w-auto h-[90vh] p-0 border-border/30 bg-background/95 backdrop-blur-xl overflow-hidden flex flex-col gap-0 rounded-xl">
          <DialogTitle className="sr-only">
            {selectedIndex !== null ? allImages[selectedIndex].alt : "Image preview"}
          </DialogTitle>

          <div className="relative flex items-center justify-center flex-1 min-h-0 px-4 pt-10 pb-4">
            <button
              onClick={() => goTo((selectedIndex ?? 0) - 1)}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-muted/60 hover:bg-muted flex items-center justify-center transition-colors interactive"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>

            {selectedIndex !== null && (
              <img
                src={allImages[selectedIndex].src}
                alt={allImages[selectedIndex].alt}
                className="h-[65vh] max-w-full object-contain rounded-lg select-none"
                draggable={false}
              />
            )}

            <button
              onClick={() => goTo((selectedIndex ?? 0) + 1)}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-muted/60 hover:bg-muted flex items-center justify-center transition-colors interactive"
            >
              <ChevronRight className="w-5 h-5 text-foreground" />
            </button>
          </div>

          <div className="border-t border-border/20 bg-muted/20 px-4 py-3">
            <div
              ref={thumbnailStripRef}
              className="flex gap-2 overflow-x-auto scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent pb-1"
            >
              {allImages.map((img, i) => (
                <button
                  key={i}
                  ref={(el) => { thumbnailRefs.current[i] = el; }}
                  onClick={() => setSelectedIndex(i)}
                  className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-all duration-200 interactive ${
                    i === selectedIndex
                      ? "border-primary ring-1 ring-primary/40 scale-105"
                      : "border-transparent opacity-50 hover:opacity-80"
                  }`}
                >
                  <img src={img.src} alt={img.alt} className="w-full h-full object-cover" draggable={false} />
                </button>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GalleryPage;
