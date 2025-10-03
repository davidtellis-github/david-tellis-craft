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
      className="hidden lg:flex lg:flex-col sticky top-0 h-svh w-[min(18rem,24vw)]"
    >
      <div className="relative h-full flex flex-col gap-[14vh]">
        {/* --- Animated Logo --- */}
       <a
  href="#intro"
  aria-label="Home"
  className="sticky top-10 pt-10 leading-none select-none text-foreground 
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
            sticky top-[35vh]
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