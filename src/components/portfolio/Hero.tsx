import React from "react";
import { Badge } from "@/components/ui/badge";

const audience = [
  "For anyone",
  "Recruiters",
  "Design Directors",
  "Product Designers",
  "Product Managers",
  "Engineers",
];

const Hero: React.FC = () => {
  const [active, setActive] = React.useState(audience[3]);

  return (
    <header id="intro" className="pt-16 lg:pt-24">
      <div className="mb-6 flex flex-wrap gap-2 text-sm text-muted-foreground">
        {audience.map((a) => (
          <button
            key={a}
            onClick={() => setActive(a)}
            className="focus:outline-none"
            aria-pressed={active === a}
          >
            <Badge variant={active === a ? "secondary" : "outline"}>{a}</Badge>
          </button>
        ))}
      </div>
      <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tight leading-[1.05] text-foreground">
        I’m a systems thinker with a high bar for quality. From process to pixels, I’ll collaborate with you, learn from you, and help make something we’re proud of.
      </h1>
      <p className="mt-6 text-lg text-muted-foreground">
        Currently open to impactful, product-focused opportunities — especially {active.toLowerCase()}.
      </p>
    </header>
  );
};

export default Hero;
