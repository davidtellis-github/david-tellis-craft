import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProjects } from "@/hooks/useProjects";
import { useSanityProjectFeaturedImages } from "@/hooks/useSanityProjectFeaturedImages";

interface ProjectTimelineProps {
  activeCategory: string;
  onProjectHover: (projectId: string | null) => void;
  hoveredCategory?: string | null;
}

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
        <div className="space-y-8">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="border-t border-border pt-8 first:border-t-0 first:pt-0">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-8">
                  <div className="w-8 h-8 bg-muted rounded animate-pulse"></div>
                  <div className="w-48 h-8 bg-muted rounded animate-pulse"></div>
                </div>
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
      <div className="space-y-8">
        {displayedProjects.map((project, index) => {
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
              className={`group border-t border-border pt-8 first:border-t-0 first:pt-0 transition-all duration-500 cursor-pointer interactive ${
                isHighlighted ? 'opacity-100' : 'opacity-50 hover:opacity-75'
              }`}
              onMouseEnter={() => handleProjectHover(project.id)}
              onMouseLeave={() => handleProjectHover(null)}
              onClick={() => handleProjectClick(project.slug)}
            >
              {/* Header: Title Row - Full Width, same as before */}
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-8">
                  {/* Number */}
                  <div className="text-2xl font-medium text-muted-foreground">
                    {String(index + 1).padStart(2, '0')}
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl lg:text-3xl font-medium uppercase tracking-tight">
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

              {/* Preview image - below the header, same treatment as the homepage WorkGrid */}
              {previewSrc && (
                <div className="relative overflow-hidden rounded-2xl mt-8">
                  <img
                    src={previewSrc}
                    alt={`${project.title} preview`}
                    className="w-full h-auto block rounded-2xl"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectTimeline;