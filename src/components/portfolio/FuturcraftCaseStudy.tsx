import React from "react";
import { projectsData } from "@/data/projectData";
import { CaseStudyHeader, NextProjectCard } from "./CaseStudyKit";

import futurcraftFeatured from "@/assets/futurcraft-featured.png";
import futurcraftSignup from "@/assets/ui-futurecraft-signup.png";
import futurcraftUrlInput from "@/assets/futurcraft-url-input.png";
import futurcraftPostEditor from "@/assets/futurcraft-post-editor.jpg";

interface FuturcraftCaseStudyProps {
  project: typeof projectsData["futurcraft-ai"];
}

// Left label (+ optional one-line note) beside a full content column —
// the repeating two-column pattern every section (other than the hero
// and stats row) uses.
const Section: React.FC<{ label: string; note?: string; children: React.ReactNode }> = ({ label, note, children }) => (
  <section className="grid grid-cols-[180px_1fr] gap-12 items-start">
    <div>
      <p className="text-[11px] tracking-[0.1em] uppercase text-muted-foreground">{label}</p>
      {note && <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{note}</p>}
    </div>
    <div>{children}</div>
  </section>
);

// Edge-to-edge screenshot with a caption bar — used for the numbered
// screen walkthroughs.
const ScreenFrame: React.FC<{ src: string; alt: string; caption: string }> = ({ src, alt, caption }) => (
  <div className="rounded-xl overflow-hidden border border-border/20 mt-6">
    <img src={src} alt={alt} className="w-full h-auto" />
    <div className="p-3 border-t border-border/20 text-xs text-muted-foreground">{caption}</div>
  </div>
);

const HrBreak: React.FC = () => <hr className="border-t border-border/10 my-16" />;

