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
    <nav className="fixed left-8 top-1/2 -translate-y-1/2 z-50">
      <ul className="space-y-4 text-muted-foreground text-sm">
        {categories.map((category) => (
          <li key={category.id}>
            <button
              onClick={() => onCategoryChange(category.id)}
              onMouseEnter={() => onCategoryHover(category.id)}
              onMouseLeave={() => onCategoryHover(null)}
              className={`
                transition-all duration-300 cursor-pointer text-left
                hover:text-foreground
                ${activeCategory === category.id
                  ? "text-foreground font-medium scale-110"
                  : ""
                }
              `}
            >
              {category.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TimelineNav;