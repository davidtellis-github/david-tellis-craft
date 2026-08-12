import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AmbientSpotlight from "@/components/portfolio/AmbientSpotlight";
import SideNav from "@/components/portfolio/SideNav";
import MobileHeader from "@/components/portfolio/MobileHeader";
import Hero from "@/components/portfolio/Hero";
import WorkGrid from "@/components/portfolio/WorkGrid";
import Gallery3D from "@/components/portfolio/Gallery3D";
import ValuesSection from "@/components/portfolio/ValuesSection";
import BackgroundTimeline from "@/components/portfolio/BackgroundTimeline";
import Testimonials from "@/components/portfolio/Testimonials";
import Contact from "@/components/portfolio/Contact";


const Index = () => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Check if splash screen was shown this session
    const splashShown = sessionStorage.getItem('splashShown');
    
    if (!splashShown) {
      // Wait for splash screen to finish (4s total duration from SplashScreen.tsx)
      const timer = setTimeout(() => setShowContent(true), 4000);
      return () => clearTimeout(timer);
    } else {
      // No splash screen, show immediately with animation
      setShowContent(true);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <AmbientSpotlight />
      <MobileHeader />
      
      
      <main className="w-[98vw] mx-auto sm:px-4 md:px-6 pt-16 lg:pt-0">
        {/* Main layout with SideNav + sections */}
        <div className="flex gap-[4vw] lg:gap-[15%]">
          <div 
            className={`transition-opacity duration-500 ease-out ${
              showContent ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            <SideNav />
          </div>
          <section 
            className={`flex flex-col flex-1 min-w-0 transition-all duration-700 ease-out ${
              showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            <Hero />
            <WorkGrid />
            <Gallery3D />
            <ValuesSection />
            <BackgroundTimeline />
            <Testimonials />
            <Contact />
          </section>
        </div>
      </main>
      
      {/* Temporary migration button - remove after migrating */}
      {/* <MigrationButton /> */}
    </div>
  );
};

export default Index;
