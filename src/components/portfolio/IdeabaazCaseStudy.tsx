import React, { useState } from "react";
import { Figma, Play } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { projectsData } from "@/data/projectData";
import { CaseStudyHeader, ChapterMarker, LabelRow, Divider, ScreenshotBlock, NextProjectCard } from "./CaseStudyKit";

import ideabaazFeatured from "@/assets/ideabaaz-featured.png";
import ideabaazDashboard from "@/assets/ideabaaz-dashboard.png";
import ideabaazStartupTeam from "@/assets/ideabaaz-startup-team.png";
import ideabaazMentorProfile from "@/assets/ideabaaz-mentor-profile.png";
import ideabaazDocuments from "@/assets/ideabaaz-documents.png";
import ideabaazStartupPitch from "@/assets/ideabaaz-startup-pitch.png";

interface IdeabaazCaseStudyProps {
  project: typeof projectsData["ideabaaz"];
}

export const IdeabaazCaseStudy: React.FC<IdeabaazCaseStudyProps> = ({ project }) => {
  const [prototypeOpen, setPrototypeOpen] = useState(false);
  const caseStudy = project.caseStudy;

  if (!caseStudy) return null;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <CaseStudyHeader />

      <main className="max-w-5xl mx-auto px-6 md:px-8 py-[12vh]">
        {/* HERO */}
        <section>
          <p className="text-xs uppercase tracking-[0.18em] text-primary font-medium mb-6">Case study</p>
          <h1 className="font-figtree text-6xl md:text-7xl font-light mb-3">{project.title}</h1>
          <p className="text-lg md:text-xl text-muted-foreground font-light mb-6">Startup Ecosystem Platform</p>
          <p className="text-base md:text-lg text-muted-foreground font-light leading-relaxed max-w-xl mb-10">
            {project.subtitle}
          </p>

          <div className="bg-muted/10 border border-border/20 p-3 md:p-5 mb-10">
            <img
              src={ideabaazFeatured}
              alt="Ideabaaz landing page on laptop mockup showing Watch Only on Zee5 banner"
              className="w-full h-auto"
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.15em] text-primary font-medium mb-2">Role</p>
              <p className="text-sm font-light leading-relaxed">{project.role.title}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.15em] text-primary font-medium mb-2">Duration</p>
              <p className="text-sm font-light leading-relaxed">{project.role.duration}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.15em] text-primary font-medium mb-2">Team</p>
              <p className="text-sm font-light leading-relaxed">{project.role.team}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.15em] text-primary font-medium mb-2">Tools</p>
              <p className="text-sm font-light leading-relaxed">{project.role.tools.join(" • ")}</p>
            </div>
          </div>
        </section>

        <Divider />

        {/* OVERVIEW / MY ROLE / STATUS */}
        <section>
          <LabelRow label="Overview">{caseStudy.theContext.intro}</LabelRow>
          <Divider />
          <LabelRow label="My Role">
            Product Designer & Interaction Designer. I led platform strategy and UI across four distinct
            audiences — founders, investors, mentors, and partners — from ecosystem mapping through high-fidelity
            production, working alongside Turbostart, House of Cheer, and the ZeeTV/Zee5 team.
          </LabelRow>
          <Divider />
          <LabelRow label="Status">
            Live and ongoing since Q1 2024. Unlike a pre-launch concept, this platform carries real traffic tied to
            a national TV audience — new seasons and partners continue to be added on the same architecture.
          </LabelRow>
        </section>

        <Divider />

        {/* CHAPTER: DISCOVERY */}
        <section className="pt-10">
          <ChapterMarker eyebrow="Discovery" headline={caseStudy.theFriction.headline} />
          <LabelRow label="What everyone was dealing with">{caseStudy.theFriction.intro}</LabelRow>
          <LabelRow label="What I was actually designing for">
            {caseStudy.theFriction.designChallenge} Not a set of separate pages — a trust and clarity problem across
            three completely different audiences on one pane of glass.
          </LabelRow>
        </section>

        <Divider />

        {/* CHAPTER: DESIGNING THE SYSTEM */}
        <section className="pt-10">
          <ChapterMarker eyebrow="Designing the system" headline={caseStudy.theCockpit.headline} />
          <LabelRow label="For founders">{caseStudy.theStrategy.approaches[0]?.approach}</LabelRow>
          <LabelRow label="For investors">{caseStudy.theStrategy.approaches[1]?.approach}</LabelRow>
          <LabelRow label={caseStudy.theCockpit.features[0]?.title}>
            {caseStudy.theCockpit.features[0]?.description}
          </LabelRow>
          <LabelRow label={caseStudy.theCockpit.features[1]?.title}>
            {caseStudy.theCockpit.features[1]?.description}
          </LabelRow>
          <LabelRow label="Visual language">{caseStudy.theCockpit.keyDesignMove}</LabelRow>
          <LabelRow label="Meet the Titans">{caseStudy.theTitans.intro}</LabelRow>
          <LabelRow label="User journey">
            Pre-register → profile setup → discovery → dashboard access — the same funnel for every persona, just
            with different content behind each step.
          </LabelRow>

          <ScreenshotBlock
            src={ideabaazDocuments}
            alt="Ideabaaz Dashboard showing Explore Services and Investors"
            caption="Founder dashboard — the command center"
            explanation={caseStudy.theCockpit.intro}
          />

          <ScreenshotBlock
            src={ideabaazStartupTeam}
            alt="Ideabaaz Team & Vision Profile showing startup team and vision details"
            caption="Team & vision profile — the founder's full story in one view"
          />

          <ScreenshotBlock
            src={ideabaazMentorProfile}
            alt="Ideabaaz Mentor Profile showing celebrity investor cards"
            caption='Mentors — "Titans" profile cards'
          />
        </section>

        <Divider />

        {/* CHAPTER: WHERE IT STANDS */}
        <section className="pt-10">
          <ChapterMarker eyebrow="Where it stands" headline={caseStudy.theImpact.headline} />
          <p className="text-base text-muted-foreground font-light leading-relaxed mb-2">
            Unlike Vybe, this one has shipped and carries real audience traffic — so what follows is what the
            platform has actually delivered, not just what it was designed to do.
          </p>
          <Divider />
          <LabelRow label="Scale" dot>
            {caseStudy.theImpact.outcomes[0]}
          </LabelRow>
          <LabelRow label="Unified ecosystem" dot>
            {caseStudy.theImpact.outcomes[1]}
          </LabelRow>
          <LabelRow label="Scalable architecture" dot>
            {caseStudy.theImpact.outcomes[2]}
          </LabelRow>
        </section>

        <Divider />

        {/* CHAPTER: REFLECTION */}
        <section className="pt-10">
          <ChapterMarker eyebrow="Reflection" headline="Two things I'd carry forward" />
          <LabelRow label="Trust must be designed, not assumed">
            Marketplace ecosystems succeed only when trust is designed into the product, not assumed to exist
            between strangers meeting through a TV platform.
          </LabelRow>
          <LabelRow label="Multi-role platforms punish complexity">
            Founders, investors, mentors, and partners each needed a completely different lens on the same system.
            Ruthless prioritization — saying no to edge cases — was the only way to keep four personas legible in
            one product.
          </LabelRow>
        </section>

        <Divider />

        {/* SELECTED SCREENS */}
        <section className="pt-10">
          <ChapterMarker eyebrow="Selected screens" headline="A look at the delivered screens" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { src: ideabaazDashboard, alt: "Startup Documents upload screen", caption: "Document Management" },
              { src: ideabaazStartupPitch, alt: "Pitch Details screen", caption: "Pitch Details" },
            ].map((screen) => (
              <div key={screen.caption}>
                <div className="bg-muted/10 border border-border/20 p-3 md:p-5">
                  <img src={screen.src} alt={screen.alt} className="w-full h-auto" />
                </div>
                <p className="text-sm font-medium text-primary mt-3">{screen.caption}</p>
              </div>
            ))}
          </div>
        </section>

        <Divider />

        {/* CLOSING */}
        <section className="pt-10 pb-20">
          <h2 className="font-figtree text-3xl md:text-4xl font-light mb-4">Thanks for reading.</h2>
          <p className="text-base text-muted-foreground font-light leading-relaxed mb-8 max-w-lg">
            Want to see the other project, or the flows in more depth? Happy to walk through it.
          </p>
          <button
            onClick={() => setPrototypeOpen(true)}
            className="inline-flex items-center gap-3 bg-foreground text-background px-6 py-3 rounded-full hover:bg-foreground/90 transition-colors"
          >
            <Figma className="w-4 h-4" />
            Explore the interactive prototype
            <Play className="w-4 h-4" />
          </button>
        </section>

        <Divider />

        <NextProjectCard currentId={project.id} />
      </main>

      {/* Prototype Modal */}
      <Dialog open={prototypeOpen} onOpenChange={setPrototypeOpen}>
        <DialogContent className="max-w-[95vw] w-full h-[90vh] p-0 bg-background border-border/50 overflow-hidden flex flex-col">
          <DialogHeader className="px-4 sm:px-6 py-4 border-b border-border/50 bg-background flex-shrink-0">
            <DialogTitle className="text-foreground font-medium text-lg">Ideabaaz — Interactive Prototype</DialogTitle>
            <DialogDescription className="text-muted-foreground text-sm">Explore the full platform experience</DialogDescription>
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
    </div>
  );
};