export const FuturcraftCaseStudy: React.FC<FuturcraftCaseStudyProps> = ({ project }) => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <CaseStudyHeader />

      <main className="max-w-5xl mx-auto px-6 md:px-8 py-[12vh]">
        {/* HERO */}
        <section>
          <p className="text-xs uppercase tracking-[0.18em] text-primary font-medium mb-6">
            Case study · Q4 2024 – Q2 2025
          </p>
          <h1 className="text-6xl md:text-7xl font-light mb-3">{project.title}</h1>
          <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed max-w-xl mb-10">
            An AI platform for content creators that generates on-brand output — without losing control of the
            brand.
          </p>

          <div className="rounded-2xl bg-muted/10 border border-border/20 p-3 md:p-5 mb-10">
            <img src={futurcraftFeatured} alt="Futurcraft AI platform overview" className="w-full h-auto rounded-lg" />
          </div>

          <div className="grid grid-cols-4 gap-6 border-t border-b border-border/20 py-6">
            <div>
              <p className="text-[11px] tracking-[0.1em] uppercase text-muted-foreground mb-2">Role</p>
              <p className="text-sm text-foreground">{project.role.title}</p>
            </div>
            <div>
              <p className="text-[11px] tracking-[0.1em] uppercase text-muted-foreground mb-2">Duration</p>
              <p className="text-sm text-foreground">{project.role.duration}</p>
            </div>
            <div>
              <p className="text-[11px] tracking-[0.1em] uppercase text-muted-foreground mb-2">Team</p>
              <p className="text-sm text-foreground">{project.role.team}</p>
            </div>
            <div>
              <p className="text-[11px] tracking-[0.1em] uppercase text-muted-foreground mb-2">Tools</p>
              <p className="text-sm text-foreground">{project.role.tools.join(" • ")}</p>
            </div>
          </div>
        </section>

        {/* STATS ROW */}
        <section className="grid grid-cols-4 gap-px bg-border mt-16">
          {[
            { value: "300+", label: "Waitlist signups in 2 weeks" },
            { value: "~70%", label: "Faster content turnaround" },
            { value: "0→1", label: "Platform built from scratch" },
            { value: "MVP", label: "Investor prototype on time" },
          ].map((stat) => (
            <div key={stat.label} className="bg-background p-5">
              <p className="text-3xl font-bold text-primary mb-2">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </section>

        <HrBreak />

        {/* THE PROBLEM */}
        <Section label="The problem" note="AI tools were part of the workflow. They were also breaking it.">
          <h2 className="text-3xl md:text-4xl font-light mb-4">
            AI tools were making brand consistency worse, not better.
          </h2>
          <p className="text-base text-muted-foreground font-light leading-relaxed mb-6">
            Content creators and social media teams spend the majority of their time not on creative work — but on
            repetitive production. AI tools that promised to fix this made it worse: every generated output looked
            like it could belong to any brand, or none — forcing teams to spend more time correcting AI drafts for
            brand fit than they saved by using AI in the first place.
          </p>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-red-500/5 border border-red-500/10 rounded-xl p-5">
              <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-red-500/10 text-red-400 mb-3">
                Before
              </span>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Every output looked like it could belong to any brand. Teams spent more time fixing tone and voice
                than writing from scratch.
              </p>
            </div>
            <div className="bg-green-500/5 border border-green-500/10 rounded-xl p-5">
              <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-400 mb-3">
                After
              </span>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Every generation is grounded in a defined brand DNA and shown as a reviewable change — nothing ships
                until the user approves it.
              </p>
            </div>
          </div>
        </Section>

        <HrBreak />

        {/* 01 — ONBOARDING */}
        <Section label="01 — Onboarding" note="The first thing a user does is teach the platform their brand.">
          <h2 className="text-3xl md:text-4xl font-light mb-4">Teaching the AI your brand.</h2>
          <p className="text-base text-muted-foreground font-light leading-relaxed">
            The entry point needed to feel like the start of something considered — not just another SaaS tool.
            Clean, minimal, with the brand's identity as the centrepiece from the first screen.
          </p>
          <ScreenFrame
            src={futurcraftSignup}
            alt="FutureCraft AI login screen — centred card layout with soft ambient background"
            caption="Login — onboarding entry point"
          />
        </Section>

        <HrBreak />

        {/* 02 — CREATE */}
        <Section label="02 — Create" note="One brief. Blog, post, or script.">
          <h2 className="text-3xl md:text-4xl font-light mb-4">One brief. Every format.</h2>
          <p className="text-base text-muted-foreground font-light leading-relaxed">
            A single brief drives every content type — the user picks a format, describes the idea, and the AI
            generates within the brand constraints defined during onboarding. No separate tools or workflows per
            content type.
          </p>
          <ScreenFrame
            src={futurcraftUrlInput}
            alt="Futurcraft AI home and create screen — brief input and content type selector"
            caption="Home / Create — brief input and content type selector"
          />
          <div className="border-l-4 border-primary/40 pl-5 py-2 bg-muted/10 rounded-r-xl mt-4 text-sm text-muted-foreground leading-relaxed">
            Showing token balance upfront was a late addition — but a critical one. Without it, users felt
            blindsided mid-session.
          </div>
        </Section>

        <HrBreak />

        {/* 03 — POSTS */}
        <Section label="03 — Posts" note="One topic → every platform. Automatically adapted.">
          <h2 className="text-3xl md:text-4xl font-light mb-4">One topic. Every platform.</h2>
          <p className="text-base text-muted-foreground font-light leading-relaxed">
            Once a topic is defined, Futurcraft generates platform-specific variants — blog, LinkedIn, X, Instagram
            caption — without the user re-writing the brief for each one. Tone and length adapt per platform, but
            every variant still traces back to the same brand rules.
          </p>
          <ScreenFrame
            src={futurcraftPostEditor}
            alt="Futurcraft AI posts dashboard with social platform tabs"
            caption="Posts dashboard — social platform tabs"
          />
        </Section>

        <HrBreak />

        {/* 04 — BLOG EDITOR */}
        <Section
          label="04 — Blog editor"
          note="Write long-form, repurpose to any format without leaving the editor."
        >
          <h2 className="text-3xl md:text-4xl font-light mb-4">Write once. Repurpose instantly.</h2>
          <p className="text-base text-muted-foreground font-light leading-relaxed">
            The blog editor pairs long-form writing with a live SEO score, then lets a writer repurpose that same
            post into a social caption, a script outline, or a shorter blog variant — all from a single
            Promote/Repurpose panel, without leaving the page.
          </p>
          <div className="border-l-4 border-green-500/40 pl-5 py-2 bg-green-500/5 rounded-r-xl mt-4 text-sm text-muted-foreground leading-relaxed">
            The Promote/Repurpose panel was the most-requested feature in beta. Teams were manually reformatting the
            same post 4–5 times per publish. This eliminated that entirely.
          </div>
        </Section>

        <HrBreak />

        {/* HOW I WORKED */}
        <Section label="How I worked" note="5 phases across 16 weeks.">
          <h2 className="text-3xl md:text-4xl font-light mb-6">5 phases, 16 weeks.</h2>
          <div>
            {[
              { num: "01", step: "Discovery", description: "AI capability research & user needs analysis" },
              { num: "02", step: "Prototyping", description: "AI interaction patterns & interface design" },
              { num: "03", step: "Testing", description: "AI model training & user experience validation" },
              { num: "04", step: "Integration", description: "Platform development & API integration" },
              { num: "05", step: "Launch", description: "Beta release & performance optimisation" },
            ].map((phase) => (
              <div key={phase.num} className="border-b border-border/10 py-3 flex gap-6 items-baseline">
                <span className="text-xs text-muted-foreground w-6">{phase.num}</span>
                <span className="text-sm font-medium text-foreground w-28">{phase.step}</span>
                <span className="text-sm text-muted-foreground">{phase.description}</span>
              </div>
            ))}
          </div>
          <div className="border-l-4 border-primary/40 pl-5 py-2 bg-muted/10 rounded-r-xl mt-4 text-sm text-muted-foreground leading-relaxed">
            The constraint that shaped everything: I worked with the AI engineer from day one. The interface was
            built around what the model could actually do — not what we hoped it could do.
          </div>
        </Section>

        <HrBreak />

        {/* OUTCOMES */}
        <Section label="Outcomes" note="Results from the first two weeks of beta.">
          <h2 className="text-3xl md:text-4xl font-light mb-6">Results that came back from beta.</h2>
          <div>
            {[
              "300+ waitlist signups in the first 2 weeks after the beta landing page launched — no paid acquisition.",
              "Approximately 70% reduction in content turnaround time reported by beta users vs their previous manual workflows. (Estimated; to be validated post-launch.)",
              "Investor prototype delivered on schedule and used in fundraising conversations.",
              "Design system built and handed off — full component library enabling engineering to build new screens without returning to design.",
              "The old-vs-new review modal became the most-cited feature in early beta feedback, directly addressing the core trust problem.",
            ].map((item, i) => (
              <div key={i} className="border-b border-border/10 py-3 flex gap-3 items-start text-sm text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </Section>

        <HrBreak />

        {/* REFLECTION */}
        <Section label="Reflection">
          <h2 className="text-3xl md:text-4xl font-light mb-6">What I learned.</h2>
          <p className="text-base text-muted-foreground font-light leading-relaxed mb-6">
            <strong className="text-foreground font-medium">Users didn't need the AI to be smarter</strong> — they
            needed to feel like they were still the author. Every design decision that gave users visible control
            over AI behaviour increased trust and reduced the correction loop.
          </p>
          <p className="text-base text-muted-foreground font-light leading-relaxed">
            <strong className="text-foreground font-medium">Constraints produced better UX than freedom</strong>{" "}
            would have. Working directly with the AI engineer from day one — not after handoff — meant the interface
            was built around what the model could actually do, not what we hoped it could do.
          </p>
        </Section>

        <HrBreak />

        {/* TAGS ROW */}
        <section className="flex flex-wrap gap-3">
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
              className="inline-flex px-4 py-1.5 rounded-full bg-muted/20 border border-border/20 text-xs text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </section>

        <HrBreak />

        <NextProjectCard currentId={project.id} />
      </main>
    </div>
  );
};
