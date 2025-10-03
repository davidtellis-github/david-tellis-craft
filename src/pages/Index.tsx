import AmbientSpotlight from "@/components/portfolio/AmbientSpotlight";
import SideNav from "@/components/portfolio/SideNav";
import MobileHeader from "@/components/portfolio/MobileHeader";
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
      <MobileHeader />
      
      <main className="w-full overflow-x-hidden px-4 sm:px-6 lg:px-8 pt-16 lg:pt-0 max-w-[1600px] mx-auto">
        {/* Main layout with SideNav + sections */}
        <div className="flex gap-0 lg:gap-[10%]">
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
      {/* <MigrationButton /> */}
    </div>
  );
};

export default Index;
