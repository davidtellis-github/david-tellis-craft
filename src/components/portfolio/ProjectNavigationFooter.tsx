import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { projectsData } from '@/data/projectData';

interface ProjectNavigationFooterProps {
  currentProjectId: string;
}

export const ProjectNavigationFooter: React.FC<ProjectNavigationFooterProps> = ({
  currentProjectId
}) => {
  const projectIds = Object.keys(projectsData);
  const currentIndex = projectIds.indexOf(currentProjectId);
  
  const prevProjectId = currentIndex > 0 ? projectIds[currentIndex - 1] : null;
  const nextProjectId = currentIndex < projectIds.length - 1 ? projectIds[currentIndex + 1] : null;

  const prevProject = prevProjectId ? projectsData[prevProjectId] : null;
  const nextProject = nextProjectId ? projectsData[nextProjectId] : null;

  if (!prevProject && !nextProject) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-20 border-t border-border mt-20">
      {/* Previous Project */}
      {prevProject ? (
        <Link
          to={`/project/${prevProjectId}`}
          className="group relative overflow-hidden rounded-lg border border-border hover:border-foreground/20 transition-all duration-300 p-6 bg-card hover:shadow-lg"
        >
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
            <ArrowLeft className="w-4 h-4" />
            <span>Previous Project</span>
          </div>
          <h3 className="text-xl font-medium mb-2 group-hover:text-foreground transition-colors">
            {prevProject.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {prevProject.subtitle}
          </p>
        </Link>
      ) : (
        <div />
      )}

      {/* Next Project */}
      {nextProject && (
        <Link
          to={`/project/${nextProjectId}`}
          className="group relative overflow-hidden rounded-lg border border-border hover:border-foreground/20 transition-all duration-300 p-6 bg-card hover:shadow-lg text-right"
        >
          <div className="flex items-center justify-end gap-2 text-xs text-muted-foreground mb-3">
            <span>Next Project</span>
            <ArrowRight className="w-4 h-4" />
          </div>
          <h3 className="text-xl font-medium mb-2 group-hover:text-foreground transition-colors">
            {nextProject.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {nextProject.subtitle}
          </p>
        </Link>
      )}
    </div>
  );
};
