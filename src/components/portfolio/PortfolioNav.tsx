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
  const [isVisible, setIsVisible] = useState(false);

  // Show navigation after scrolling past the featured project
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      // Show nav after scrolling past ~80% of viewport (roughly where featured project ends)
      setIsVisible(scrollPosition > windowHeight * 0.8);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      className={`hidden lg:block sticky top-0 h-svh w-[min(18rem,24vw)] ml-6 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="relative h-full flex flex-col gap-[14vh]">
        {/* Logo */}
        <a
          href="/"
          aria-label="Home"
          className="pt-10 leading-none select-none text-foreground 
                     text-[clamp(20px,4vmin,32px)] font-normal flex group relative"
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

        {/* Category Menu */}
        <ul
          className="
            space-y-1 
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