import React from "react";
import { Download } from "lucide-react";
import { projectsData } from "@/data/projectData";
import { CaseStudyHeader, ChapterMarker, LabelRow, Divider, ScreenshotBlock, NextProjectCard } from "./CaseStudyKit";

import vybeLandingHero from "@/assets/vybe-landing-hero.png";
import vybeFlowDiagram from "@/assets/vybe-flow-diagram.png";
import vybeHabuReport from "@/assets/vybe-habu-report.png";
import vybeExecutionTimeline from "@/assets/vybe-execution-timeline.png";
import vybePortfolioOverview from "@/assets/vybe-portfolio-overview.png";
import vybePropertyList from "@/assets/vybe-property-list.png";
import vybeNewPropertyLocation from "@/assets/vybe-new-property-location.png";

interface VybeCaseStudyProps {
  project: typeof projectsData["vybe"];
}

export const VybeCaseStudy: React.FC<VybeCaseStudyProps> = ({ project }) => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <CaseStudyHeader />

      <main className="max-w-5xl mx-auto px-6 md:px-8 py-[12vh]">
        {/* HERO */}
        <section>
          <p className="text-xs uppercase tracking-[0.18em] text-primary font-medium mb-6">Case study</p>
          <h1 className="font-figtree text-6xl md:text-7xl font-light mb-3">{project.title}</h1>
          <p className="text-lg md:text-xl text-muted-foreground font-light mb-6">AI Land Intelligence Platform</p>
          <p className="text-base md:text-lg text-muted-foreground font-light leading-relaxed max-w-xl mb-10">
            Turning land into a legible, monetizable asset — AI-analyzed, strategy-mapped, execution-ready.
          </p>

          <div className="bg-muted/10 border border-border/20 p-3 md:p-5 mb-10">
            <img
              src={vybeLandingHero}
              alt="Vybe marketing landing page — Monetize Land With Precise Strategy & Execution"
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
              <p className="text-sm font-light leading-relaxed">3 months</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.15em] text-primary font-medium mb-2">Team</p>
              <p className="text-sm font-light leading-relaxed">David Tellis · Jabastin</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.15em] text-primary font-medium mb-2">Tools</p>
              <p className="text-sm font-light leading-relaxed">Figma · Figma Make · Google AI Studio</p>
            </div>
          </div>
        </section>

        <Divider />

        {/* OVERVIEW / MY ROLE / STATUS */}
        <section>
          <LabelRow label="Overview">
            Land is one of the hardest assets to trust from a distance. Owners — especially those living outside
            the country — often can't tell if their title is clean, what the land is legally allowed to become, or
            whether the person advising them locally is reliable. We set out to replace that uncertainty with a
            single system: upload documents, get a clear read on the asset, see what it could become, and hand
            execution to vetted partners.
          </LabelRow>
          <Divider />
          <LabelRow label="My Role">
            Product Designer (AI workflows). I designed the core investor-facing flows — intake, document review,
            the HABU strategy engine — and worked with one collaborator across a 3-month, 2-person build.
          </LabelRow>
          <Divider />
          <LabelRow label="Status">
            Pre-launch. Core flows are designed and in front-end build. No users have touched this yet, so nothing
            in this case study is a shipped result — only a decision, and the reasoning behind it.
          </LabelRow>
        </section>

        <Divider />

        {/* CHAPTER: DISCOVERY */}
        <section className="pt-10">
          <ChapterMarker eyebrow="Discovery" headline="Land you can't see is land you can't trust" />
          <LabelRow label="What owners are dealing with">
            Multi-crore land, zero local visibility. Verifying a title today means chasing lawyers, surveyors, and
            brokers by hand, over months.
          </LabelRow>
          <LabelRow label="What I was actually designing for">
            Not a listings site — a trust problem. The product had to make someone feel like they suddenly had an
            expert standing on land they'd never seen.
          </LabelRow>
        </section>

        <Divider />

        {/* CHAPTER: DESIGNING THE SYSTEM */}
        <section className="pt-10">
          <ChapterMarker eyebrow="Designing the system" headline="Four people, one shared truth" />
          <LabelRow label="Intent before documents">
            Onboarding opens with strategy questions, not uploads. Documents are the highest-trust-cost step, so
            they come after the product has already shown it understands the user.
          </LabelRow>
          <LabelRow label="A queue, not a marketplace">
            For providers claiming cases, I treated it as a race-condition problem first, a UI problem second.
            First-come-first-serve had to feel instant and unambiguous — a provider opening an already-claimed
            case is a trust failure, not a bug.
          </LabelRow>
          <LabelRow label="Show the report, hide the density">
            The HABU strategy engine returns three ranked options as scannable cards — ROI, capital, timeline,
            risk — with full depth one click away. Legal metadata stays in accordions so the main view never
            overwhelms.
          </LabelRow>
          <LabelRow label="Name the humans, not just the bar">
            Once a case is in execution, the detail view names the actual project manager, architect, and legal
            counsel assigned — not an abstract percentage.
          </LabelRow>

          <ScreenshotBlock
            src={vybeFlowDiagram}
            alt="The actual end-to-end flow mapped for Vybe, from landing page through execution"
            caption="The actual flow I mapped, end to end"
          />

          <ScreenshotBlock
            src={vybeHabuReport}
            alt="HABU Report — ranked strategy options as scannable comparison cards"
            caption="HABU report — ranked options as scannable cards"
            explanation="Three investment paths, side by side, each with ROI, capital required, timeline, and a risk badge. Depth is one click away — the default view stays scannable."
          />

          <ScreenshotBlock
            src={vybeExecutionTimeline}
            alt="Execution detail view naming the project manager, architect, and legal counsel"
            caption="Execution detail — named people, not just a percentage"
            explanation="Project manager, architect, and legal counsel are named and status-tracked once a case moves into execution."
          />
        </section>

        <Divider />

        {/* CHAPTER: WHERE IT STANDS */}
        <section className="pt-10">
          <ChapterMarker eyebrow="Where it stands" headline="No results yet — just the reasoning" />
          <p className="text-base text-muted-foreground font-light leading-relaxed mb-2">
            Unlike a shipped product, there's no before/after here. What I can show is what's built, what's not,
            and what's still unresolved.
          </p>
          <Divider />
          <LabelRow label="Built" dot>
            Onboarding, document intake, portfolio dashboard, HABU report, provider claim flow
          </LabelRow>
          <LabelRow label="In progress" dot>
            Mobile web, the case-status engine
          </LabelRow>
          <LabelRow label="Unresolved" dot>
            Whether investors and providers message directly, or route everything through a relationship manager
          </LabelRow>
        </section>

        <Divider />

        {/* CHAPTER: REFLECTION */}
        <section className="pt-10">
          <ChapterMarker eyebrow="Reflection" headline="What I'd watch for next" />
          <LabelRow label="Untested assumptions are still assumptions">
            Every decision here is my best read of the trust problem, not a validated one. The first thing I'd
            want post-launch is real usage data on the HABU report — it's the riskiest surface in the product.
          </LabelRow>
          <LabelRow label="Four personas is a tax on simplicity">
            Every screen had to answer: does this still make sense for a relationship manager, not just an
            investor? That constraint slowed me down more than any technical one.
          </LabelRow>
        </section>

        <Divider />

        {/* SELECTED SCREENS */}
        <section className="pt-10">
          <ChapterMarker eyebrow="Selected screens" headline="A look at the delivered screens" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { src: vybePortfolioOverview, alt: "Portfolio Overview screen", caption: "Portfolio Overview" },
              { src: vybePropertyList, alt: "My Properties screen", caption: "My Properties" },
              { src: vybeNewPropertyLocation, alt: "New Property Case screen", caption: "New Property Case" },
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
          <a
            href="/vybe-case-study.pdf"
            download
            className="inline-flex items-center gap-2 bg-foreground text-background px-6 py-3 rounded-full hover:bg-foreground/90 transition-colors"
          >
            <Download className="w-4 h-4" />
            Download the case study (PDF)
          </a>
        </section>

        <Divider />

        <NextProjectCard currentId={project.id} />
      </main>
    </div>
  );
};
