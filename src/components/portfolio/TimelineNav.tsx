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
  // Define fixed categories for project filtering
  const allCategories = [{
    id: 'all',
    name: 'All',
    slug: 'all'
  }, {
    id: 'product',
    name: 'Product',
    slug: 'product'
  }, {
    id: 'concepts',
    name: 'Concepts',
    slug: 'concepts'
  }];

  // Section navigation items
  const sections = [{
    id: 'projects',
    name: 'Projects'
  }, {
    id: '3d-gallery',
    name: '3D Gallery'
  }, {
    id: 'ui-designs-gallery',
    name: 'UI Designs'
  }];
  const handleCategoryClick = (category: string) => {
    onCategoryChange(category);
  };
  const handleSectionClick = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };
  return <nav aria-label="Portfolio navigation" className="flex flex-col hidden lg:block sticky top-0 h-svh w-[min(18rem,24vw)]">
      <div className="relative h-full flex flex-col gap-[14vh]">
        {/* --- Animated Logo --- */}
       <Link to="/" aria-label="Home" className="pt-10 leading-none select-none text-foreground 
             text-[clamp(20px,4vmin,32px)]  font-normal flex group relative">
  {/* Always-visible "D" */}
    <span className="inline-block">D</span>
  <span className="
      inline-block opacity-0
      group-hover:animate-spreadOut
      group-hover:opacity-100
    ">
    avid Tellis
  </span>
      </Link>
        {/* --- Section Navigation --- */}
        <ul className="
            space-y-0
            text-muted-foreground
            text-[clamp(12px,1.6vmin,16px)]
          ">
          {sections.map(section => <li key={section.id}>
              <button onClick={() => handleSectionClick(section.id)} className="transition-colors hover:text-foreground cursor-pointer">
                {section.name}
              </button>
            </li>)}
        </ul>

        {/* --- Category Filters --- */}
        <ul className="
            space-y-0
            text-muted-foreground
            text-[clamp(12px,1.6vmin,16px)]
          ">
          
          {allCategories.map(category => {})}
        </ul>
      </div>
    </nav>;
};
export default TimelineNav;