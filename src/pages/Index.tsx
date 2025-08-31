import AmbientSpotlight from "@/components/portfolio/AmbientSpotlight";
import SideNav from "@/components/portfolio/SideNav";
import Hero from "@/components/portfolio/Hero";
import WorkGrid from "@/components/portfolio/WorkGrid";
import ValuesSection from "@/components/portfolio/ValuesSection";
import BackgroundTimeline from "@/components/portfolio/BackgroundTimeline";
import Testimonials from "@/components/portfolio/Testimonials";
import Contact from "@/components/portfolio/Contact";
import MigrationButton from "@/components/dev/MigrationButton";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <AmbientSpotlight />
      
      <main className="w-[98vw] mx-auto px-4 md:px-6">
        {/* Main layout with SideNav + sections */}
        <div className="flex gap-[4vw] lg:gap-[6vw]">
          <SideNav />
          <section className="flex flex-col flex-1 min-w-0">
            <Hero />
            <WorkGrid />
            <ValuesSection />
            <BackgroundTimeline />
            <Testimonials />
            <Contact />
          </section>
        </div>
      </main>
      
      {/* Temporary migration button - remove after migrating */}
      <MigrationButton />
    </div>
  );
};

export default Index;
