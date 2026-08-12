import React, { useEffect, useState } from "react";
import { projectsData } from "@/data/projectData";
import { sanity } from "@/integrations/sanity/client";
import { fileUrlFor } from "@/integrations/sanity/file";
import { urlFor } from "@/integrations/sanity/image";
import { CaseStudyHeader, ChapterMarker, LabelRow, Divider, MetaGrid, NextProjectCard, ScreenshotBlock } from "./CaseStudyKit";

interface BamCaseStudyProps {
  project: typeof projectsData["bam"];
}

// Sanity is the source for the prototype videos specifically (uploaded via
// studio-portfolio/portfolio/scripts/upload-project-media.mjs) — everything
// else on this page is static, so this is a narrowly-scoped fetch rather
// than a general-purpose hook. Both videos live on the same doc, so one
// query fetches both fields at once.
const useProjectVideos = (docId: string) => {
  const [urls, setUrls] = useState<{ heroVideo: string | null; landingPageVideo: string | null }>({
    heroVideo: null,
    landingPageVideo: null,
  });

  useEffect(() => {
    let cancelled = false;

    sanity
      .fetch<{
        heroVideo?: { asset?: { _ref?: string } };
        landingPageVideo?: { asset?: { _ref?: string } };
      } | null>(`*[_type == "project" && _id == $id][0]{heroVideo, landingPageVideo}`, { id: docId })
      .then((doc) => {
        if (cancelled) return;
        const heroRef = doc?.heroVideo?.asset?._ref;
        const landingRef = doc?.landingPageVideo?.asset?._ref;
        setUrls({
          heroVideo: heroRef ? fileUrlFor(heroRef) : null,
          landingPageVideo: landingRef ? fileUrlFor(landingRef) : null,
        });
      })
      .catch(() => {
        if (!cancelled) setUrls({ heroVideo: null, landingPageVideo: null });
      });

    return () => {
      cancelled = true;
    };
  }, [docId]);

  return urls;
};

type SanityImageRef = { asset?: { _ref?: string; _type?: string } };

// Same doc's `sections[].projectImages[]` array holds screenshot evidence,
// grouped by categoryName (set via the --section flag on the upload script).
const useProjectSectionImages = (docId: string) => {
  const [byCategory, setByCategory] = useState<Record<string, string[]>>({});

  useEffect(() => {
    let cancelled = false;

    sanity
      .fetch<Array<{ categoryName: string; projectImages?: SanityImageRef[] }> | null>(
        `*[_type == "project" && _id == $id][0].sections[]{categoryName, projectImages}`,
        { id: docId }
      )
      .then((sections) => {
        if (cancelled) return;
        const next: Record<string, string[]> = {};
        for (const section of sections ?? []) {
          next[section.categoryName] = (section.projectImages ?? [])
            .filter((img) => img.asset?._ref)
            .map((img) => urlFor(img as never).width(1600).quality(80).auto("format").url());
        }
        setByCategory(next);
      })
      .catch(() => {
        if (!cancelled) setByCategory({});
      });

    return () => {
      cancelled = true;
    };
  }, [docId]);

  return byCategory;
};

