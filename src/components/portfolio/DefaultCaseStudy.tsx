import React from "react";
import { ProjectData } from "@/data/projectData";
import { CaseStudyHeader, ChapterMarker, LabelRow, Divider, ScreenshotBlock, MetaGrid, NextProjectCard } from "./CaseStudyKit";

import weddingverseFeatured from "@/assets/weddingverse-featured.png";
import weddingverseContext from "@/assets/wedding-verse-context.jpg";
import weddingverseRole from "@/assets/wedding-verse-role.jpg";
import designSystem1 from "@/assets/wedding-verse-design-system-1.png";
import designSystem2 from "@/assets/wedding-verse-design-system-2.png";
import designSystem3 from "@/assets/wedding-verse-design-system-3.png";
import iterations1 from "@/assets/wedding-verse-iterations-1.png";
import iterations2 from "@/assets/wedding-verse-iterations-2.png";
import iterations3 from "@/assets/wedding-verse-iterations-3.png";
import iterations4 from "@/assets/wedding-verse-iterations-4.png";
import iterations5 from "@/assets/wedding-verse-iterations-5.png";

import turbocloudFeatured from "@/assets/turbocloud-featured.png";
import turbocloudFinopsDashboard from "@/assets/turbocloud-finops-dashboard.png";
import turbocloudMonitoring from "@/assets/turbocloud-monitoring.png";
import turbocloudSignupMockup from "@/assets/turbocloud-signup-mockup.jpg";
import turbocloudProviderMockup from "@/assets/turbocloud-provider-mockup.jpg";
import turbocloudDashboardMockup from "@/assets/turbocloud-dashboard-mockup.jpg";
import turbocloudFinopsMockup from "@/assets/turbocloud-finops-mockup.jpg";

import bostonFinancial1 from "@/assets/boston-financial-1.png";
import bostonFinancial2 from "@/assets/boston-financial-2.png";

import medpassHealthcare from "@/assets/medpass-healthcare.png";

const imageMap: Record<string, string> = {
  "weddingverse-featured.png": weddingverseFeatured,
  "wedding-verse-context.jpg": weddingverseContext,
  "wedding-verse-role.jpg": weddingverseRole,
  "wedding-verse-design-system-1.png": designSystem1,
  "wedding-verse-design-system-2.png": designSystem2,
  "wedding-verse-design-system-3.png": designSystem3,
  "wedding-verse-iterations-1.png": iterations1,
  "wedding-verse-iterations-2.png": iterations2,
  "wedding-verse-iterations-3.png": iterations3,
  "wedding-verse-iterations-4.png": iterations4,
  "wedding-verse-iterations-5.png": iterations5,
  "turbocloud-featured.png": turbocloudFeatured,
  "turbocloud-finops-dashboard.png": turbocloudFinopsDashboard,
  "turbocloud-monitoring.png": turbocloudMonitoring,
  "turbocloud-signup-mockup.jpg": turbocloudSignupMockup,
  "turbocloud-provider-mockup.jpg": turbocloudProviderMockup,
  "turbocloud-dashboard-mockup.jpg": turbocloudDashboardMockup,
  "turbocloud-finops-mockup.jpg": turbocloudFinopsMockup,
  "boston-financial-1.png": bostonFinancial1,
  "boston-financial-2.png": bostonFinancial2,
  "medpass-healthcare.png": medpassHealthcare,
};

const resolveImage = (path: string) => imageMap[path] || path;

interface DefaultCaseStudyProps {
  project: ProjectData;
}

