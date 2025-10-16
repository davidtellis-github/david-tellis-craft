import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const tabsData: { key: string; label: string; headline: React.ReactNode }[] = [
  {
    key: "anyone",
    label: "For anyone",
    headline: (
      <>
        Hello there, I’m a
designer who cares
about making
beautiful things that
help people.
      </>
    ),
  },
  {
    key: "recruiters",
    label: "Recruiters",
    headline: (
      <>
        2+ years designing fintech, <br></br>AI tools, marketplaces, and health apps. From landing pages to design systems—everything converts, scales, and ships.. I move fast, learn faster. You’ll want to pay me more.
      </>
    ),
  },
  {
    key: "directors",
    label: "Design Directors",
    headline: (
      <>
        Systems thinker with a high bar for quality; I build <span className="underline underline-offset-8 decoration-[hsl(var(--foreground)/0.4)]">scalable design systems</span> and partner deeply across functions.
      </>
    ),
  },
  {
    key: "designers",
    label: "Product Designers",
    headline: (
      <>
       Clean files, tighter systems, and zero drama. I juggle projects, stay curious, and talk dev. I know the rules, when to break them, and how to make it look good.
      </>
    ),
  },
  {
    key: "pms",
    label: "Product Managers",
    headline: (
      <>
 I won’t just tick boxes. I’ll fill the gaps, clean the chaos, and ship stuff that works in real life;<br></br> Ask nicely, and I’ll deliver ahead of schedule. 
        we’ll learn and ship together.      </>
    ),
  },
  {
    key: "engineers",
    label: "Engineers",
    headline: (
      <>
I’ve studied code and lived with designers—so I get both worlds. <br></br> I design with logic, label things right, and ask smart questions early.  </>
    ),
  },
];

const Hero: React.FC = () => {
  const [active, setActive] = React.useState<string>(tabsData[0].key);
  const activeLabel = tabsData.find((t) => t.key === active)?.label ?? "anyone";

  return (
    // <div id="intro" className="relative pt-24 lg:pt-[20vh]">
    //   <div
    //     aria-hidden
    //     className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(1000px_600px_at_70%_40%,hsl(var(--foreground)/0.05),transparent_60%)]"
    //   />
    //   <Tabs value={active} onValueChange={setActive} className="w-full text-left ">
    //     <TabsList className="h-auto p-0 bg-transparent border-0 flex flex-wrap  gap-6 justify-start text-sm text-muted-foreground">
    <div id="intro" className="relative min-h-screen flex flex-col justify-start py-[20vh]">
      <Tabs value={active} onValueChange={setActive} className="w-full text-left  gap-0">
        <TabsList  className="
    h-auto
    p-0
    bg-transparent
    border-0
    flex
    flex-nowrap         /* prevent wrapping */
    overflow-x-auto     /* horizontal scroll */
    gap-8
    justify-start
    
    text-[clamp(8px,1.6vmin,10px)]
    tracking-loose
     text-muted-foreground
            text-[clamp(12px,1.6vmin,16px)]
    leading-[0]
    font-light
    text-base
    text-muted-foreground
    scrollbar-hide      /* optional: hide scrollbar */
  "
> 
        
          {tabsData.map((t) => (
            <TabsTrigger
              key={t.key}
              value={t.key}
  className="px-0 py-0 bg-transparent  data-[state=active]:text-foreground data-[state=active] text-[clamp(12px,1.6vmin,16px)] text-light transition-colors"            >
              {t.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {tabsData.map((t) => (
          <TabsContent key={t.key} value={t.key} className="focus:outline-none">
<h1
  className="
    text-3xl           /* Default mobile size */
    sm:text-6xl         /* Small screens */
    md:text-6xl         /* Tablets */
    lg:text-7xl         /* Large screens */
    xl:text-7xl         /* Extra large screens */
    2xl:text-8xl        /* Very large screens */

    font-medium 
    tracking-tight

    leading-snug        /* Default line-height for mobile */
    sm:leading-tight     /* Slightly tighter on small screens */
    md:leading-[1.2]   /* Normal on medium and above */

    text-foreground 
    max-w-[90vw]
  "
>
  {t.headline}
</h1>
          </TabsContent>
        ))}
      </Tabs>

      <p className="
    h-auto
   
    bg-transparent
    
    flex
    flex-nowrap         /* prevent wrapping */
    overflow-x-auto     /* horizontal scroll */
    gap-8
    justify-start
    font-normal
    text-[clamp(8px,1.6vmin,10px)]
    tracking-loose
    leading-[0]
    text-base
    text-muted-foreground
   
  ">
        Currently open to impactful, product-focused opportunities — especially {activeLabel.toLowerCase()}.
      </p>
    </div>
  );
};

export default Hero;
