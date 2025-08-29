import React, { useState } from "react";

interface Project {
  id: string;
  year: string;
  title: string;
  services: string;
  category: string;
}

interface ProjectTimelineProps {
  activeCategory: string;
  onProjectHover: (projectId: string | null) => void;
  hoveredCategory?: string | null;
}

const projects: Project[] = [
  {
    id: "wedding-verse",
    year: "2024",
    title: "Wedding Verse",
    services: "Strategy + Design + Engineering",
    category: "b2c"
  },
  {
    id: "futurcraft-ai",
    year: "2025",
    title: "Futurcraft AI",
    services: "Strategy + Design + Engineering",
    category: "ai"
  },
  {
    id: "turbocloud",
    year: "2025",
    title: "Turbocloud",
    services: "Strategy + Design + Engineering",
    category: "finops"
  },
  {
    id: "health-project",
    year: "2024",
    title: "HealthCare Platform",
    services: "Strategy + Design",
    category: "healthcare"
  },
  {
    id: "project-alpha",
    year: "2024",
    title: "Project Alpha",
    services: "Strategy + Design + Engineering",
    category: "b2c"
  },
  {
    id: "web-design-1",
    year: "2024",
    title: "Corporate Website",
    services: "Strategy + Design",
    category: "webdesigns"
  },
  {
    id: "ui-exploration-1",
    year: "2024",
    title: "UI Exploration #1",
    services: "Strategy + Design + Engineering",
    category: "interactions"
  },
  {
    id: "ui-exploration-2",
    year: "2024",
    title: "UI Exploration #2",
    services: "Strategy + Design + Engineering",
    category: "interactions"
  },
  {
    id: "project-beta",
    year: "2023",
    title: "Project Beta",
    services: "Strategy + Design + Engineering",
    category: "b2b"
  }
];

const ProjectTimeline: React.FC<ProjectTimelineProps> = ({ 
  activeCategory, 
  onProjectHover,
  hoveredCategory
}) => {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  const filteredProjects = activeCategory === "all" 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  // Show all projects when hovering a category, otherwise filter by active category
  const displayedProjects = hoveredCategory 
    ? projects 
    : filteredProjects;

  const handleProjectHover = (projectId: string | null) => {
    setHoveredProject(projectId);
    onProjectHover(projectId);
  };

  return (
    <div className="w-full">
      <div className="space-y-8">
        {displayedProjects.map((project, index) => {
          const isHighlighted = hoveredProject === project.id || 
            (hoveredCategory && (hoveredCategory === "all" || project.category === hoveredCategory)) ||
            activeCategory === project.category;
          
          return (
            <div 
              key={project.id}
              className={`border-t border-border pt-8 first:border-t-0 first:pt-0 transition-all duration-500 ${
                isHighlighted ? 'opacity-100' : 'opacity-50 hover:opacity-75'
              }`}
              onMouseEnter={() => handleProjectHover(project.id)}
              onMouseLeave={() => handleProjectHover(null)}
            >
              {/* Title Row - Full Width */}
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-8">
                  {/* Number */}
                  <div className="text-2xl font-bold text-muted-foreground">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-2xl lg:text-3xl font-bold uppercase tracking-tight">
                    {project.title}
                  </h3>
                </div>
                
                {/* Services */}
                <div className="text-right">
                  <span className="text-muted-foreground">
                    {project.services}
                  </span>
                </div>
              </div>

              {/* Year */}
              <div className="mt-4 ml-16">
                <span className="text-sm text-muted-foreground">
                  {project.year}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectTimeline;