import React from "react";
import { useCategories } from "@/hooks/useProjects";

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
  const { categories, loading } = useCategories();

  // Build categories list with "All" option
  const allCategories = [
    { id: "all", name: "All", slug: "all" },
    ...categories
  ];

  if (loading) {
    return (
      <nav
        aria-label="Portfolio navigation"
        className="hidden lg:block sticky top-0 h-[calc(100vh-5rem)] w-[min(18rem,24vw)] z-[56]"
      >
        <div className="relative h-full flex flex-col gap-[14vh]">
          <a
            href="#intro"
            aria-label="Home"
            className="pt-10 leading-none select-none text-foreground 
                       text-[clamp(20px,4vmin,32px)]  font-normal flex group relative"
          >
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
          
          <ul className="space-y-0 text-muted-foreground text-[clamp(12px,1.6vmin,16px)]">
            {[...Array(6)].map((_, index) => (
              <li key={index}>
                <div className="w-20 h-4 bg-muted rounded animate-pulse mb-2"></div>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    );
  }

  return (
    <nav
      aria-label="Portfolio navigation"
      className="block sticky top-0 h-auto lg:h-[calc(100vh-5rem)] w-full lg:w-[min(18rem,24vw)] z-[56]"
    >
      {/* Mobile horizontal scrollable navigation */}
      <div className="lg:hidden w-full overflow-x-auto py-4 px-4 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="flex gap-4 min-w-max">
          <a
            href="#intro"
            aria-label="Home"
            className="text-foreground text-lg font-normal whitespace-nowrap"
          >
            David Tellis
          </a>
          <div className="flex gap-4 text-sm">
            {allCategories.map((category) => (
              <button
                key={category.slug}
                onClick={() => onCategoryChange(category.slug)}
                className={`
                  whitespace-nowrap px-3 py-1 rounded-full transition-colors
                  ${
                    activeCategory === category.slug
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }
                `}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Desktop navigation */}
      <div className="hidden lg:block relative h-full flex flex-col gap-[14vh]">
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
          {allCategories.map((category) => (
            <li key={category.slug}>
              <button
                onClick={() => onCategoryChange(category.slug)}
                onMouseEnter={() => onCategoryHover(category.slug)}
                onMouseLeave={() => onCategoryHover(null)}
                className={`
                  transition-colors 
                  hover:text-foreground 
                  cursor-pointer
                  ${
                    activeCategory === category.slug
                      ? "text-foreground font-normal"
                      : ""
                  }
                `}
              >
                {category.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default TimelineNav;