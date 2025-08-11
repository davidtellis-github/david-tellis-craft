import React from "react";

const values = [
  { title: "Systems first", body: "Design holistically. Components, constraints, and language that scale." },
  { title: "Craft matters", body: "Precision and clarity from research to redlines." },
  { title: "Bias to ship", body: "Collaborate closely, prototype often, deliver value." },
  { title: "Kind and direct", body: "Clear writing, candid feedback, and empathy for partners." },
];

const ValuesSection: React.FC = () => (
  <section id="values" className="min-h-screen w-full flex items-center pt-28">
    <div className="grid md:grid-cols-2 gap-12 w-full">
      <div>
        <h2 className="sr-only">Values</h2>
        <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tight leading-[0.95] text-foreground space-y-3">
          <div>Relentless.</div>
          <div>Considered.</div>
          <div>Curious.</div>
          <div>Uncompromising.</div>
        </div>
      </div>
      <div className="self-end text-muted-foreground max-w-md md:max-w-lg leading-relaxed text-base md:text-lg">
        <p>I make things that actually work — and work well. I’m allergic to “good enough,” “we’ll fix it later,” and anything that smells like it was designed for a presentation, not a human. I ask the awkward questions, obsess over the small details, and refuse to let a sloppy handoff ruin a solid design.</p>
        <p className="mt-6">I’ll take feedback, but don’t expect me to nod politely if it’s based on “personal vibes” and not actual reasoning. I’ll push back, because the goal isn’t to make me look good, it’s to make the product unbreakable, intuitive, and worth using twice.</p>
        <p className="mt-6">Design for me isn’t just a job — it’s my way of leaving things better than I found them. And yes, that sounds noble, but honestly, I just hate crappy products.</p>
      </div>
    </div>
  </section>
);

export default ValuesSection;
