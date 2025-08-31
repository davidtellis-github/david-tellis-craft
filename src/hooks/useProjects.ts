import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

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

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      
      // Fetch projects with related data
      const { data: projectsData, error: projectsError } = await supabase
        .from('projects')
        .select(`
          *,
          category:categories(*),
          features:project_features(*),
          process:project_process(*),
          outcomes:project_outcomes(*),
          assets:project_assets(*)
        `)
        .eq('is_published', true)
        .order('sort_order', { ascending: true });

      if (projectsError) throw projectsError;

      // Sort related data by sort_order and cast types
      const sortedProjects = projectsData?.map(project => ({
        ...project,
        features: project.features?.sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0)) || [],
        process: project.process?.sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0)) || [],
        outcomes: project.outcomes?.sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0)) || [],
        assets: project.assets?.map(asset => ({
          ...asset,
          asset_type: asset.asset_type as 'image' | 'video' | 'document'
        })).sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0)) || []
      })) || [];

      setProjects(sortedProjects);
      
      // Fetch categories
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('categories')
        .select('*')
        .order('name');

      if (categoriesError) throw categoriesError;
      setCategories(categoriesData || []);

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
        
        const { data, error } = await supabase
          .from('projects')
          .select(`
            *,
            category:categories(*),
            features:project_features(*),
            process:project_process(*),
            outcomes:project_outcomes(*),
            assets:project_assets(*)
          `)
          .eq('slug', slug)
          .eq('is_published', true)
          .single();

        if (error) throw error;

        // Sort related data by sort_order and cast types
        const sortedProject = {
          ...data,
          features: data.features?.sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0)) || [],
          process: data.process?.sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0)) || [],
          outcomes: data.outcomes?.sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0)) || [],
          assets: data.assets?.map(asset => ({
            ...asset,
            asset_type: asset.asset_type as 'image' | 'video' | 'document'
          })).sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0)) || []
        };

        setProject(sortedProject);
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
        const { data, error } = await supabase
          .from('categories')
          .select('*')
          .order('name');

        if (error) throw error;
        setCategories(data || []);
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