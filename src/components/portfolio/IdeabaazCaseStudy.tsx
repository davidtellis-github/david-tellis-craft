import React, { useState } from "react";
import { Figma, Play, Users, TrendingUp, Target, Lightbulb, Award, CheckCircle2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { projectsData } from "@/data/projectData";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

// Import Ideabaaz images
import ideabaazFeatured from '@/assets/ideabaaz-featured.png';
import ideabaazLaptopMockup from '@/assets/ideabaaz-laptop-mockup.png';
import ideabaazDashboard from '@/assets/ideabaaz-dashboard.png';
import ideabaazDocuments from '@/assets/ideabaaz-documents.png';
import ideabaazMentorProfile from '@/assets/ideabaaz-mentor-profile.png';
import ideabaazStartupTeam from '@/assets/ideabaaz-startup-team.png';
import ideabaazStartupPitch from '@/assets/ideabaaz-startup-pitch.png';

interface IdeabaazCaseStudyProps {
  project: typeof projectsData['ideabaaz'];
}

export const IdeabaazCaseStudy: React.FC<IdeabaazCaseStudyProps> = ({ project }) => {
  const [prototypeOpen, setPrototypeOpen] = useState(false);
  
  const contextAnim = useScrollAnimation();
  const frictionAnim = useScrollAnimation();
  const strategyAnim = useScrollAnimation();
  const cockpitAnim = useScrollAnimation();
  const titansAnim = useScrollAnimation();
  const impactAnim = useScrollAnimation();

  const caseStudy = project.caseStudy;

  if (!caseStudy) return null;

  return (
    <>
      {/* 01. THE CONTEXT (THE HOOK) */}
      <section 
        ref={contextAnim.ref} 
        id="context" 
        className={`min-h-screen flex flex-col justify-center py-[15vh] transition-all duration-1000 ${contextAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <div className="mb-8">
          <span className="text-xs uppercase tracking-[0.2em] text-primary font-medium">01. The Context</span>
        </div>
        
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-light mb-12 leading-tight max-w-4xl">
          {caseStudy.theContext.hook}
        </h2>
        
        <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed max-w-3xl mb-16">
          {caseStudy.theContext.intro}
        </p>

        {/* Role Info */}
        <div className="flex flex-wrap gap-6 mb-16">
          <div className="bg-muted/20 rounded-full px-6 py-3 border border-border/20">
            <span className="text-sm font-medium">{project.role.title}</span>
          </div>
          <div className="bg-muted/20 rounded-full px-6 py-3 border border-border/20">
            <span className="text-sm text-muted-foreground">{project.role.duration}</span>
          </div>
        </div>

        {/* Hero Image - Landing Page */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-background/20">
          <div className="absolute top-4 left-4 z-10 bg-background/80 backdrop-blur-sm px-4 py-2 rounded-full">
            <span className="text-xs font-medium text-primary">Landing Page • "Watch Only on Zee5"</span>
          </div>
          <img 
            src={ideabaazFeatured} 
            alt="Ideabaaz landing page on laptop mockup showing Watch Only on Zee5 banner" 
            className="w-full h-auto object-cover"
          />
        </div>
      </section>

      {/* 02. THE PROBLEM (THE FRICTION) */}
      <section 
        ref={frictionAnim.ref} 
        id="friction" 
        className={`min-h-screen flex flex-col justify-start py-[15vh] transition-all duration-1000 ${frictionAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <div className="mb-8">
          <span className="text-xs uppercase tracking-[0.2em] text-red-400 font-medium">02. The Friction</span>
        </div>
        
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-8 leading-tight">
          {caseStudy.theFriction.headline}
        </h2>
        
        <p className="text-lg text-muted-foreground font-light leading-relaxed max-w-3xl mb-12">
          {caseStudy.theFriction.intro}
        </p>

        {/* Design Challenge Box */}
        <div className="bg-gradient-to-br from-red-500/10 to-red-600/5 border border-red-500/20 rounded-2xl p-8 mb-12 max-w-3xl">
          <div className="flex items-start gap-4">
            <Target className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
            <div>
              <p className="text-sm uppercase tracking-wider text-red-400 mb-3 font-medium">The Design Challenge</p>
              <p className="text-xl font-light leading-relaxed">
                {caseStudy.theFriction.designChallenge}
              </p>
            </div>
          </div>
        </div>

        {/* Three Masters */}
        <div className="grid md:grid-cols-3 gap-6">
          {caseStudy.theFriction.personas.map((persona, index) => (
            <div 
              key={persona.type}
              className="bg-muted/10 rounded-xl p-6 border border-border/20 hover:border-primary/30 transition-colors"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  index === 0 ? 'bg-blue-500/20 text-blue-400' :
                  index === 1 ? 'bg-green-500/20 text-green-400' :
                  'bg-amber-500/20 text-amber-400'
                }`}>
                  {index === 0 ? <Users className="w-5 h-5" /> :
                   index === 1 ? <TrendingUp className="w-5 h-5" /> :
                   <Award className="w-5 h-5" />}
                </div>
                <span className="font-medium">{persona.type}</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{persona.need}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 03. THE STRATEGY (THE FIX) */}
      <section 
        ref={strategyAnim.ref} 
        id="strategy" 
        className={`min-h-screen flex flex-col justify-start py-[15vh] transition-all duration-1000 ${strategyAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <div className="mb-8">
          <span className="text-xs uppercase tracking-[0.2em] text-primary font-medium">03. The Strategy</span>
        </div>
        
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-8 leading-tight">
          {caseStudy.theStrategy.headline}
        </h2>
        
        <p className="text-lg text-muted-foreground font-light leading-relaxed max-w-3xl mb-16">
          {caseStudy.theStrategy.intro}
        </p>

        {/* Strategy Approaches */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {caseStudy.theStrategy.approaches.map((approach, index) => (
            <div 
              key={approach.persona}
              className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8 border border-primary/20"
            >
              <div className="flex items-center gap-3 mb-4">
                <Lightbulb className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-primary">{approach.persona}</span>
              </div>
              <p className="text-base leading-relaxed font-light">
                {approach.approach}
              </p>
            </div>
          ))}
        </div>

        {/* Flowchart placeholder - User Journey */}
        <div className="bg-muted/10 rounded-2xl p-8 border border-border/20">
          <p className="text-sm uppercase tracking-wider text-muted-foreground mb-4 font-medium">User Journey</p>
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <span className="bg-background px-4 py-2 rounded-full border border-border/30">Pre-Register</span>
            <span className="text-muted-foreground">→</span>
            <span className="bg-background px-4 py-2 rounded-full border border-border/30">Profile Setup</span>
            <span className="text-muted-foreground">→</span>
            <span className="bg-background px-4 py-2 rounded-full border border-border/30">Discovery</span>
            <span className="text-muted-foreground">→</span>
            <span className="bg-primary/20 px-4 py-2 rounded-full border border-primary/30 text-primary">Dashboard Access</span>
          </div>
        </div>
      </section>

      {/* 04. THE SOLUTION: THE "COCKPIT" DASHBOARD */}
      <section 
        ref={cockpitAnim.ref} 
        id="cockpit" 
        className={`min-h-screen flex flex-col justify-start py-[15vh] transition-all duration-1000 ${cockpitAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <div className="mb-8">
          <span className="text-xs uppercase tracking-[0.2em] text-primary font-medium">04. The Solution</span>
        </div>
        
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-4 leading-tight">
          The "Cockpit" Dashboard
        </h2>
        
        <p className="text-lg text-muted-foreground font-light leading-relaxed max-w-3xl mb-12">
          {caseStudy.theCockpit.intro}
        </p>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {caseStudy.theCockpit.features.map((feature) => (
            <div 
              key={feature.title}
              className="bg-muted/10 rounded-2xl p-8 border border-border/20"
            >
              <h3 className="text-xl font-medium mb-4">{feature.title}</h3>
              <p className="text-base text-muted-foreground leading-relaxed font-light">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Key Design Move */}
        <div className="bg-gradient-to-r from-orange-500/10 via-orange-400/5 to-transparent rounded-2xl p-8 border-l-4 border-orange-500 mb-12">
          <p className="text-sm uppercase tracking-wider text-orange-400 mb-3 font-medium flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> Key Design Move
          </p>
          <p className="text-base leading-relaxed font-light">
            {caseStudy.theCockpit.keyDesignMove}
          </p>
        </div>

        {/* Dashboard Screenshot */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-background/20">
          <div className="absolute top-4 left-4 z-10 bg-background/80 backdrop-blur-sm px-4 py-2 rounded-full">
            <span className="text-xs font-medium text-primary">Dashboard • "Explore Services" & "Upcoming Tasks"</span>
          </div>
          <img 
            src={ideabaazDashboard} 
            alt="Ideabaaz Dashboard showing Explore Services and Upcoming Tasks widgets" 
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Additional Dashboard Screens */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <div className="relative rounded-xl overflow-hidden border border-border/20">
            <div className="absolute top-3 left-3 z-10 bg-blue-500/80 backdrop-blur-sm px-3 py-1 rounded-full">
              <span className="text-xs font-medium text-white">Founders</span>
            </div>
            <img src={ideabaazDocuments} alt="Document Management" className="w-full h-auto" />
            <div className="p-4 bg-background/80 backdrop-blur-sm">
              <h4 className="font-medium text-sm">Document Management</h4>
              <p className="text-xs text-muted-foreground">Pitch decks, financials, legal documents</p>
            </div>
          </div>
          <div className="relative rounded-xl overflow-hidden border border-border/20">
            <div className="absolute top-3 left-3 z-10 bg-blue-500/80 backdrop-blur-sm px-3 py-1 rounded-full">
              <span className="text-xs font-medium text-white">Founders</span>
            </div>
            <img src={ideabaazStartupTeam} alt="Team & Vision Profile" className="w-full h-auto" />
            <div className="p-4 bg-background/80 backdrop-blur-sm">
              <h4 className="font-medium text-sm">Team & Vision Profile</h4>
              <p className="text-xs text-muted-foreground">Comprehensive startup showcasing</p>
            </div>
          </div>
        </div>
      </section>

      {/* 05. FEATURE SPOTLIGHT: THE "TITAN" CONNECTION */}
      <section 
        ref={titansAnim.ref} 
        id="titans" 
        className={`min-h-[80vh] flex flex-col justify-start py-[15vh] transition-all duration-1000 ${titansAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <div className="mb-8">
          <span className="text-xs uppercase tracking-[0.2em] text-purple-400 font-medium">05. Feature Spotlight</span>
        </div>
        
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-8 leading-tight">
          {caseStudy.theTitans.headline}
        </h2>
        
        <p className="text-lg text-muted-foreground font-light leading-relaxed max-w-3xl mb-12">
          {caseStudy.theTitans.intro}
        </p>

        {/* Mentor Profile Screenshot */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-background/20 max-w-4xl">
          <div className="absolute top-4 left-4 z-10 bg-purple-500/80 backdrop-blur-sm px-4 py-2 rounded-full">
            <span className="text-xs font-medium text-white">Mentors • "Titans" Profile Cards</span>
          </div>
          <img 
            src={ideabaazMentorProfile} 
            alt="Ideabaaz Mentor Profile showing celebrity investor cards" 
            className="w-full h-auto object-cover"
          />
        </div>
      </section>

      {/* 06. THE IMPACT (THE RECEIPT) */}
      <section 
        ref={impactAnim.ref} 
        id="impact" 
        className={`min-h-screen flex flex-col justify-start py-[15vh] transition-all duration-1000 ${impactAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <div className="mb-8">
          <span className="text-xs uppercase tracking-[0.2em] text-green-400 font-medium">06. The Impact</span>
        </div>
        
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-12 leading-tight">
          {caseStudy.theImpact.headline}
        </h2>

        {/* Outcomes */}
        <div className="space-y-6 mb-16">
          {caseStudy.theImpact.outcomes.map((outcome, index) => (
            <div 
              key={index}
              className="flex items-start gap-4 bg-gradient-to-r from-green-500/10 to-transparent rounded-xl p-6 border-l-4 border-green-500"
            >
              <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0" />
              <p className="text-base leading-relaxed font-light">{outcome}</p>
            </div>
          ))}
        </div>

        {/* Prototype CTA */}
        <div className="text-center py-12 border-t border-border/20">
          <p className="text-muted-foreground mb-6">Experience the full platform design</p>
          <button 
            onClick={() => setPrototypeOpen(true)}
            className="inline-flex items-center gap-3 bg-primary/10 hover:bg-primary/20 border border-primary/20 px-8 py-4 rounded-full transition-colors"
          >
            <Figma className="w-5 h-5 text-primary" />
            <span className="font-medium">Explore Interactive Prototype</span>
            <Play className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        {/* Mobile/Lifestyle Shot */}
        <div className="relative rounded-2xl overflow-hidden shadow-xl shadow-background/20 max-w-2xl mx-auto">
          <img 
            src={ideabaazStartupPitch} 
            alt="Ideabaaz Pitch Details screen" 
            className="w-full h-auto object-cover"
          />
        </div>
      </section>

      {/* Prototype Modal */}
      <Dialog open={prototypeOpen} onOpenChange={setPrototypeOpen}>
        <DialogContent className="max-w-[95vw] w-full h-[90vh] p-0 bg-background border-border/50 overflow-hidden flex flex-col">
          <DialogHeader className="px-4 sm:px-6 py-4 border-b border-border/50 bg-background flex-shrink-0">
            <DialogTitle className="text-foreground font-medium text-lg">
              Ideabaaz — Interactive Prototype
            </DialogTitle>
            <DialogDescription className="text-muted-foreground text-sm">
              Explore the full platform experience
            </DialogDescription>
          </DialogHeader>
          <div className="flex-1 w-full bg-muted/20">
            <iframe
              src="https://embed.figma.com/proto/Ow4QpYUgooZfFeaK3PqNzi/UI?node-id=559-14557&viewport=316%2C209%2C0.16&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=559%3A14557&embed-host=share"
              className="w-full h-full border-0"
              allowFullScreen
              title="Ideabaaz Interactive Prototype"
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
