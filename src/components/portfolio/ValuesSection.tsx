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

const words = ["Fun.","Curious.", "Adaptive.","Passionate." ];

const ValuesSection: React.FC = () => (
  
  <section
    id="values"
    className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-3 gap-8 lg:gap-0 py-12 sm:py-16 lg:py-[20vh]"
  >
    {/* Top Left: Big Values */}
    <div className="flex flex-col justify-start items-start h-full lg:col-start-1 lg:row-start-1">
      {words.map((w) => (
        <div
          key={w}
          className="
          text-4xl           /* Default mobile size */
          sm:text-4xl         /* Small screens */
          md:text-6xl         /* Tablets */
          lg:text-7xl         /* Large screens */
          xl:text-7xl         /* Extra large screens */
          2xl:text-8xl        /* Very large screens */
      
          font-medium 
          tracking-tight
      
          leading-snug        /* Default line-height for mobile */
          sm:leading-snug     /* Slightly tighter on small screens */
          md:leading-tight   /* Normal on medium and above */
      
          text-foreground 
          
        "
        >
          {w}
        </div>
      ))}
    </div>

    {/* Top Right = empty (keeps spacing diagonal on desktop) */}
    <div className="hidden lg:block" />

    {/* Bottom Left = empty (keeps spacing diagonal on desktop) */}
    <div className="hidden lg:block" />

    {/* Bottom Right: Paragraph */}
    <div className="flex justify-start items-start lg:col-start-2 lg:row-start-3">
      <p className="max-w-full text-md font-light leading-[1.4] tracking-loose text-foreground text-left">
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
    <div className="flex justify-start items-start lg:col-start-1 lg:row-start-4">
      <p className="max-w-full text-md font-light leading-[1.4] tracking-loose text-foreground text-left">
   I studied visual communication design, got my start in branding, marketing, and web design, then evolved to specialize in product design. Leveraging my visual design foundation and deep user empathy, I’ve established myself as a well rounded design leader who creates human-centered platforms with cohesive throughlines at every touchpoint: from vision and strategy, to brand awareness and marketing, to product development and delightful micro interactions. Throughout my 15 years of professional experience, I’ve worked freelance, in-house, at startups, and at established public companies, developing a wide range of multi-disciplinary skills in diverse contexts. My insatiable curiosity, high craft, and adaptability, enable me to generate impact in our ever-changing environment.
      
      
    </p></div>
  </section>
);

export default ValuesSection;