// Bespoke narrative case study for BAM: no shipped-metrics outcome to lean
// on (pre-launch), so the story is carried by diagnosis and reasoning
// instead — evidence, not a victory lap.
export const BamCaseStudy: React.FC<BamCaseStudyProps> = ({ project }) => {
  const { heroVideo: heroVideoUrl, landingPageVideo: landingPageVideoUrl } = useProjectVideos(project.id);
  const sectionImages = useProjectSectionImages(project.id);
  const [onboardingImage, profileImage] = sectionImages["Onboarding"] ?? [];
  const [landingPageImage] = sectionImages["Landing Page"] ?? [];

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

          {heroVideoUrl && (
            <div className="bg-muted/10 border border-border/20 p-3 md:p-5 mb-10">
              <video
                src={heroVideoUrl}
                autoPlay
                muted
                loop
                playsInline
                controls
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

        {/* PROBLEM */}
        <section className="pt-10">
          <ChapterMarker eyebrow="The problem" headline="Users were asked everything before they saw anything" />
          <LabelRow label="The setup">
            BAM is an event marketplace connecting talent and organizers. The original design asked users
            everything upfront: intent, experience level, event preferences, rates, availability — a full
            12-field form before anyone reached the value page. The logic was sound — complete data enables
            better matching. The problem was the sequencing.
          </LabelRow>
          <Divider />
          <LabelRow label="The friction">
            Stakeholders had pushed for comprehensive profile collection at signup, for the matching algorithm's
            sake. That intent was reasonable. Placed at the front door, it was friction.
          </LabelRow>
          <Divider />
          <LabelRow label="The evidence" dot>
            User interviews during early testing named the blocker directly: "Too long to get to the value."
            They weren't rejecting the questions — they were rejecting the timing. This wasn't a feature problem.
            It was a prioritization problem.
          </LabelRow>
        </section>

        <Divider />

        {/* HOW I DIAGNOSED IT */}
        <section className="pt-10">
          <ChapterMarker eyebrow="How I diagnosed it" headline="The problem was sequence, not content" />
          <LabelRow label="User feedback">
            "Too long to get to the value" — the phrase that kept surfacing across interviews, almost verbatim.
          </LabelRow>
          <Divider />
          <LabelRow label="Root cause">
            I audited where users dropped off: primarily between screens 3 and 5, where personal and professional
            detail questions clustered. Cross-referenced against the interview notes, the pattern held — users
            wanted to see the platform's value before committing to a profile.
          </LabelRow>
          <Divider />
          <LabelRow label="Original intent">
            Valid — completeness genuinely helps matching. Just misplaced. The real problem wasn't that we asked
            too much. It was that we asked before showing anything.
          </LabelRow>
        </section>

        <Divider />

        {/* WHAT I CHANGED */}
        <section className="pt-10">
          <ChapterMarker eyebrow="What I changed" headline="Twelve fields became three, then a fork" />
          <LabelRow label="Radical triage">
            Cut the entry flow to three fields — name, email, event type. That's it.
          </LabelRow>
          <Divider />
          <LabelRow label="Persona-first architecture" dot>
            Introduced a persona selector — <span className="text-foreground">Doers</span> (event organizers,
            immediate action) vs. <span className="text-foreground">Dreamers</span> (talent exploring,
            relationship-building) — as the organizing principle for the whole flow.
          </LabelRow>
          <Divider />
          <LabelRow label="Intent switch">
            One entry point, two landing pages branching on that single choice — each built around what that
            persona actually needed to see first. The remaining 9 fields became progressive, asked once users
            reached the dashboard, where context made them feel purposeful instead of interrogatory.
          </LabelRow>

          {onboardingImage && (
            <ScreenshotBlock
              src={onboardingImage}
              alt="BAM persona-driven onboarding steps and resulting dashboard"
              caption="Persona-driven onboarding, step by step"
              explanation="Role, skills, and availability collected progressively after signup — not before it — landing on a dashboard instead of a wall of fields."
            />
          )}

          {profileImage && (
            <ScreenshotBlock
              src={profileImage}
              alt="BAM talent profile page"
              caption="Where that data actually ends up"
            />
          )}
        </section>

        <Divider />

        {/* LANDING PAGE */}
        {(landingPageVideoUrl || landingPageImage) && (
          <>
            <section className="pt-10">
              <ChapterMarker eyebrow="Landing page" headline="One fork, two landing pages" />

              {landingPageVideoUrl && (
                <div className="bg-muted/10 border border-border/20 p-3 md:p-5 mb-6">
                  <video src={landingPageVideoUrl} controls playsInline className="w-full h-auto" />
                </div>
              )}

              {landingPageImage && (
                <ScreenshotBlock
                  src={landingPageImage}
                  alt="BAM marketing landing page"
                  caption="The public-facing landing page"
                />
              )}
            </section>

            <Divider />
          </>
        )}

        {/* WHY THIS APPROACH */}
        <section className="pt-10">
          <ChapterMarker eyebrow="Why this approach" headline="Persona as a filter, not a feature" />
          <LabelRow label="Persona as filter">
            Doers and Dreamers want fundamentally different value propositions. Collapsing them into one funnel
            meant generic onboarding. Separating them meant each persona could see their immediate win first —
            organizers see event listings, talent sees opportunities to pitch.
          </LabelRow>
          <Divider />
          <LabelRow label="Progressive disclosure">
            Information collection didn't disappear — it moved. The stakeholder requirement stayed intact; the
            friction didn't. Data still flows into matching, just after users experience enough value to trust
            the process.
          </LabelRow>
          <Divider />
          <LabelRow label="Stakeholder alignment">
            By asking event type first, the landing page could pre-filter. By asking persona second, the flow
            could branch. By deferring everything else, the sense of interrogation went away.
          </LabelRow>
        </section>

        <Divider />

        {/* WHAT HAPPENED */}
        <section className="pt-10">
          <ChapterMarker eyebrow="Where it landed" headline="Faster to value, still pre-launch" />
          <LabelRow label="Time to value">
            Users reached the value page faster. Onboarding felt lean instead of thorough.
          </LabelRow>
          <Divider />
          <LabelRow label="Feedback shifted">
            Length complaints stopped appearing in testing notes entirely — the loop that named the original
            problem went quiet.
          </LabelRow>
          <Divider />
          <LabelRow label="Status">
            Shipped as a pre-launch candidate in February 2026. No hard metrics yet — completion rate, time-to-
            value — but the qualitative signal is strong.
          </LabelRow>
        </section>

        <Divider />

        {/* REFLECTION */}
        <section className="pt-10">
          <ChapterMarker eyebrow="Reflection" headline="Reordering requirements isn't rejecting them" />
          <p className="text-base text-muted-foreground font-light leading-relaxed max-w-2xl">{project.reflection}</p>
        </section>

        <Divider />

        {/* CLOSING */}
        <section className="pt-10 pb-20">
          <h2 className="font-figtree text-3xl md:text-4xl font-light mb-4">Thanks for reading.</h2>
          <p className="text-base text-muted-foreground font-light leading-relaxed mb-8 max-w-lg">
            Want to see another project, or this one in more depth? Happy to walk through it.
          </p>
        </section>

        <Divider />

        <NextProjectCard currentId={project.id} />
      </main>
    </div>
  );
};
