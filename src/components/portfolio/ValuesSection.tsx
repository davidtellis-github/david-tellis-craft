// import React from "react";

// const words = ["Egoless.","Adaptive.","Curious.","Craft‑obsessed."];

// const ValuesSection: React.FC = () => (
//   <section id="values" className="min-h-screen grid justify-start pt-[20vh] gap-10">
//     <h2 className="sr-only">Values</h2>
//     <div className="space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-5 item-start ">
//       {words.map((w) => (
//         <div key={w} className="text-5xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal tracking-loose leading-[0] text-foreground max-w-5xl">{w}</div>
//       ))}
     
//     </div>
//     <p className="max-w-2xl lg:text-[clamp(12px,1.6vmin,16px)] leading-tight text-foreground  justify-end">
//       I make things that actually work — and work well. I’m allergic to “good enough,” “we’ll fix it later,” and anything that smells like it was designed for a presentation, not a human. I ask the awkward questions, obsess over the small details, and refuse to let a sloppy handoff ruin a solid design.
//       I’ll take feedback, but don’t expect me to nod politely if it’s based on “personal vibes” and not actual reasoning. I’ll push back, because the goal isn’t to make me look good, it’s to make the product unbreakable, intuitive, and worth using twice.
//       Design for me isn’t just a job — it’s my way of leaving things better than I found them. And yes, that sounds noble, but honestly, I just hate crappy products.
//     </p>
//   </section>
// );

// export default ValuesSection;
import React from "react";

const words = ["Egoless.", "Adaptive.", "Curious.", "Craft-obsessed."];

const ValuesSection: React.FC = () => (
  <section
    id="values"
    className="min-h-screen grid grid-cols-1 lg:grid-cols-2 grid-rows-2 lg:pt-[20vh] "
  >
    {/* Top Left: Big Values */}
    <div className="flex flex-col justify-start items-start space-y-1 sm:space-y-2 md:space-y-4">
      {words.map((w) => (
        <div
          key={w}
          className="text-5xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium tracking-loose leading-[0] text-foreground max-w-5xl"
        >
          {w}
        </div>
      ))}
    </div>

    {/* Top Right = empty (keeps spacing diagonal) */}
    <div />

    {/* Bottom Left = empty (keeps spacing diagonal) */}
    <div  />

    {/* Bottom Right: Paragraph */}
    <div className="flex justify-start items-start mb-0">
      <p className="max-w-lg text-sm sm:text-base md:text-lg lg:text-[clamp(16px,1.4vmin,18px)] leading-relaxed text-foreground text-left">
        I make things that actually work — and work well. I’m allergic to “good
        enough,” “we’ll fix it later,” and anything that smells like it was
        designed for a presentation, not a human. I ask the awkward questions,
        obsess over the small details, and refuse to let a sloppy handoff ruin a
        solid design.
        I’ll take feedback, but don’t expect me to nod politely if it’s based on
        “personal vibes” and not actual reasoning. I’ll push back, because the
        goal isn’t to make me look good, it’s to make the product unbreakable,
        intuitive, and worth using twice. 
        Design for me isn’t just a job — it’s my way of leaving things better
        than I found them. And yes, that sounds noble, but honestly, I just hate
        crappy products.
      </p>
    </div>
  </section>
);

export default ValuesSection;

