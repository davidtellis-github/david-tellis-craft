import AmbientSpotlight from "@/components/portfolio/AmbientSpotlight";
import SideNav from "@/components/portfolio/SideNav";
import Hero from "@/components/portfolio/Hero";
import WorkGrid from "@/components/portfolio/WorkGrid";
import ValuesSection from "@/components/portfolio/ValuesSection";
import BackgroundTimeline from "@/components/portfolio/BackgroundTimeline";
import Testimonials from "@/components/portfolio/Testimonials";
import Contact from "@/components/portfolio/Contact";
import Header from "@/components/portfolio/Header"; // <-- new

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <AmbientSpotlight />
      <main className="w-[98vw] mx-auto px-4 md:px-6">
        {/* New Header on top */}
       

        {/* Main layout with SideNav + sections */}
        <div className="flex lg:grid-cols-[220px_1fr] gap-[10vh]">
          <SideNav />
          <section className="flex flex-col w-[70vw] ">
             
            <Hero />
            <WorkGrid />
            <ValuesSection />
            <BackgroundTimeline />
            <Testimonials />
            <Contact />
          </section>
        </div>
      </main>
    </div>
  );
};

export default Index;
