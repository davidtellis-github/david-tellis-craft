import AmbientSpotlight from "@/components/portfolio/AmbientSpotlight";
import SideNav from "@/components/portfolio/SideNav";
import Hero from "@/components/portfolio/Hero";
import WorkGrid from "@/components/portfolio/WorkGrid";
import ValuesSection from "@/components/portfolio/ValuesSection";
import BackgroundTimeline from "@/components/portfolio/BackgroundTimeline";
import Testimonials from "@/components/portfolio/Testimonials";
import Contact from "@/components/portfolio/Contact";
import Header from "@/components/ui/Header";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <AmbientSpotlight />
      <Header />
      <main className="w-[98vw] mx-auto px-4 md:px-6">
        <SideNav />
        {/* Main layout without SideNav taking space */}
        <div className="w-full">
          <section className="flex flex-col">
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
