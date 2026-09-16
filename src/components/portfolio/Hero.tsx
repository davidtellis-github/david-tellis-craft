import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const tabsData: {
  key: string;
  label: string;
  headline: React.ReactNode;
}[] = [ {
  key: "recruiters",
  label: "Recruiters",
  headline: <>I'm David Tellis <br></br><span >I design and build digital products, from early ideas to the details that bring them to life</span></>
}, {
  key: "designers",
  label: "Product Designers",
  headline: <span >I care about the final screens. But mostly, I care about why they ended up looking like that.</span>
}, {
  key: "pms",
  label: "Founders",
  headline: <span >I design products by figuring out what actually needs solving.</span>
}, {
  key: "engineers",
  label: "Engineers",
  headline: <span >I've studied computers and practicing design, so I get both worlds.</span>
}];

const Hero: React.FC = () => {
  const [active, setActive] = React.useState<string>(tabsData[0].key);
  const activeLabel = tabsData.find(t => t.key === active)?.label ?? "anyone";
  
  return (
    <div id="intro" className="relative min-h-screen flex flex-col justify-start py-[20vh]">
      <Tabs value={active} onValueChange={setActive} className="w-full text-left gap-0">
        <TabsList className="
          h-auto
          p-0
          bg-transparent
          border-0
          flex
          flex-nowrap
          overflow-x-auto
          gap-8
          justify-start
          text-[clamp(12px,1.6vmin,16px)]
          tracking-loose
          leading-[0]
          font-light
          text-base
          text-muted-foreground
          scrollbar-hide
        ">
          {tabsData.map(t => (
            <TabsTrigger
              key={t.key}
              value={t.key}
              onMouseEnter={() => setActive(t.key)}
              className="interactive px-0 py-0 bg-transparent data-[state=active]:text-foreground text-[clamp(12px,1.6vmin,16px)] text-light transition-colors flex flex-col items-center gap-1"
            >
              {t.label}
              <span className="w-1 h-1 rounded-full bg-foreground transition-opacity lg:hidden data-[state=active]:opacity-100 opacity-0" data-state={active === t.key ? 'active' : 'inactive'} />
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="mt-4 lg:mt-0">
          {tabsData.map(t => (
            <TabsContent key={t.key} value={t.key} className="focus:outline-none">
              <h1 className="text-[clamp(2.2rem,5.4vw,8rem)] font-medium tracking-tight leading-[1.1] text-foreground max-w-[18ch]">
                {t.headline}
              </h1>
            </TabsContent>
          ))}
        </div>

        <p className="
          h-auto
          bg-transparent
          flex
          flex-nowrap
          overflow-x-auto
          gap-8
          justify-start
          font-normal
          text-[clamp(8px,1.6vmin,10px)]
          tracking-loose
          leading-[0]
          text-base
          text-muted-foreground
        ">
          Currently open to impactful, product-focused opportunities — especially.
        </p>
      </Tabs>
    </div>
  );
};

export default Hero;
