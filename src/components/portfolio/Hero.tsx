import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const tabsData: { key: string; label: string; headline: React.ReactNode }[] = [
  {
    key: "anyone",
    label: "For anyone",
    headline: (
      <>
        I’m a who creates <span className="underline underline-offset-8 decoration-[hsl(var(--foreground)/0.4)]">digital products</span> and inspiring interfaces to help startups and business owners.
      </>
    ),
  },
  {
    key: "recruiters",
    label: "Recruiters",
    headline: (
      <>
        I ship clear, reliable design work—<span className="underline underline-offset-8 decoration-[hsl(var(--foreground)/0.4)]">from process to pixels</span>—that helps teams move faster.
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
        Collaborative and pragmatic—strong in IA, flows, and component architecture; <span className="underline underline-offset-8 decoration-[hsl(var(--foreground)/0.4)]">we’ll learn and ship</span> together.
      </>
    ),
  },
  {
    key: "pms",
    label: "Product Managers",
    headline: (
      <>
        I turn ambiguous problems into crisp decisions and <span className="underline underline-offset-8 decoration-[hsl(var(--foreground)/0.4)]">measurable outcomes</span>.
      </>
    ),
  },
  {
    key: "engineers",
    label: "Engineers",
    headline: (
      <>
        Thoughtful partner who sweats details and constraints—<span className="underline underline-offset-8 decoration-[hsl(var(--foreground)/0.4)]">production-ready design</span> that respects the system.
      </>
    ),
  },
];

const Hero: React.FC = () => {
  const [active, setActive] = React.useState<string>(tabsData[0].key);
  const activeLabel = tabsData.find((t) => t.key === active)?.label ?? "anyone";

  return (
    <header id="intro" className="relative min-h-screen flex flex-col justify-center py-32">
      <Tabs value={active} onValueChange={setActive} className="w-full text-left">
        <TabsList className="h-auto p-0 bg-transparent border-0 flex flex-wrap gap-8 justify-start text-base text-muted-foreground mb-12">
          {tabsData.map((t) => (
            <TabsTrigger
              key={t.key}
              value={t.key}
              className="px-0 py-2 bg-transparent text-base data-[state=active]:text-foreground data-[state=active]:font-medium transition-colors"
            >
              {t.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {tabsData.map((t) => (
          <TabsContent key={t.key} value={t.key} className="focus:outline-none">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-normal tracking-tight leading-[0.9] text-foreground max-w-5xl">
              {t.headline}
            </h1>
          </TabsContent>
        ))}
      </Tabs>
    </header>
  );
};

export default Hero;
