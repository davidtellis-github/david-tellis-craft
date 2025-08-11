import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const tabsData: { key: string; label: string; headline: React.ReactNode }[] = [
  {
    key: "anyone",
    label: "For anyone",
    headline: (
      <>
        I’m a designer who creates <span className="underline underline-offset-8 decoration-[hsl(var(--foreground)/0.4)]">digital products</span> and inspiring interfaces to help startups and business owners.
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
    <header id="intro" className="relative pt-16 lg:pt-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(1000px_600px_at_70%_40%,hsl(var(--foreground)/0.05),transparent_60%)]"
      />

      <div className="mb-4 text-sm text-muted-foreground">Hello there,</div>

      <Tabs value={active} onValueChange={setActive} className="w-full text-left pt-4">
        <TabsList className="h-auto p-0 bg-transparent border-0 flex flex-wrap gap-6 justify-start text-sm text-muted-foreground">
          {tabsData.map((t) => (
            <TabsTrigger
              key={t.key}
              value={t.key}
              className="px-0 py-1 bg-transparent data-[state=active]:text-foreground data-[state=active]:underline data-[state=active]:underline-offset-8 data-[state=active]:decoration-[hsl(var(--foreground)/0.6)]"
            >
              {t.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {tabsData.map((t) => (
          <TabsContent key={t.key} value={t.key} className="mt-6 focus:outline-none">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.1] text-foreground">
              {t.headline}
            </h1>
          </TabsContent>
        ))}
      </Tabs>

      <p className="mt-6 text-lg text-muted-foreground">
        Currently open to impactful, product-focused opportunities — especially {activeLabel.toLowerCase()}.
      </p>
    </header>
  );
};

export default Hero;
