import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { projectsData } from "@/data/projectData";

import vybeFeatured from "@/assets/vybe-landing-hero.png";
import weddingVerseFeatured from "@/assets/weddingverse-featured.png";
import ideabaazFeatured from "@/assets/ideabaaz-featured.png";
import futurcraftFeatured from "@/assets/futurcraft-featured.png";
import turbocloudFeatured from "@/assets/turbocloud-featured.png";
import medpassFeatured from "@/assets/medpass-healthcare.png";
import bostonFinancialFeatured from "@/assets/boston-financial-1.png";

// Shared shell for every project case study page: animated "D" / "avid Tellis"
// logo on the top-left (links home) and a back button on the top-right that
// returns to wherever the visitor came from.
export const CaseStudyHeader: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="fixed top-6 left-6 z-50">
        <Link
          to="/"
          aria-label="Home"
          className="leading-none select-none text-foreground
                     text-[clamp(20px,4vmin,32px)] font-normal flex group relative"
        >
          <span className="inline-block">D</span>
          <span
            className="
              inline-block opacity-0
              group-hover:animate-spreadOut
              group-hover:opacity-100
            "
          >
            avid Tellis
          </span>
        </Link>
      </div>

      <div className="fixed top-6 right-6 z-50">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-muted/80 backdrop-blur-sm hover:bg-muted transition-colors"
          aria-label="Back"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
      </div>
    </>
  );
};

// A chapter's eyebrow label + large narrative headline.
export const ChapterMarker: React.FC<{ eyebrow: string; headline: string }> = ({ eyebrow, headline }) => (
  <div className="mb-10 md:mb-14">
    <p className="text-xs uppercase tracking-[0.18em] text-primary font-medium mb-4">{eyebrow}</p>
    <h2 className="font-figtree text-3xl md:text-5xl font-light leading-[1.15]">{headline}</h2>
  </div>
);

// The core repeating pattern: a narrow bold label beside a wider plain-copy paragraph.
export const LabelRow: React.FC<{ label: string; children: React.ReactNode; dot?: boolean }> = ({
  label,
  children,
  dot,
}) => (
  <div className="flex flex-col md:flex-row gap-2 md:gap-10 py-6">
    <div className="w-full md:w-[200px] flex-shrink-0 flex items-start gap-2.5">
      {dot && <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />}
      <p className="text-base font-medium leading-snug">{label}</p>
    </div>
    <div className="flex-1 text-base text-muted-foreground leading-relaxed font-light">{children}</div>
  </div>
);

export const Divider: React.FC = () => <div className="h-px w-full bg-border/60 my-4" />;

// A large inline screenshot in a card, with a caption (and optional plain explanation line) below.
export const ScreenshotBlock: React.FC<{
  src: string;
  alt: string;
  caption: string;
  explanation?: string;
}> = ({ src, alt, caption, explanation }) => (
  <div className="my-6">
    <div className="bg-muted/10 border border-border/20 p-4 md:p-7">
      <img src={src} alt={alt} className="w-full h-auto" />
    </div>
    <p className="text-sm font-medium text-primary mt-4">{caption}</p>
    {explanation && (
      <p className="text-base text-muted-foreground font-light leading-relaxed mt-2 max-w-2xl">{explanation}</p>
    )}
  </div>
);

// Role / Duration / Team / Tools 4-up grid used under every hero.
export const MetaGrid: React.FC<{
  role: string;
  duration: string;
  team: string;
  tools: string;
}> = ({ role, duration, team, tools }) => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
    <div>
      <p className="text-xs uppercase tracking-[0.15em] text-primary font-medium mb-2">Role</p>
      <p className="text-sm font-light leading-relaxed">{role}</p>
    </div>
    <div>
      <p className="text-xs uppercase tracking-[0.15em] text-primary font-medium mb-2">Duration</p>
      <p className="text-sm font-light leading-relaxed">{duration}</p>
    </div>
    <div>
      <p className="text-xs uppercase tracking-[0.15em] text-primary font-medium mb-2">Team</p>
      <p className="text-sm font-light leading-relaxed">{team}</p>
    </div>
    <div>
      <p className="text-xs uppercase tracking-[0.15em] text-primary font-medium mb-2">Tools</p>
      <p className="text-sm font-light leading-relaxed">{tools}</p>
    </div>
  </div>
);

// Same order the portfolio grid uses (useProjects.ts) — keeps "next project"
// consistent with the order visitors first saw the work in.
const projectOrder = [
  "vybe",
  "wedding-verse",
  "ideabaaz",
  "futurcraft-ai",
  "turbocloud",
  "health-project",
  "boston-financial",
  "bam",
];

const featuredImageByProjectId: Record<string, string> = {
  vybe: vybeFeatured,
  "wedding-verse": weddingVerseFeatured,
  ideabaaz: ideabaazFeatured,
  "futurcraft-ai": futurcraftFeatured,
  turbocloud: turbocloudFeatured,
  "health-project": medpassFeatured,
  "boston-financial": bostonFinancialFeatured,
};

// Closing "up next" row — points to the two projects that follow the
// current one in the portfolio order, wrapping back to the start after
// the last project.
export const NextProjectCard: React.FC<{ currentId: string }> = ({ currentId }) => {
  const currentIndex = projectOrder.indexOf(currentId);
  const upNextIds = [
    projectOrder[(currentIndex + 1) % projectOrder.length],
    projectOrder[(currentIndex + 2) % projectOrder.length],
  ];
  const upNext = upNextIds.map((id) => projectsData[id]).filter(Boolean);

  if (upNext.length === 0) return null;

  return (
    <section className="pt-10 pb-20">
      <p className="text-xs uppercase tracking-[0.18em] text-primary font-medium mb-6">Next projects</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {upNext.map((next) => (
          <Link key={next.id} to={`/project/${next.id}`} className="group block">
            <div className="overflow-hidden bg-muted/10 border border-border/20 mb-4">
              {featuredImageByProjectId[next.id] ? (
                <img
                  src={featuredImageByProjectId[next.id]}
                  alt={`${next.title} preview`}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              ) : (
                <div className="w-full aspect-[4/3] flex items-center justify-center">
                  <span className="text-sm text-muted-foreground">Preview coming soon</span>
                </div>
              )}
            </div>
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="font-figtree text-xl md:text-2xl font-light group-hover:text-primary transition-colors">
                  {next.title}
                </h3>
                <p className="text-sm text-muted-foreground font-light mt-1">{next.subtitle}</p>
              </div>
              <ArrowRight className="w-5 h-5 text-muted-foreground flex-shrink-0 group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
