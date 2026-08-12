import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProjects } from "@/hooks/useProjects";
import { useSanityProjectFeaturedImages } from "@/hooks/useSanityProjectFeaturedImages";

interface ProjectTimelineProps {
  activeCategory: string;
  onProjectHover: (projectId: string | null) => void;
  hoveredCategory?: string | null;
}

// LIVE reads as more prominent (solid chip) than the two unshipped-work
// statuses, which stay as a quieter outline overlay.
const statusBadgeClasses: Record<string, string> = {
  LIVE: "bg-foreground text-background border-transparent",
  "CASE STUDY": "bg-background/70 text-foreground border-border/50 backdrop-blur-sm",
  SYSTEM: "bg-background/70 text-foreground border-border/50 backdrop-blur-sm",
};

const ProjectTimeline: React.FC<ProjectTimelineProps> = ({
  activeCategory,
  onProjectHover,
  hoveredCategory
}) => {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const navigate = useNavigate();
  const { projects, loading, error } = useProjects();
  // Same resolution order as the homepage WorkGrid: a curated Sanity
  // thumbnail first, falling back to the static featured asset.
  const { byId: sanityFeaturedById } = useSanityProjectFeaturedImages(projects.map((p) => p.slug));

  if (loading) {
    return (
      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
          {[...Array(6)].map((_, index) => (
            <div key={index}>
              <div className="flex items-center justify-between w-full">
                <div className="w-48 h-8 bg-muted rounded animate-pulse"></div>
                <div className="w-32 h-6 bg-muted rounded animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full">
        <div className="text-center text-muted-foreground">
          Error loading projects: {error}
        </div>
      </div>
    );
  }

  const filteredProjects = activeCategory === "all" 
    ? projects 
    : projects.filter(project => project.category?.slug === activeCategory);

  // Show all projects when hovering a category, otherwise filter by active category
  const displayedProjects = hoveredCategory 
    ? projects 
    : filteredProjects;

  const handleProjectHover = (projectId: string | null) => {
    setHoveredProject(projectId);
    onProjectHover(projectId);
  };

  const handleProjectClick = (projectSlug: string) => {
    navigate(`/project/${projectSlug}`);
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 lg:gap-y-16">
        {displayedProjects.map((project) => {
          const isHighlighted = hoveredProject === project.id ||
            (hoveredCategory && (hoveredCategory === "all" || project.category?.slug === hoveredCategory)) ||
            activeCategory === project.category?.slug;

          const featuredAsset =
            project.assets.find((asset) => /featured/i.test(asset.file_name ?? asset.file_path ?? "")) ||
            project.assets.find((asset) => asset.is_featured) ||
            project.assets[0];
          const previewSrc = sanityFeaturedById[project.slug] || featuredAsset?.file_path;

          return (
            <div
              key={project.id}
              className={`group transition-all duration-500 cursor-pointer interactive ${
                isHighlighted ? 'opacity-100' : 'opacity-50 hover:opacity-75'
              }`}
              onMouseEnter={() => handleProjectHover(project.id)}
              onMouseLeave={() => handleProjectHover(null)}
              onClick={() => handleProjectClick(project.slug)}
            >
              {/* Header: Title Row */}
              <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 w-full">
                {/* Title */}
                <h3 className="text-xl lg:text-2xl font-medium uppercase tracking-tight">
                  {project.title}
                </h3>

                {/* Services */}
                <div className="text-right">
                  <span className="text-muted-foreground">
                    {project.services}
                  </span>
                </div>
              </div>

              {/* Role + Year */}
              {(project.card_role || project.year) && (
                <p className="mt-2 text-xs text-muted-foreground">
                  {project.card_role && project.year
                    ? `${project.card_role} • ${project.year}`
                    : project.card_role || project.year}
                </p>
              )}

              {/* Preview image - below the header, same treatment as the homepage WorkGrid */}
              <div className="relative overflow-hidden mt-6">
                {project.card_status && (
                  <span
                    className={`absolute top-3 right-3 z-10 inline-flex items-center px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider border ${
                      statusBadgeClasses[project.card_status]
                    }`}
                  >
                    {project.card_status}
                  </span>
                )}

                {previewSrc ? (
                  <>
                    <img
                      src={previewSrc}
                      alt={`${project.title} preview`}
                      className="w-full h-auto block"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </>
                ) : (
                  <div className="w-full aspect-[4/3] flex items-center justify-center bg-muted/20 border border-border/20">
                    <span className="text-sm text-muted-foreground">Preview coming soon</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectTimeline;