import React from "react";

const words = ["Egoless.", "Adaptive.", "Curious.", "Craft-obsessed."];

const ValuesSection: React.FC = () => (
  <section
    id="values"
    className="min-h-screen flex flex-col justify-center py-12 sm:py-16 lg:py-20"
  >
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-start">
      {/* Left: Big Values */}
      <div className="flex flex-col space-y-2 sm:space-y-3 lg:space-y-4">
        {words.map((w) => (
          <div
            key={w}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium tracking-tight leading-tight text-foreground"
          >
            {w}
          </div>
        ))}
      </div>

      {/* Right: Paragraph */}
      <div className="flex items-start">
        <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-foreground max-w-lg">
          I make things that actually work — and work well. I'm allergic to "good
          enough," "we'll fix it later," and anything that smells like it was
          designed for a presentation, not a human. I ask the awkward questions,
          obsess over the small details, and refuse to let a sloppy handoff ruin a
          solid design.
          <br /><br />
          I'll take feedback, but don't expect me to nod politely if it's based on
          "personal vibes" and not actual reasoning. I'll push back, because the
          goal isn't to make me look good, it's to make the product unbreakable,
          intuitive, and worth using twice.
          <br /><br />
          Design for me isn't just a job — it's my way of leaving things better
          than I found them. And yes, that sounds noble, but honestly, I just hate
          crappy products.
        </p>
      </div>
    </div>
  </section>
);

export default ValuesSection;