import React, { useEffect, useState } from "react";

const categories = [
  { id: "b2c", label: "B2C" },
  { id: "ai", label: "AI" },
  { id: "healthcare", label: "Healthcare" },
  { id: "finops", label: "Finops" },
  { id: "webdesigns", label: "Web designs" },
  { id: "interactions", label: "Interactions" },
  { id: "b2b", label: "B2B" },
];

interface PortfolioNavProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const PortfolioNav: React.FC<PortfolioNavProps> = ({ activeCategory, onCategoryChange }) => {
  // Track active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = categories.map(cat => document.getElementById(`category-${cat.id}`));
      const scrollPosition = window.scrollY + window.innerHeight * 0.3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          onCategoryChange(categories[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [onCategoryChange]);

  const handleClick = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    onCategoryChange(id);
    
    // Scroll to specific category section
    const categorySection = document.getElementById(`category-${id}`);
    if (categorySection) {
      categorySection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav
      aria-label="Portfolio navigation"
      className="hidden lg:block sticky top-0 h-svh w-[min(18rem,24vw)]"
    >
      <div className="relative h-full flex flex-col gap-[14vh]">
        {/* Category Menu */}
        <ul
          className="
            space-y-1 
            text-muted-foreground
            text-[clamp(12px,1.6vmin,16px)]
            pt-10
          "
        >
          {categories.map((category) => (
            <li key={category.id}>
              <a
                href={`#${category.id}`}
                onClick={handleClick(category.id)}
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
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default PortfolioNav;