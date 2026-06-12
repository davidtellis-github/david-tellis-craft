import React from "react";
import { CheckCircle2 } from "lucide-react";
import { projectsData } from "@/data/projectData";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

import futurcraftFeatured from "@/assets/futurcraft-featured.png";
import futurcraftSignup from "@/assets/ui-futurecraft-signup.png";
import futurcraftBrandforge from "@/assets/futurcraft-brandforge.png";
import futurcraftContentCompare from "@/assets/futurcraft-content-compare.png";
import futurcraftDashboardDark from "@/assets/futurcraft-dashboard-dark.png";
import futurcraftBlogSeo from "@/assets/futurcraft-blog-seo.jpg";
import futurcraftBlogList from "@/assets/futurcraft-blog-list.png";
import futurcraftSocialPreview from "@/assets/futurcraft-social-preview.jpg";

interface FuturcraftCaseStudyProps {
  project: typeof projectsData["futurcraft-ai"];
}

export const FuturcraftCaseStudy: React.FC<FuturcraftCaseStudyProps> = ({ project }) => {
  const heroAnim = useScrollAnimation();
  const metaAnim = useScrollAnimation();
  const metricsAnim = useScrollAnimation();
  const problemAnim = useScrollAnimation();
  const screen1Anim = useScrollAnimation();
  const screen2Anim = useScrollAnimation();
  const screen3Anim = useScrollAnimation();
  const processAnim = useScrollAnimation();
  const decisionsAnim = useScrollAnimation();
  const outcomesAnim = useScrollAnimation();
  const learnedAnim = useScrollAnimation();
  const screensAnim = useScrollAnimation();
  const tagsAnim = useScrollAnimation();

  return (
    <>
      {/* SECTION 1 — Eyebrow + Title + Subtitle */}
      <section
        ref={heroAnim.ref}
        id="hero"
        className={`py-[10vh] transition-all duration-1000 ${heroAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium">
          Case study · Q4 2024 – Q2 2025
        </span>
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tight leading-[1.1] mt-6 mb-6">
          {project.title}
        </h1>
        <p className="text-xl md:text-2xl font-light leading-relaxed max-w-3xl text-muted-foreground">
          Designing an AI creative platform that keeps content creators' brand identity intact — no matter how fast the AI generates.
        </p>
        <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-background/20 mt-12">
          <img
            src={futurcraftFeatured}
            alt="Futurcraft AI platform overview"
            className="w-full h-auto object-cover"
          />
        </div>
      </section>

      {/* SECTION 2 — Meta strip */}
      <section
        ref={metaAnim.ref}
        id="meta"
        className={`py-8 border-t border-b border-border/20 transition-all duration-1000 ${metaAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground mb-1 font-medium">Role</p>
            <p className="text-sm font-light">Lead product designer</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground mb-1 font-medium">Duration</p>
            <p className="text-sm font-light">{project.role.duration}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground mb-1 font-medium">Team</p>
            <p className="text-sm font-light">{project.role.team}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground mb-1 font-medium">Tools</p>
            <p className="text-sm font-light">{project.role.tools.join(" • ")}</p>
          </div>
        </div>
      </section>

      {/* SECTION 3 — Metrics row */}
      <section
        ref={metricsAnim.ref}
        id="metrics"
        className={`py-[10vh] transition-all duration-1000 ${metricsAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: "300+", label: "waitlist signups in first 2 weeks" },
            { value: "~70%", label: "reduction in content turnaround time" },
            { value: "0 → 1", label: "full platform designed from scratch" },
            { value: "MVP", label: "investor prototype delivered on time" },
          ].map((m, i) => (
            <div key={i} className="bg-muted/10 rounded-2xl p-8 border border-border/20">
              <p className="text-4xl md:text-5xl font-light mb-3 text-primary">{m.value}</p>
              <p className="text-sm text-muted-foreground leading-relaxed font-light">{m.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4 — The problem */}
      <section
        ref={problemAnim.ref}
        id="problem"
        className={`py-[10vh] transition-all duration-1000 ${problemAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <span className="text-xs uppercase tracking-[0.2em] text-red-400 font-medium">The problem</span>
        <p className="text-lg font-light leading-relaxed max-w-3xl mt-8 mb-8">
          Content creators and social media teams spend the majority of their time not on creative work — but on
          repetitive production. More critically, AI tools that promised to solve this were making it worse: every
          AI-generated output looked like it could belong to any brand, or none.
        </p>
        <div className="border-l-4 border-primary/40 pl-6 py-2 bg-muted/10 rounded-r-xl mb-8 max-w-3xl">
          <p className="text-base font-light leading-relaxed text-muted-foreground">
            "Teams were spending more time correcting AI output for brand fit than they saved by using AI in the first
            place. The problem wasn't speed — it was trust and control."
          </p>
        </div>
        <p className="text-base font-light leading-relaxed max-w-3xl text-muted-foreground">
          My brief: design a platform where the AI understands the brand before it generates anything — and makes that
          visible to the user at every step.
        </p>
      </section>

      {/* SECTION 5 — Screen 1: Login */}
      <section
        ref={screen1Anim.ref}
        id="screen-login"
        className={`py-[10vh] transition-all duration-1000 ${screen1Anim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <span className="text-xs uppercase tracking-[0.2em] text-primary font-medium">01 — Onboarding: login</span>
        <p className="text-lg font-light leading-relaxed max-w-3xl mt-8 mb-12">
          The entry point needed to feel like the start of something considered — not just another SaaS tool. Clean,
          minimal, with the brand's identity as the centrepiece from the first screen.
        </p>
        <div className="rounded-2xl overflow-hidden border border-border/20">
          <img
            src={futurcraftSignup}
            alt="FutureCraft AI login screen — centred card layout with soft ambient background"
            className="w-full h-auto object-cover"
          />
          <div className="p-4 border-t border-border/20 bg-muted/5">
            <p className="text-sm font-medium mb-1">Login screen</p>
            <p className="text-sm text-muted-foreground font-light leading-relaxed">
              Centred card layout, soft ambient background. The FutureCraft AI wordmark is the first thing a user sees
              — establishing identity before credentials.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 6 — Screen 2: Brand DNA */}
      <section
        ref={screen2Anim.ref}
        id="screen-brand-dna"
        className={`py-[10vh] transition-all duration-1000 ${screen2Anim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <span className="text-xs uppercase tracking-[0.2em] text-primary font-medium">02 — Brand DNA: the core feature</span>
        <p className="text-lg font-light leading-relaxed max-w-3xl mt-8 mb-12">
          The biggest design challenge was making a brand's identity legible to an AI — and then legible back to the
          user. I designed the Brandforge system: a structured dashboard where users define their brand across six
          dimensions (mission, tone of voice, domain elements, brand attributes, taglines, target audience). Each
          dimension becomes a persistent AI reference — so every generation is constrained by real brand decisions, not
          defaults.
        </p>
        <div className="rounded-2xl overflow-hidden border border-border/20 mb-6">
          <img
            src={futurcraftBrandforge}
            alt="Futurcraft Brandforge dashboard — brand identity broken into six scannable cards"
            className="w-full h-auto object-cover"
          />
          <div className="p-4 border-t border-border/20 bg-muted/5">
            <p className="text-sm font-medium mb-1">Brandforge dashboard</p>
            <p className="text-sm text-muted-foreground font-light leading-relaxed">
              Brand identity broken into scannable cards. Each card expands on click — progressive disclosure keeps the
              overview clean while giving full depth on demand.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="bg-muted/10 rounded-xl p-5 border border-border/20">
            <p className="text-sm font-medium mb-2">Design decision: card grid</p>
            <p className="text-sm text-muted-foreground font-light leading-relaxed">
              Each brand dimension is its own card so users can update individual attributes without touching others.
              Isolated edits = safer iteration.
            </p>
          </div>
          <div className="bg-muted/10 rounded-xl p-5 border border-border/20">
            <p className="text-sm font-medium mb-2">Design decision: sidebar nav</p>
            <p className="text-sm text-muted-foreground font-light leading-relaxed">
              Content types are top-level nav items, not buried in dropdowns. The workflow is: define brand once,
              create everything else from it.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 7 — Screen 3: AI transparency */}
      <section
        ref={screen3Anim.ref}
        id="screen-ai-transparency"
        className={`py-[10vh] transition-all duration-1000 ${screen3Anim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <span className="text-xs uppercase tracking-[0.2em] text-primary font-medium">03 — AI transparency: old vs new</span>
        <p className="text-lg font-light leading-relaxed max-w-3xl mt-8 mb-12">
          The hardest UX problem on the project: making users feel like authors, not passengers. When the AI rewrites
          content, users need to see exactly what changed and why — before accepting anything. I designed a
          side-by-side review modal that surfaces every AI-proposed change as a numbered decision. Users step through
          each change individually, with old content on the left and new on the right. Nothing is applied until they
          explicitly approve.
        </p>
        <div className="rounded-2xl overflow-hidden border border-border/20 mb-6">
          <img
            src={futurcraftContentCompare}
            alt="Futurcraft AI content review modal — old vs new side-by-side with numbered decisions"
            className="w-full h-auto object-cover"
          />
          <div className="p-4 border-t border-border/20 bg-muted/5">
            <p className="text-sm font-medium mb-1">AI content review modal — old vs new</p>
            <p className="text-sm text-muted-foreground font-light leading-relaxed">
              4 changes surfaced individually. Users step through each one: accept, reject, or edit before anything is
              applied. This was the highest-rated feature in beta feedback.
            </p>
          </div>
        </div>
        <div className="border-l-4 border-green-500/50 pl-6 py-2 bg-green-500/5 rounded-r-xl max-w-3xl">
          <p className="text-base font-light leading-relaxed text-muted-foreground">
            This pattern — showing the delta, not just the result — directly addressed the trust gap. Users reported
            feeling in control of the AI for the first time, compared to other tools where outputs felt like guesses.
          </p>
        </div>
      </section>

      {/* SECTION 8 — Process steps */}
      <section
        ref={processAnim.ref}
        id="process"
        className={`py-[10vh] transition-all duration-1000 ${processAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <h2 className="text-3xl md:text-4xl font-light mb-12">Design process</h2>
        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
          {[
            { step: "Discovery", description: "AI capability research & user needs analysis" },
            { step: "Prototyping", description: "AI interaction patterns & interface design" },
            { step: "Testing", description: "AI model training & user experience validation" },
            { step: "Integration", description: "Platform development & API integration" },
            { step: "Launch", description: "Beta release & performance optimisation" },
          ].map((phase, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium text-primary">
                {String(index + 1).padStart(2, "0")}
              </div>
              <div>
                <h4 className="text-base font-medium mb-2">{phase.step}</h4>
                <p className="text-sm text-muted-foreground font-light leading-[1.7]">{phase.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 9 — Key design decisions */}
      <section
        ref={decisionsAnim.ref}
        id="design-decisions"
        className={`py-[10vh] transition-all duration-1000 ${decisionsAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <h2 className="text-3xl md:text-4xl font-light mb-12">Key design decisions</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Brand DNA first",
              body: "Users define the brand before any AI generation. The AI is a follower, not a guesser.",
            },
            {
              title: "Visible AI reasoning",
              body: "Every change is surfaced as a numbered decision. Nothing is applied without explicit user approval.",
            },
            {
              title: "Progressive disclosure",
              body: "Overview cards expand on demand. Power controls are always one click away, never in the way.",
            },
          ].map((d, i) => (
            <div key={i} className="bg-muted/10 rounded-2xl p-6 border border-border/20">
              <h3 className="text-base font-medium mb-3">{d.title}</h3>
              <p className="text-sm text-muted-foreground leading-[1.8] font-light">{d.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 10 — Outcomes */}
      <section
        ref={outcomesAnim.ref}
        id="outcomes"
        className={`py-[10vh] transition-all duration-1000 ${outcomesAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <h2 className="text-3xl md:text-4xl font-light mb-12">Outcomes</h2>
        <div className="border-l-4 border-green-500/50 pl-6 py-3 bg-green-500/5 rounded-r-xl mb-10 max-w-3xl">
          <p className="text-base font-medium leading-relaxed">
            300+ waitlist signups in the first 2 weeks after the beta landing page launched — no paid acquisition.
          </p>
        </div>
        <ul className="space-y-3 max-w-3xl">
          {[
            "Approximately 70% reduction in content turnaround time reported by beta users vs their previous manual workflows. (Estimated; to be validated post-launch.)",
            "Investor prototype delivered on schedule and used in fundraising conversations.",
            "Design system built and handed off — full component library enabling engineering to build new screens without returning to design.",
            "The old-vs-new review modal became the most-cited feature in early beta feedback, directly addressing the core trust problem.",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              <p className="text-base text-muted-foreground font-light leading-relaxed">{item}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* SECTION 11 — What I learned */}
      <section
        ref={learnedAnim.ref}
        id="learned"
        className={`py-[10vh] transition-all duration-1000 ${learnedAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <h2 className="text-3xl md:text-4xl font-light mb-10">What I learned</h2>
        <div className="space-y-6 max-w-3xl">
          <p className="text-lg font-light leading-relaxed text-muted-foreground">
            Designing AI transparency is harder than designing AI capability. Users didn't need the AI to be smarter —
            they needed to feel like they were still the author. Every design decision that gave users visible control
            over AI behaviour increased trust and reduced the correction loop.
          </p>
          <p className="text-lg font-light leading-relaxed text-muted-foreground">
            Working directly with the AI engineer from day one — not after handoff — meant the interface was built
            around what the model could actually do. That constraint produced better, more honest UX than any amount of
            blue-sky ideation.
          </p>
        </div>
      </section>

      {/* SECTION 12 — Selected screens */}
      <section
        ref={screensAnim.ref}
        id="selected-screens"
        className={`py-[10vh] transition-all duration-1000 ${screensAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <h2 className="text-3xl md:text-4xl font-light mb-4">Selected screens</h2>
        <p className="text-base text-muted-foreground font-light leading-relaxed mb-12 max-w-2xl">
          A look at the final product — key screens from the delivered platform.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { src: futurcraftDashboardDark, alt: "Futurcraft AI — main creation dashboard" },
            { src: futurcraftBlogSeo, alt: "Futurcraft AI — blog editor with SEO score panel" },
            { src: futurcraftBlogList, alt: "Futurcraft AI — blog list with date and filter controls" },
            { src: futurcraftSocialPreview, alt: "Futurcraft AI — social post content view" },
          ].map((screen, i) => (
            <div key={i} className="rounded-2xl overflow-hidden border border-border/20 shadow-lg shadow-background/20 group">
              <img
                src={screen.src}
                alt={screen.alt}
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 13 — Tags */}
      <section
        ref={tagsAnim.ref}
        id="tags"
        className={`py-[10vh] border-t border-border/20 transition-all duration-1000 ${tagsAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <div className="flex flex-wrap gap-3">
          {[
            "AI/ML product design",
            "Brand systems",
            "0→1 product",
            "Content workflows",
            "Design systems",
            "Progressive disclosure",
            "Investor prototype",
            "Cross-functional",
          ].map((tag) => (
            <span
              key={tag}
              className="inline-flex px-4 py-1.5 rounded-full bg-muted/20 border border-border/20 text-sm text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      </section>
    </>
  );
};
