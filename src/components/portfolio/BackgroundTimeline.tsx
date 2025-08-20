// import React from "react";

// const roles = [
//   {
//     company: "Freelance",
//     title: "Product Designer",
//     time: "Now",
//     location: "Remote",
//     notes: "Partnering with teams to design clear, scalable product experiences.",
//   },
//   {
//     company: "Acme Health",
//     title: "Senior Product Designer",
//     time: "2022–2024",
//     location: "Seattle",
//     notes: "Led patient portal redesign; established cross-platform design system.",
//   },
//   {
//     company: "Nimbus Labs",
//     title: "Product Designer",
//     time: "2020–2022",
//     location: "Austin",
//     notes: "Built analytics workflows and improved onboarding conversion.",
//   },
// ];

// const BackgroundTimeline: React.FC = () => (
//   <section id="background" className="min-h-screen flex flex-col justify-center py-[20vh]">
//     <p className=" max-w-2xl lg:text-[clamp(12px,1.6vmin,16px)]  leading-tight text-foreground">
//       I make things that actually work — and work well. I’m allergic to “good enough,” “we’ll fix it later,” and anything that smells like it was designed for a presentation, not a human. I ask the awkward questions, obsess over the small details, and refuse to let a sloppy handoff ruin a solid design.
//       I’ll take feedback, but don’t expect me to nod politely if it’s based on “personal vibes” and not actual reasoning. I’ll push back, because the goal isn’t to make me look good, it’s to make the product unbreakable, intuitive, and worth using twice.
//       Design for me isn’t just a job — it’s my way of leaving things better than I found them. And yes, that sounds noble, but honestly, I just hate crappy products.
//     </p>
//     {/* <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-8">Background</h2> */}
//     <ol className="space-y-12">
//       {roles.map((r) => (
//         <li key={`${r.company}-${r.time}`} className="grid md:grid-cols-[120px_1fr] gap-6 items-start">
//           <div className="text-sm text-muted-foreground">{r.time}<span className="mx-2">•</span>{r.location}</div>
//           <div>
//             <div className="text-muted-foreground mb-1">{r.company}</div>
//             <h3 className="text-5xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal tracking-loose leading-[0] text-foreground max-w-5xl">{r.title}</h3>
//             <p className="pt-3 text-muted-foreground max-w-2xl">{r.notes}</p>
//           </div>
//         </li>
//       ))}
//     </ol>
//   </section>
// );

// export default BackgroundTimeline;
import React from "react";

const roles = [
 
  {
    company: "Turbostart",
    title: "Product Designer",
    time: "2024-Now",
    location: "Bengaluru",
    notes: "At Turbostart (Venture Capital), I worked on simplifying workflows, improving core features, and making the platform more user-friendly. Collaborating with stakeholders and developers pushed me to think beyond screens, sharpen my product mindset, and grow into a more confident designer who balances user needs with business goals.",
  },
  {
    company: "Freelance",
    title: "UI Designer",
    time: "2024",
    location: "Remote",
    notes: "I freelance as a UI designer—crafting clean, modern interfaces for brands and products. Freelancing has sharpened my visual design skills, adaptability, and client collaboration. Balancing both roles has helped me grow creatively while learning how to deliver designs that are not just aesthetic but practical and impactful.",
  },
   {
    company: "Marketing Agency",
    title: "Wordpress Designer",
    time: "2023",
    location: "Remote",
    notes: "Partnering with teams to design clear, scalable product experiences.",
  },
];

const BackgroundTimeline: React.FC = () => (
  <section
    id="background"
    className="min-h-screen flex flex-col justify-center pt-[20vh]"
  >
   <p className="max-w-lg text-sm sm:text-base md:text-lg lg:text-[clamp(16px,1.4vmin,18px)] leading-tight text-foreground text-left">
      I make things that actually work — and work well. I’m allergic to “good
      enough,” “we’ll fix it later,” and anything that smells like it was
      designed for a presentation, not a human. I ask the awkward questions,
      obsess over the smadesignll details, and refuse to let a sloppy handoff ruin a
      solid design.
      
      I’ll take feedback, but don’t expect me to nod politely if it’s based on
      “personal vibes” and not actual reasoning. I’ll push back, because the
      goal isn’t to make me look good, it’s to make the product unbreakable,
      intuitive, and worth using twice.
      
      Design for me isn’t just a job — it’s my way of leaving things better than
      I found them. And yes, that sounds noble, but honestly, I just hate crappy
      products.
    </p>


    <ol className="space-y-24 pt-[10vh]">
      {roles.map((r) => (
        <li
          key={`${r.company}-${r.time}`}
          className="flex flex-col md:grid grid-cols-[80vh_1fr] gap-[10vh] items-start  "
        >
          
          {/* Role Card */}
          <div className="space-y-4">
            {/* Company */}
            <div className="text-3xl sm:text-1xl lg:text-2xl text-foreground text-base mb-2">
              {r.company}
            </div>

            {/* Title */}
            <h3 className="text-5xl sm:text-6xl lg:text-7xl font-medium leading-tight text-foreground mb-3">
              {r.title}
            </h3>
             {/* Time + Location */}
          <div className="text-sm text-foreground ">
            {r.time} <span className="mx-1">•</span> {r.location}
          </div>

            {/* Notes */}
            <p className="max-w-1lg text-1xl sm:text-1xl lg:text-[clamp(16px,1.6vmin,18px)] text-muted-foreground leading-tight  text-base">
              {r.notes}
            </p>
          </div>
        </li>
      ))}
    </ol>
  </section>
);

export default BackgroundTimeline;
