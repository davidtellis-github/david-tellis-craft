import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const tabsData: {
  key: string;
  label: string;
  headline: React.ReactNode;
}[] = [{
  key: "anyone",
  label: "For anyone",
  headline: <>Hey there, I design<br />digital experiences<br />that work beautifully<br />and make sense.</>
}, {
  key: "recruiters",
  label: "Recruiters",
  headline: <>Over 2 years of experience<br />designing products, strategy, visuals<br />and making human interaction pleasant.</>
}, {
  key: "directors",
  label: "Design Directors",
  headline: <>I love solving problems<br />with design keeping it consistent<br />and caring about my craft<br />like an artist.</>
}, {
  key: "designers",
  label: "Product Designers",
  headline: <>Curious to new trends<br />and best practices, always<br />in the state of learning.<br />Lately improving my documentation.</>
}, {
  key: "pms",
  label: "Product Managers",
  headline: <>I understand development,<br />and I get what needs to be built,<br />why it matters. I bridge between<br />vision, design, and dev.</>
}, {
  key: "engineers",
  label: "Engineers",
  headline: <>I've studied computers<br />and practicing design,<br />so I get both worlds.</>
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
              className="px-0 py-0 bg-transparent data-[state=active]:text-foreground text-[clamp(12px,1.6vmin,16px)] text-light transition-colors"
            >
              {t.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {tabsData.map(t => (
          <TabsContent key={t.key} value={t.key} className="focus:outline-none">
            <h1 className="text-[clamp(2.5rem,6vw,9rem)] font-medium tracking-tight leading-[1.1] text-foreground max-w-[90vw]">
              {t.headline}
            </h1>
          </TabsContent>
        ))}

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
