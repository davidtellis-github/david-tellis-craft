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
I didn’t really plan on becoming a designer. I sort of found my way into it.

I started by messing around with things, making small projects, figuring out why something looked wrong, then trying to fix it. At some point, I realised I was spending more time thinking about how things worked and felt than I was thinking about what I was supposed to be doing.

A lot of what I learned also came from the designers around me. Having friends who are designers has probably influenced me more than any design course could. We argue about tiny things that nobody else would notice, send each other references at ridiculous hours, question why something was designed a certain way, and occasionally convince each other that a completely unnecessary detail is extremely important.  </p>  </div>
    <div className="flex justify-start items-start ">
      <p className="grid grid-cols-1 max-w-full text-md font-light leading-[1.4] tracking-loose text-foreground text-left">
I like that part of design. The conversations, the disagreements, the trying things, getting it wrong, and figuring out why something works. I like starting with a vague idea and slowly turning it into something that feels obvious once it's there.

Over time, design became less about making things look good and more about figuring things out. What is the actual problem? What are people trying to do? What can we make simpler? What is worth building in the first place?

I still really enjoy the visual side of it. I like type, layouts, motion, little details and spending far too long moving something two pixels. But the best part for me is when all of that starts serving an idea instead of just sitting there looking nice.

That's probably why I'm still designing. I like making things, but I like figuring things out even more.    </p></div>
  </section>
  
  </div>
);

export default ValuesSection;

