import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface ProjectAsset {
  id: string;
  project_id: string;
  asset_type: string;
  file_name: string;
  file_path: string;
  alt_text: string | null;
  caption: string | null;
  contribution_level: string;
  is_featured: boolean;
  asset_tags: string[];
  sort_order: number;
  show_in_gallery: boolean;
  created_at: string;
}

interface UseAllProjectAssetsOptions {
  showInGalleryOnly?: boolean;
  projectSlug?: string;
  contributionLevel?: string;
}

export const useAllProjectAssets = (options?: UseAllProjectAssetsOptions) => {
  const [assets, setAssets] = useState<ProjectAsset[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllAssets = async () => {
      try {
        setIsLoading(true);
        setError(null);

        let query = supabase
          .from('project_assets')
          .select('*, projects(slug)')
          .order('sort_order', { ascending: true });

        // Apply filters if provided
        if (options?.showInGalleryOnly) {
          query = query.eq('show_in_gallery', true);
        }

        if (options?.contributionLevel) {
          query = query.eq('contribution_level', options.contributionLevel);
        }

        const { data, error: assetsError } = await query;

        if (assetsError) throw assetsError;

        // Filter by project slug if provided (done client-side due to join)
        let filteredAssets = data || [];
        if (options?.projectSlug) {
          filteredAssets = filteredAssets.filter(
            (asset: any) => asset.projects?.slug === options.projectSlug
          );
        }

        setAssets(filteredAssets as ProjectAsset[]);

      } catch (err) {
        console.error('Error fetching all project assets:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch assets');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllAssets();
  }, [options?.showInGalleryOnly, options?.projectSlug, options?.contributionLevel]);

  return {
    assets,
    isLoading,
    error
  };
};
