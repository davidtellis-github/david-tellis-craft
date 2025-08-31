import React from "react";

const categories = [
  { id: "all", label: "All" },
  { id: "b2c", label: "B2C" },
  { id: "ai", label: "AI" },
  { id: "healthcare", label: "Healthcare" },
  { id: "finops", label: "Finops" },
  { id: "webdesigns", label: "Web designs" },
  { id: "interactions", label: "Interactions" },
  { id: "b2b", label: "B2B" },
];

interface TimelineNavProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  hoveredProject?: string | null;
  onCategoryHover: (category: string | null) => void;
}

const TimelineNav: React.FC<TimelineNavProps> = ({ 
  activeCategory, 
  onCategoryChange,
  hoveredProject,
  onCategoryHover
}) => {
  return (
    <nav
      aria-label="Portfolio navigation"
      className="hidden lg:block sticky top-0 h-[calc(100vh-5rem)] w-[min(18rem,24vw)] z-[56]"
    >
      <div className="relative h-full flex flex-col gap-[14vh]">
        {/* Category Menu */}
        {/* --- Animated Logo --- */}
       <a
  href="#intro"
  aria-label="Home"
  className="pt-10 leading-none select-none text-foreground 
             text-[clamp(20px,4vmin,32px)]  font-normal flex group relative"
>
  {/* Always-visible "D" */}
    <span className="inline-block">D</span>
  <span
    className="
      inline-block opacity-0
      group-hover:animate-spreadOut
      group-hover:opacity-100
    "
  >
    avid Tellis
  </span>
</a>
        <ul
          className="
            space-y-0
            text-muted-foreground
            text-[clamp(12px,1.6vmin,16px)]
            
          "
        >
          {categories.map((category) => (
            <li key={category.id}>
              <button
                onClick={() => onCategoryChange(category.id)}
                onMouseEnter={() => onCategoryHover(category.id)}
                onMouseLeave={() => onCategoryHover(null)}
                className={`
                  transition-colors 
                  hover:text-foreground 
                  cursor-pointer
                  ${
                    activeCategory === category.id
                      ? "text-foreground font-normal"
                      : ""
                  }
                `}
              >
                {category.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default TimelineNav;