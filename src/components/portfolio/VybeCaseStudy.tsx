import React from "react";
import { CheckCircle2, Download, Circle, HelpCircle } from "lucide-react";
import { projectsData } from "@/data/projectData";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

import vybePortfolioOverview from "@/assets/vybe-portfolio-overview.png";
import vybeHabuReport from "@/assets/vybe-habu-report.png";
import vybePropertyList from "@/assets/vybe-property-list.png";
import vybeNewPropertyLocation from "@/assets/vybe-new-property-location.png";
import vybeNewPropertyDocuments from "@/assets/vybe-new-property-documents.png";
import vybeExecutionTimeline from "@/assets/vybe-execution-timeline.png";

interface VybeCaseStudyProps {
  project: typeof projectsData["vybe"];
}

export const VybeCaseStudy: React.FC<VybeCaseStudyProps> = ({ project }) => {
  const heroAnim = useScrollAnimation();
  const metaAnim = useScrollAnimation();
  const challengeAnim = useScrollAnimation();
  const featuresAnim = useScrollAnimation();
  const processAnim = useScrollAnimation();
  const decisionsAnim = useScrollAnimation();
  const currentStateAnim = useScrollAnimation();
  const learnedAnim = useScrollAnimation();
  const downloadAnim = useScrollAnimation();
  const screensAnim = useScrollAnimation();
  const tagsAnim = useScrollAnimation();

  return (
    <>
      {/* SECTION — Overview: Eyebrow + Title + Subtitle */}
      <section
        ref={heroAnim.ref}
        id="overview"
        className={`py-[10vh] transition-all duration-1000 ${heroAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium">
          Pre-Real Estate · Q1 2026 – Q2 2026
        </span>
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tight leading-[1.1] mt-6 mb-6">
          {project.title}
        </h1>
        <p className="text-xl md:text-2xl font-light leading-relaxed max-w-3xl text-muted-foreground">
          {project.subtitle}
        </p>
        <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-background/20 mt-12">
          <img
            src={vybePortfolioOverview}
            alt="Vybe admin dashboard overview"
            className="w-full h-auto object-cover"
          />
        </div>
      </section>

      {/* SECTION — Role: Meta strip */}
      <section
        ref={metaAnim.ref}
        id="role"
        className={`py-8 border-t border-b border-border/20 transition-all duration-1000 ${metaAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground mb-1 font-medium">Role</p>
            <p className="text-sm font-light">{project.role.title}</p>
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

      {/* SECTION — Challenge & Solution */}
      <section
        ref={challengeAnim.ref}
        id="challenge"
        className={`py-[10vh] transition-all duration-1000 ${challengeAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <span className="text-xs uppercase tracking-[0.2em] text-red-400 font-medium">The problem</span>
        <p className="text-lg font-light leading-relaxed max-w-3xl mt-8 mb-8">
          {project.context.problem}
        </p>
        <p className="text-base font-light leading-relaxed max-w-3xl text-muted-foreground">
          My brief: {project.context.objective}
        </p>
      </section>

      {/* SECTION — Feature Highlights (condensed, no numbering) */}
      <section
        ref={featuresAnim.ref}
        id="feature-highlights"
        className={`py-[10vh] transition-all duration-1000 ${featuresAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <h2 className="text-3xl md:text-4xl font-light mb-4">Feature Highlights</h2>
        <p className="text-base text-muted-foreground font-light leading-relaxed mb-16 max-w-2xl">
          Three capabilities that carry the product's core promise: legibility first, execution second.
        </p>

        <div className="space-y-16">
          {/* Property intake & mapping */}
          <div>
            <h3 className="text-xl font-medium mb-3">Property intake & mapping</h3>
            <p className="text-base text-muted-foreground leading-[1.8] font-light max-w-3xl mb-6">
              Address entry pairs a text field with an interactive map pin and optional manual lat/long, so users
              aren't forced to be precise typists.
            </p>
            <div className="rounded-2xl overflow-hidden border border-border/20">
              <img
                src={vybeNewPropertyLocation}
                alt="New Property Case — Location step with address field and interactive map pin"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* HABU strategy engine */}
          <div>
            <h3 className="text-xl font-medium mb-3">HABU strategy engine</h3>
            <p className="text-base text-muted-foreground leading-[1.8] font-light max-w-3xl mb-6">
              The core differentiator: AI-ranked development strategies shown as scannable comparison cards — ROI,
              capital required, timeline, risk level — with full analysis one click away via "View Details," not a
              dense report dump.
            </p>
            <div className="rounded-2xl overflow-hidden border border-border/20">
              <img
                src={vybeHabuReport}
                alt="HABU Report — ranked strategy comparison cards showing ROI, capital, timeline, and risk"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* Portfolio & execution tracking */}
          <div>
            <h3 className="text-xl font-medium mb-3">Portfolio & execution tracking</h3>
            <p className="text-base text-muted-foreground leading-[1.8] font-light max-w-3xl mb-6">
              Every property carries a visible status (Analysing, HABU Report Ready, In Execution) and, once in
              execution, a named chain of custody — project manager, architect, legal counsel, contractor — so
              nothing is a black box.
            </p>
            <div className="rounded-2xl overflow-hidden border border-border/20">
              <img
                src={vybeExecutionTimeline}
                alt="Property execution timeline showing phase progress and named chain of custody"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION — How I Worked */}
      <section
        ref={processAnim.ref}
        id="how-i-worked"
        className={`py-[10vh] transition-all duration-1000 ${processAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <h2 className="text-3xl md:text-4xl font-light mb-12">How I Worked</h2>
        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
          {project.process.map((phase, index) => (
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

      {/* SECTION — Key design decisions */}
      <section
        ref={decisionsAnim.ref}
        id="design-decisions"
        className={`py-[10vh] transition-all duration-1000 ${decisionsAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <h2 className="text-3xl md:text-4xl font-light mb-12">Key design decisions</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Progressive disclosure in the HABU report",
              body: "Ranked strategy cards stay scannable; full analysis is one click away via \"View Details,\" never forced on the user upfront.",
            },
            {
              title: "Map-first location capture",
              body: "A text field paired with an interactive map pin means users aren't forced to be precise typists to identify a plot.",
            },
            {
              title: "Status-driven property list",
              body: "Every property shows a plain-language status — Analysing, HABU Report Ready, In Execution — so portfolio state is legible at a glance.",
            },
            {
              title: "Visible chain of custody",
              body: "Once a property enters execution, the named project manager, architect, legal counsel, and contractor are always on screen. Nothing is a black box.",
            },
          ].map((d, i) => (
            <div key={i} className="bg-muted/10 rounded-2xl p-6 border border-border/20">
              <h3 className="text-base font-medium mb-3">{d.title}</h3>
              <p className="text-sm text-muted-foreground leading-[1.8] font-light">{d.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION — Current State (renamed from Outcomes; pre-launch, no shipped metrics) */}
      <section
        ref={currentStateAnim.ref}
        id="current-state"
        className={`py-[10vh] transition-all duration-1000 ${currentStateAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <h2 className="text-3xl md:text-4xl font-light mb-4">Current State</h2>
        <p className="text-base text-muted-foreground font-light leading-relaxed mb-12 max-w-2xl">
          Vybe is pre-launch, so this isn't an outcomes list — it's an honest read on where the design stands.
        </p>

        <div className="grid md:grid-cols-2 gap-10 mb-10">
          <div>
            <p className="text-xs uppercase tracking-[0.15em] text-green-400 mb-4 font-medium">
              Designed &amp; handed off
            </p>
            <ul className="space-y-3">
              {[
                "Property intake and map-first location capture flow",
                "HABU strategy engine — comparison cards and detail view",
                "Property list with status-driven states",
                "Execution chain of custody view",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground font-light leading-relaxed">{item}</p>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.15em] text-amber-400 mb-4 font-medium">In progress</p>
            <ul className="space-y-3">
              {[
                "Onboarding & KYC flow refinement",
                "Document auto-fill accuracy tuning against real registry documents",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Circle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground font-light leading-relaxed">{item}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-l-4 border-primary/40 pl-6 py-3 bg-muted/10 rounded-r-xl max-w-3xl">
          <div className="flex items-start gap-3">
            <HelpCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground mb-2 font-medium">
                Open product question
              </p>
              <p className="text-base font-light leading-relaxed text-muted-foreground">
                How much of the execution handoff should stay inside Vybe versus route investors to partners' own
                systems once a chain of custody is assigned — still unresolved.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION — What I learned (left empty, for author to fill) */}
      <section
        ref={learnedAnim.ref}
        id="learned"
        className={`py-[10vh] transition-all duration-1000 ${learnedAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <h2 className="text-3xl md:text-4xl font-light mb-10">What I learned</h2>
        <p className="text-base text-muted-foreground font-light leading-relaxed max-w-3xl italic">
          — reflection pending —
        </p>
      </section>

      {/* SECTION — Download CTA (immediately before Selected Screens) */}
      <section
        ref={downloadAnim.ref}
        id="download"
        className={`py-[6vh] transition-all duration-1000 ${downloadAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <div className="bg-muted/10 border border-border/20 rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <p className="text-lg font-light">Want the full breakdown? Download the one-page PPT.</p>
          <a
            href="/vybe-case-study.pptx"
            download
            className="inline-flex items-center gap-2 bg-foreground text-background px-6 py-3 rounded-full hover:bg-foreground/90 transition-colors flex-shrink-0"
          >
            <Download className="w-4 h-4" />
            Download the case study (PPT)
          </a>
        </div>
      </section>

      {/* SECTION — Selected screens */}
      <section
        ref={screensAnim.ref}
        id="screens"
        className={`py-[10vh] transition-all duration-1000 ${screensAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <h2 className="text-3xl md:text-4xl font-light mb-4">Selected screens</h2>
        <p className="text-base text-muted-foreground font-light leading-relaxed mb-12 max-w-2xl">
          A look at the product — key screens from the design in progress.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl overflow-hidden border border-border/20 shadow-lg shadow-background/20 group">
            <img
              src={vybePortfolioOverview}
              alt="Vybe — portfolio overview dashboard"
              className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </div>
          <div className="rounded-2xl overflow-hidden border border-border/20 shadow-lg shadow-background/20 group">
            <img
              src={vybePropertyList}
              alt="Vybe — property list with status-driven states"
              className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </div>
          <div className="rounded-2xl overflow-hidden border border-border/20 shadow-lg shadow-background/20 group">
            <img
              src={vybeHabuReport}
              alt="Vybe — HABU Report strategy comparison"
              className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </div>
          <div className="rounded-2xl overflow-hidden border border-border/20 shadow-lg shadow-background/20 group">
            <img
              src={vybeNewPropertyDocuments}
              alt="Vybe — New Property Case document upload step"
              className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </div>
        </div>
      </section>

      {/* SECTION — Tags */}
      <section
        ref={tagsAnim.ref}
        id="tags"
        className={`py-[10vh] border-t border-border/20 transition-all duration-1000 ${tagsAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <div className="flex flex-wrap gap-3">
          {[
            "AI/ML product design",
            "0→1 product",
            "Property intelligence",
            "Multi-persona systems",
            "Design systems",
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
