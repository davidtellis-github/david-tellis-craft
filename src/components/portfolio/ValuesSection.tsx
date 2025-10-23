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
    className=" grid grid-cols-1 grid-cols-2 grid-rows-3 lg:pt-[20vh] "
  >
    {/* Top Left: Big Values */}
    <div className="flex flex-col justify-start items-start h-full mb-6">
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

    {/* Top Right = empty (keeps spacing diagonal) */}
    <div />

    {/* Bottom Left = empty (keeps spacing diagonal) */}
    <div  />

    {/* Bottom Right: Paragraph */}
    <div className="flex justify-start items-start ">
      <p className="max-w-full text-md font-light leading-[1.4] tracking-loose text-foreground text-left">
      For me, design is about bringing clarity to ideas. It’s taking scattered thoughts and shaping them into something that feels natural and purposeful. Good design doesn’t need attention; it simply works and lets people focus on what matters.

I value clarity over cleverness and purpose over decoration. Every element, from layout to microinteraction, should have intent. I like creating products that feel simple to use, even when there is a lot of depth behind them.

My process starts with curiosity and understanding. I listen, question, and think before I design. I focus on how something will be used, not just how it looks.

I enjoy working with people who care about what they build. I welcome feedback that challenges me and collaboration that strengthens ideas.

In the end, I want my designs to feel honest, thoughtful, and lasting. The kind that quietly improves someone’s day without asking for attention.
      </p>
    </div>
    <div className="flex justify-start items-start ">
      <p className="grid grid-cols-1 max-w-full text-md font-light leading-[1.4] tracking-loose text-foreground text-left">
      I started exploring design through small experiments and self-taught projects, which slowly turned into a career that blends art, structure, and problem-solving. That mix of creativity and logic still drives everything I do.

My work ethic is simple: stay honest, stay curious, and finish what you start. I believe in putting thought behind every decision, no matter how small, and I try to keep my process transparent and collaborative. I don’t like rushing for the sake of output; I like building things that last and make sense.

Outside of design, I spend time sketching, observing people, collecting visuals, and learning how different forms of art connect with emotion and behavior. These habits keep my perspective fresh and remind me why I love creating in the first place.

Right now, I’m looking for opportunities that let me grow as a designer while working on products that have meaning and craft behind them. I want to keep learning, keep experimenting, and work with teams that value design as a shared responsibility, not just a department.      
      
    </p></div>
  </section>
);

export default ValuesSection;

