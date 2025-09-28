import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface ProjectAsset {
  id: string;
  project_id: string;
  asset_type: string;
  file_name: string;
  file_path: string;
  alt_text?: string;
  caption?: string;
  is_featured: boolean;
  asset_tags: string[];
  sort_order: number;
  created_at: string;
}

interface UIExploration {
  id: string;
  project_id: string;
  title: string;
  description?: string;
  image_url: string;
  contribution_level: string;
  tags: string[];
  sort_order: number;
  is_featured: boolean;
  created_at: string;
}

export const useProjectAssets = (projectSlug: string) => {
  const [assets, setAssets] = useState<ProjectAsset[]>([]);
  const [explorations, setExplorations] = useState<UIExploration[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjectAssets = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // First get the project ID from slug
        const { data: project, error: projectError } = await supabase
          .from('projects')
          .select('id')
          .eq('slug', projectSlug)
          .single();

        if (projectError) throw projectError;
        if (!project) throw new Error('Project not found');

        // Fetch project assets
        const { data: assetsData, error: assetsError } = await supabase
          .from('project_assets')
          .select('*')
          .eq('project_id', project.id)
          .order('sort_order', { ascending: true });

        if (assetsError) throw assetsError;

        // Fetch UI explorations
        const { data: explorationsData, error: explorationsError } = await supabase
          .from('ui_explorations')
          .select('*')
          .eq('project_id', project.id)
          .order('sort_order', { ascending: true });

        if (explorationsError) throw explorationsError;

        setAssets(assetsData || []);
        setExplorations(explorationsData || []);

      } catch (err) {
        console.error('Error fetching project assets:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch assets');
      } finally {
        setIsLoading(false);
      }
    };

    if (projectSlug) {
      fetchProjectAssets();
    }
  }, [projectSlug]);

  return {
    assets,
    explorations,
    isLoading,
    error,
    featuredAssets: assets.filter(asset => asset.is_featured),
    galleryAssets: assets.filter(asset => !asset.is_featured),
    allVisuals: [...assets, ...explorations].sort((a, b) => a.sort_order - b.sort_order)
  };
};