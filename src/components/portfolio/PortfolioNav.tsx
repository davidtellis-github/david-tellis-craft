import React, { useEffect } from "react";

const categories = [
  { id: "all", label: "All" },
  { id: "product", label: "Product" },
  { id: "concepts", label: "Concepts" },
  { id: "ui-designs", label: "UI Designs" }
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
      className="hidden lg:block sticky  h-[calc(100vh-5rem)] w-[min(18rem,24vw)] z-[56]"
    >
      <div className="relative h-full flex flex-col gap-[14vh]">
        {/* Category Menu */} {/* --- Animated Logo --- */}
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
        p-0
         space-y-0 
         text-muted-foreground
         text-[clamp(12px,1.6vmin,16px)]
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