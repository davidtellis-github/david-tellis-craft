import React from "react";

const roles = [
  {
    company: "Freelance",
    title: "Product Designer",
    time: "Now",
    location: "Remote",
    notes: "Partnering with teams to design clear, scalable product experiences.",
  },
  {
    company: "Acme Health",
    title: "Senior Product Designer",
    time: "2022–2024",
    location: "Seattle",
    notes: "Led patient portal redesign; established cross-platform design system.",
  },
  {
    company: "Nimbus Labs",
    title: "Product Designer",
    time: "2020–2022",
    location: "Austin",
    notes: "Built analytics workflows and improved onboarding conversion.",
  },
];

const BackgroundTimeline: React.FC = () => (
  <section id="background" className="pt-28">
    <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-8">Background</h2>
    <ol className="space-y-12">
      {roles.map((r) => (
        <li key={`${r.company}-${r.time}`} className="grid md:grid-cols-[120px_1fr] gap-6 items-start">
          <div className="text-sm text-muted-foreground">{r.time}<span className="mx-2">•</span>{r.location}</div>
          <div>
            <div className="text-muted-foreground mb-1">{r.company}</div>
            <h3 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground">{r.title}</h3>
            <p className="mt-3 text-muted-foreground max-w-2xl">{r.notes}</p>
          </div>
        </li>
      ))}
    </ol>
  </section>
);

export default BackgroundTimeline;
