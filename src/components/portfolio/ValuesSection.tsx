import React from "react";

const words = ["Relentless.", "Considered.", "Curious.", "Uncompromising."];

const ValuesSection: React.FC = () => (
  <section id="values" className="min-h-screen flex flex-col justify-center py-20">
    <h2 className="sr-only">Values</h2>
    <div className="space-y-2 md:space-y-3">
      {words.map((w) => (
        <div key={w} className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground">{w}</div>
      ))}
    </div>
    <p className="mt-10 max-w-3xl text-lg md:text-xl leading-relaxed text-muted-foreground">
      I make things that actually work — and work well. I’m allergic to “good enough,” “we’ll fix it later,” and anything that smells like it was designed for a presentation, not a human. I ask the awkward questions, obsess over the small details, and refuse to let a sloppy handoff ruin a solid design.
      I’ll take feedback, but don’t expect me to nod politely if it’s based on “personal vibes” and not actual reasoning. I’ll push back, because the goal isn’t to make me look good, it’s to make the product unbreakable, intuitive, and worth using twice.
      Design for me isn’t just a job — it’s my way of leaving things better than I found them. And yes, that sounds noble, but honestly, I just hate crappy products.
    </p>
  </section>
);

export default ValuesSection;