// Shared single-column narrative layout (matching the Vybe case study) for
// every project that doesn't have a bespoke case study component.
export const DefaultCaseStudy: React.FC<DefaultCaseStudyProps> = ({ project }) => {
  const heroImage = project.mockupImages?.[0] ? resolveImage(project.mockupImages[0]) : project.id === "health-project" ? medpassHealthcare : undefined;
  const solutionImage = project.mockupImages?.[1] ? resolveImage(project.mockupImages[1]) : undefined;
  const selectedScreens = (project.mockupImages || []).slice(2);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <CaseStudyHeader />

      <main className="max-w-5xl mx-auto px-6 md:px-8 py-[12vh]">
        {/* HERO */}
        <section>
          <p className="text-xs uppercase tracking-[0.18em] text-primary font-medium mb-6">Case study</p>
          <h1 className="font-figtree text-6xl md:text-7xl font-light mb-3">{project.title}</h1>
          <p className="text-lg md:text-xl text-muted-foreground font-light mb-6">{project.subtitle}</p>
          <p className="text-base md:text-lg text-muted-foreground font-light leading-relaxed max-w-xl mb-10">
            {project.description}
          </p>

          {heroImage && (
            <div className="bg-muted/10 border border-border/20 p-3 md:p-5 mb-10">
              <img
                src={heroImage}
                alt={`${project.title} overview`}
                className="w-full h-auto"
              />
            </div>
          )}

          <MetaGrid
            role={project.role.title}
            duration={project.role.duration}
            team={project.role.team}
            tools={project.role.tools.join(" • ")}
          />
        </section>

        <Divider />

        {/* CHALLENGE & SOLUTION */}
        <section>
          <LabelRow label="The Problem">{project.context.problem}</LabelRow>
          <Divider />
          <LabelRow label="The Solution">{project.context.objective}</LabelRow>
          <Divider />
          <LabelRow label="Audience">{project.context.audience}</LabelRow>
        </section>

        {solutionImage && (
          <ScreenshotBlock
            src={solutionImage}
            alt={`${project.title} solution mockup`}
            caption="The solution, in context"
          />
        )}

        <Divider />

        {/* FEATURES */}
        {project.features.length > 0 && (
          <>
            <section className="pt-10">
              <ChapterMarker eyebrow="Core features" headline="What I designed" />
              {project.features.map((feature) => (
                <LabelRow key={feature.title} label={feature.title} dot>
                  {feature.description}
                </LabelRow>
              ))}
            </section>
            <Divider />
          </>
        )}

        {/* PROCESS */}
        {project.process.length > 0 && (
          <>
            <section className="pt-10">
              <ChapterMarker eyebrow="How I worked" headline="Process, start to finish" />
              {project.process.map((phase) => (
                <LabelRow key={phase.step} label={phase.step}>
                  {phase.description}
                </LabelRow>
              ))}
            </section>
            <Divider />
          </>
        )}

        {/* DESIGN SYSTEM (wedding-verse only) */}
        {project.designSystem && (
          <>
            <section className="pt-10">
              <ChapterMarker eyebrow="Design system" headline="Built to scale" />
              {project.designSystem.goals.map((goal, i) => (
                <LabelRow key={i} label={i === 0 ? "Goals" : ""} dot>
                  {goal}
                </LabelRow>
              ))}
              <Divider />
              {project.designSystem.coreElements.map((el) => (
                <LabelRow key={el.title} label={el.title}>
                  {el.description}
                </LabelRow>
              ))}
              {project.designSystem.note && (
                <div className="bg-muted/30 rounded-lg p-4 mt-6">
                  <p className="text-sm text-muted-foreground leading-[1.8] font-light italic">
                    {project.designSystem.note}
                  </p>
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                {project.designSystem.images.map((img, i) => (
                  <div key={i} className="overflow-hidden bg-muted/20 border border-border/20">
                    <img src={resolveImage(img)} alt={`Design system ${i + 1}`} className="w-full h-auto object-cover" />
                  </div>
                ))}
              </div>
            </section>
            <Divider />
          </>
        )}

        {/* DESIGN EVOLUTION: ITERATIONS + VIDEO */}
        {(project.iterations || project.videoUrl) && (
          <>
            <section className="pt-10">
              <ChapterMarker eyebrow="Design evolution" headline="Iterations & walkthrough" />

              {project.iterations && (
                <div className="mb-16">
                  {project.iterations.intro && (
                    <p className="text-base text-muted-foreground font-light leading-relaxed mb-8">
                      {project.iterations.intro}
                    </p>
                  )}

                  {project.iterations.decisions?.map((d, i) => (
                    <LabelRow key={i} label={d.challenge} dot>
                      {d.iteration} — <span className="text-foreground">{d.finalDecision}</span>
                    </LabelRow>
                  ))}

                  {project.iterations.note && (
                    <div className="bg-muted/30 rounded-lg p-4 my-6">
                      <p className="text-sm text-muted-foreground leading-[1.8] font-light italic">
                        {project.iterations.note}
                      </p>
                    </div>
                  )}

                  <div className="columns-1 sm:columns-2 gap-4 space-y-4 mt-6">
                    {project.iterations.images.map((img, i) => (
                      <div key={i} className="break-inside-avoid">
                        <div className="overflow-hidden bg-muted/20 border border-border/20">
                          <img src={resolveImage(img)} alt={`Iteration ${i + 1}`} className="w-full h-auto object-cover" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {project.videoUrl && (
                <div>
                  <p className="text-sm font-medium text-primary mb-4">Video walkthrough</p>
                  <div className="relative aspect-video bg-muted/50 rounded-2xl overflow-hidden">
                    <iframe
                      src={project.videoUrl}
                      className="absolute inset-0 w-full h-full"
                      frameBorder="0"
                      allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
                      title={`${project.title} Video Walkthrough`}
                    />
                  </div>
                </div>
              )}
            </section>
            <Divider />
          </>
        )}

        {/* OUTCOMES */}
        {project.outcomes.length > 0 && (
          <>
            <section className="pt-10">
              <ChapterMarker eyebrow="Where it landed" headline="Outcomes" />
              {project.outcomes.map((o) => (
                <LabelRow key={o.metric} label={o.value}>
                  {o.metric}
                </LabelRow>
              ))}
            </section>
            <Divider />
          </>
        )}

        {/* REFLECTION */}
        {project.reflection && (
          <>
            <section className="pt-10">
              <ChapterMarker eyebrow="Reflection" headline="What I'd carry forward" />
              <p className="text-base text-muted-foreground font-light leading-relaxed">{project.reflection}</p>
            </section>
            <Divider />
          </>
        )}

        {/* SELECTED SCREENS */}
        {selectedScreens.length > 0 && (
          <>
            <section className="pt-10">
              <ChapterMarker eyebrow="Selected screens" headline="A look at the delivered screens" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {selectedScreens.map((img, i) => (
                  <div key={i}>
                    <div className="bg-muted/10 border border-border/20 p-3 md:p-5">
                      <img src={resolveImage(img)} alt={`${project.title} screen ${i + 1}`} className="w-full h-auto" />
                    </div>
                  </div>
                ))}
              </div>
            </section>
            <Divider />
          </>
        )}

        {/* CLOSING */}
        <section className="pt-10 pb-20">
          <h2 className="font-figtree text-3xl md:text-4xl font-light mb-4">Thanks for reading.</h2>
          <p className="text-base text-muted-foreground font-light leading-relaxed mb-8 max-w-lg">
            Want to see another project, or this one in more depth? Happy to walk through it.
          </p>
          {(project.links.live || project.links.figma) && (
            <a
              href={project.links.live || project.links.figma}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-foreground text-background px-6 py-3 rounded-full hover:bg-foreground/90 transition-colors"
            >
              {project.links.live ? "View live" : "View in Figma"}
            </a>
          )}
        </section>

        <Divider />

        <NextProjectCard currentId={project.id} />
      </main>
    </div>
  );
};
