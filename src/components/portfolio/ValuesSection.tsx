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

<div className="">
      <div className="flex sm:hidden flex-col justify-start items-start mb-6">
      {words.map((w) => (
        <div
          key={w}
          className="
          text-5xl           /* Default mobile size */
          sm:text-4xl         /* Small screens */
          
          font-medium 
          tracking-tight
          
      
          leading-tight        /* Default line-height for mobile */
          sm:leading-snug     /* Slightly tighter on small screens */
          md:leading-tight   /* Normal on medium and above */
      
          text-foreground 
          
        "
        >
          {w}
        </div>
      ))}
    </div>


    
  
  <section
    id="values"
    className=" grid grid-cols-1 sm:grid-cols-2 grid-rows-2 lg:pt-[20vh] "
  >
    {/* Top Left: Big Values */}
      <div className="hidden sm:flex flex flex-col justify-start items-start mb-6 h-fit">
      {words.map((w) => (
        <div
          key={w}
          className="
         
          md:text-6xl         /* Tablets */
          lg:text-7xl         /* Large screens */
          xl:text-8xl         /* Extra large screens */
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

    {/* Top Right = empty (keeps spacing diagonal) */}
    <div className="hidden sm:flex h-fit"/>

    {/* Bottom Left = empty (keeps spacing diagonal) */}
    <div className="hidden sm:flex"/>

    {/* Bottom Right: Paragraph */}
    <div className="flex justify-start items-start ">
      <p className="max-w-full text-md font-light leading-[1.4] tracking-loose text-foreground text-left">
      For me, design is really about clarity — taking scattered, half-formed ideas and shaping them into something that feels obvious in hindsight. I care more about clarity than cleverness, and about purpose than decoration. The best design doesn't ask for attention; it just works, and quietly gets out of the way so people can get on with what they came to do. That instinct comes from watching how people actually behave — where they hesitate, what they reach for, what makes something feel effortless. So I start every project by listening and understanding before I touch a screen. I want to know how a thing will be used, not just how it looks. And I do my best work alongside people who care about what they're building — the ones who'll challenge an idea and make it stronger. In the end, I want the things I design to feel honest, considered, and built to last: the kind that make someone's day a little better without ever announcing themselves.</p>
    </div>
    <div className="flex justify-start items-start ">
      <p className="grid grid-cols-1 max-w-full text-md font-light leading-[1.4] tracking-loose text-foreground text-left">
      I came to design sideways — through small experiments and self-taught projects that slowly grew into a career blending art, structure, and problem-solving. That mix of creativity and logic is still what pulls me in. My approach is simple: stay honest, stay curious, and finish what I start. I like putting real thought behind every decision, however small, and I work at keeping my process open — making my reasoning something a teammate can actually follow, not just something that makes sense inside my own head. I'd rather build something that lasts and holds together than rush to have something to show. A lot of that comes from life outside of work: I sketch, I watch how people move through the world, I collect visuals, and I'm endlessly curious about how art shapes what we feel and do. Those habits keep my eye fresh and remind me why I started. Right now, I'm looking for work that lets me grow while building products with real meaning and craft behind them — with teams who treat design as a shared responsibility, not a department.
    </p></div>
  </section>
  
  </div>
);

export default ValuesSection;

