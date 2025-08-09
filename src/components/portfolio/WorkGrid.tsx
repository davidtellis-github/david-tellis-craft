import React from "react";
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
  { title: "Design System Platform", img: w1 },
  { title: "Insights Dashboard", img: w2 },
  { title: "Mobile Banking IA", img: w3 },
  { title: "Commerce Checkout", img: w4 },
  { title: "Team Collaboration", img: w5 },
  { title: "Patient Portal", img: w6 },
  { title: "Creator Tools", img: w7 },
  { title: "Maps & Mobility", img: w8 },
  { title: "AI-assisted Editor", img: w9 },
];

const WorkGrid: React.FC = () => {
  return (
    <section id="work" className="pt-28">
      <h2 className="sr-only">Work</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p) => (
          <article key={p.title} className="group relative overflow-hidden rounded-lg border border-border bg-card">
            <img
              src={p.img}
              alt={`Project — ${p.title} by David Tellis`}
              loading="lazy"
              className="h-60 w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-background/80 to-transparent">
              <h3 className="text-lg font-medium tracking-tight">{p.title}</h3>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default WorkGrid;
