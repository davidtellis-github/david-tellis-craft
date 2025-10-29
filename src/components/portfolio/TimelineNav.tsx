import React from "react";
import { Link } from "react-router-dom";

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
  // Define fixed categories
  const allCategories = [
    { id: 'all', name: 'All', slug: 'all' },
    { id: 'product', name: 'Product', slug: 'product' },
    { id: 'concepts', name: 'Concepts', slug: 'concepts' },
    { id: 'ui-designs', name: 'UI Designs', slug: 'ui-designs' }
  ];

  const handleClick = (category: string) => {
    onCategoryChange(category);
    
    // Scroll to UI Designs gallery if that category is clicked
    if (category === 'ui-designs') {
      const gallerySection = document.getElementById('ui-designs-gallery');
      if (gallerySection) {
        gallerySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };


  return (
    <nav
      aria-label="Portfolio navigation"
      className="flex flex-col hidden lg:block sticky top-0 h-svh w-[min(18rem,24vw)]"
    >
      <div className="relative h-full flex flex-col gap-[14vh]">
        {/* --- Animated Logo --- */}
       <Link
  to="/"
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
</Link>
        <ul
          className="
            sticky z-99
            space-y-0
            text-muted-foreground
            text-[clamp(12px,1.6vmin,16px)]
          "
        >
          {allCategories.map((category) => (
            <li key={category.slug}>
              <button
                onClick={() => handleClick(category.slug)}
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