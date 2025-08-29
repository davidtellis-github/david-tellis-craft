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
    <div className="max-w-4xl mx-auto">
      <div className="space-y-0">
        {displayedProjects.map((project, index) => (
          <div
            key={project.id}
            className={`
              grid grid-cols-12 gap-8 py-4 border-b border-border/20
              transition-all duration-300 cursor-pointer
              ${hoveredProject === project.id || 
                (hoveredCategory && (hoveredCategory === "all" || project.category === hoveredCategory)) ||
                activeCategory === project.category 
                ? 'text-foreground bg-muted/10' 
                : 'text-muted-foreground hover:text-foreground'
              }
            `}
            onMouseEnter={() => handleProjectHover(project.id)}
            onMouseLeave={() => handleProjectHover(null)}
          >
            {/* Year */}
            <div className="col-span-2 text-left">
              <span className="text-sm font-medium">
                {project.year}
              </span>
            </div>
            
            {/* Project Title */}
            <div className="col-span-6 text-left">
              <h3 className="text-lg font-medium">
                {project.title}
              </h3>
            </div>
            
            {/* Services */}
            <div className="col-span-4 text-left">
              <span className="text-sm">
                {project.services}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectTimeline;