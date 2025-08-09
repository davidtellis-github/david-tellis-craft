import AmbientSpotlight from "@/components/portfolio/AmbientSpotlight";
import SideNav from "@/components/portfolio/SideNav";
import Hero from "@/components/portfolio/Hero";
import WorkGrid from "@/components/portfolio/WorkGrid";
import ValuesSection from "@/components/portfolio/ValuesSection";
import BackgroundTimeline from "@/components/portfolio/BackgroundTimeline";
import Testimonials from "@/components/portfolio/Testimonials";
import Contact from "@/components/portfolio/Contact";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <AmbientSpotlight />
      <main className="container mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-[220px_1fr] gap-10">
          <SideNav />
          <section>
            <Hero />
            <WorkGrid />
            <ValuesSection />
            <BackgroundTimeline />
            <section id="about" className="pt-28">
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">About</h2>
              <p className="text-muted-foreground max-w-2xl">I design tools and systems that help teams move faster. My focus: clarity, momentum, and measurable outcomes. Previously led design for data-rich workflows and design systems.</p>
            </section>
            <Testimonials />
            <Contact />
          </section>
        </div>
      </main>
    </div>
  );
};

export default Index;
