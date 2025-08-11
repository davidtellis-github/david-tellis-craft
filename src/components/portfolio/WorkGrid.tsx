import React from "react";
import { Link } from "react-router-dom";
import w1 from "@/assets/work-1.jpg";
import w2 from "@/assets/work-2.jpg";
import w3 from "@/assets/work-3.jpg";
import w4 from "@/assets/work-4.jpg";
import w5 from "@/assets/work-5.jpg";
import w6 from "@/assets/work-6.jpg";
import w7 from "@/assets/work-7.jpg";
import w8 from "@/assets/work-8.jpg";
import w9 from "@/assets/work-9.jpg";

const projects = [
  { title: "Design System Platform", img: w1, slug: "design-system-platform" },
  { title: "Insights Dashboard", img: w2, slug: "insights-dashboard" },
  { title: "Mobile Banking IA", img: w3, slug: "mobile-banking-ia" },
  { title: "Commerce Checkout", img: w4, slug: "commerce-checkout" },
  { title: "Team Collaboration", img: w5, slug: "team-collaboration" },
  { title: "Patient Portal", img: w6, slug: "patient-portal" },
  { title: "Creator Tools", img: w7, slug: "creator-tools" },
  { title: "Maps & Mobility", img: w8, slug: "maps-and-mobility" },
  { title: "AI-assisted Editor", img: w9, slug: "ai-assisted-editor" },
];

const WorkGrid: React.FC = () => {
  return (
    <section id="work" className="min-h-screen flex flex-col justify-center py-20">
      <h2 className="sr-only">Work</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p) => (
          <Link
            key={p.title}
            to={`/work/${p.slug}`}
            aria-label={`View case study: ${p.title}`}
            className="group relative block overflow-hidden rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <article>
              <img
                src={p.img}
                alt={`Project — ${p.title} case study cover`}
                loading="lazy"
                className="h-60 w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-background/80 to-transparent">
                <h3 className="text-lg font-medium tracking-tight">{p.title}</h3>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default WorkGrid;
