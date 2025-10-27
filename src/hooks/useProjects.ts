import { useState, useEffect } from "react";
import { projectsData } from "@/data/projectData";
import { getImageUrl } from "@/data/imageAssets";

export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  category: {
    id: string;
    name: string;
    slug: string;
  } | null;
  year: string | null;
  services: string | null;
  role_title: string | null;
  role_duration: string | null;
  role_team: string | null;
  role_tools: string[] | null;
  context_problem: string | null;
  context_objective: string | null;
  context_audience: string | null;
  reflection: string | null;
  live_link: string | null;
  github_link: string | null;
  figma_link: string | null;
  is_published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
  features: ProjectFeature[];
  process: ProjectProcess[];
  outcomes: ProjectOutcome[];
  assets: ProjectAsset[];
}

export interface ProjectFeature {
  id: string;
  title: string;
  description: string | null;
  icon: string | null;
  sort_order: number;
}

export interface ProjectProcess {
  id: string;
  step: string;
  description: string | null;
  icon: string | null;
  sort_order: number;
}

export interface ProjectOutcome {
  id: string;
  metric: string;
  value: string;
  sort_order: number;
}

export interface ProjectAsset {
  id: string;
  asset_type: 'image' | 'video' | 'document';
  file_name: string;
  file_path: string;
  file_size: number | null;
  mime_type: string | null;
  alt_text: string | null;
  caption: string | null;
  is_featured: boolean;
  sort_order: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
}

// Helper function to get category display name
const getCategoryName = (slug: string): string => {
  const categoryMap: Record<string, string> = {
    'b2c': 'B2C',
    'ai': 'AI',
    'finops': 'FinOps',
    'healthcare': 'Healthcare',
    'webdesigns': 'Web Designs',
    'ui-exploration': 'UI Exploration'
  };
  return categoryMap[slug] || slug;
};

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      
      // Transform static project data to match our interface
      const transformedProjects = Object.values(projectsData).map((project, index) => ({
        id: project.id,
        slug: project.id,
        title: project.title,
        subtitle: project.subtitle,
        description: project.description,
        category: {
          id: project.category,
          name: getCategoryName(project.category),
          slug: project.category
        },
        year: project.year,
        services: project.services,
        role_title: project.role.title,
        role_duration: project.role.duration,
        role_team: project.role.team,
        role_tools: project.role.tools,
        context_problem: project.context.problem,
        context_objective: project.context.objective,
        context_audience: project.context.audience,
        reflection: project.reflection,
        live_link: project.links.live || null,
        github_link: project.links.github || null,
        figma_link: project.links.figma || null,
        is_published: true,
        sort_order: index,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        features: project.features.map((f, i) => ({
          id: `${project.id}-feature-${i}`,
          title: f.title,
          description: f.description,
          icon: f.icon,
          sort_order: i
        })),
        process: project.process.map((p, i) => ({
          id: `${project.id}-process-${i}`,
          step: p.step,
          description: p.description,
          icon: p.icon,
          sort_order: i
        })),
        outcomes: project.outcomes.map((o, i) => ({
          id: `${project.id}-outcome-${i}`,
          metric: o.metric,
          value: o.value,
          sort_order: i
        })),
        assets: (project.mockupImages || []).map((imgPath, i) => ({
          id: `${project.id}-asset-${i}`,
          asset_type: 'image' as const,
          file_name: imgPath,
          file_path: getImageUrl(imgPath),
          file_size: null,
          mime_type: 'image/jpeg',
          alt_text: `${project.title} mockup ${i + 1}`,
          caption: null,
          is_featured: i === 0,
          sort_order: i
        }))
      }));

      setProjects(transformedProjects);
      
      // Extract unique categories
      const uniqueCategories = Array.from(
        new Set(Object.values(projectsData).map(p => p.category))
      ).map(slug => ({
        id: slug,
        name: getCategoryName(slug),
        slug,
        description: null
      }));

      setCategories(uniqueCategories);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const refetch = () => {
    fetchProjects();
  };

  return {
    projects,
    categories,
    loading,
    error,
    refetch
  };
};

export const useProject = (slug: string) => {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        
        const projectData = projectsData[slug];
        
        if (!projectData) {
          throw new Error('Project not found');
        }

        const transformedProject: Project = {
          id: projectData.id,
          slug: projectData.id,
          title: projectData.title,
          subtitle: projectData.subtitle,
          description: projectData.description,
          category: {
            id: projectData.category,
            name: getCategoryName(projectData.category),
            slug: projectData.category
          },
          year: projectData.year,
          services: projectData.services,
          role_title: projectData.role.title,
          role_duration: projectData.role.duration,
          role_team: projectData.role.team,
          role_tools: projectData.role.tools,
          context_problem: projectData.context.problem,
          context_objective: projectData.context.objective,
          context_audience: projectData.context.audience,
          reflection: projectData.reflection,
          live_link: projectData.links.live || null,
          github_link: projectData.links.github || null,
          figma_link: projectData.links.figma || null,
          is_published: true,
          sort_order: 0,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          features: projectData.features.map((f, i) => ({
            id: `${projectData.id}-feature-${i}`,
            title: f.title,
            description: f.description,
            icon: f.icon,
            sort_order: i
          })),
          process: projectData.process.map((p, i) => ({
            id: `${projectData.id}-process-${i}`,
            step: p.step,
            description: p.description,
            icon: p.icon,
            sort_order: i
          })),
          outcomes: projectData.outcomes.map((o, i) => ({
            id: `${projectData.id}-outcome-${i}`,
            metric: o.metric,
            value: o.value,
            sort_order: i
          })),
          assets: (projectData.mockupImages || []).map((imgPath, i) => ({
            id: `${projectData.id}-asset-${i}`,
            asset_type: 'image' as const,
            file_name: imgPath,
            file_path: getImageUrl(imgPath),
            file_size: null,
            mime_type: 'image/jpeg',
            alt_text: `${projectData.title} mockup ${i + 1}`,
            caption: null,
            is_featured: i === 0,
            sort_order: i
          }))
        };

        setProject(transformedProject);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Project not found');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchProject();
    }
  }, [slug]);

  return { project, loading, error };
};

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const uniqueCategories = Array.from(
          new Set(Object.values(projectsData).map(p => p.category))
        ).map(slug => ({
          id: slug,
          name: getCategoryName(slug),
          slug,
          description: null
        }));

        setCategories(uniqueCategories);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
};
