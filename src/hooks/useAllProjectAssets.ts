import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface UIAsset {
  id: string;
  project_id: string;
  title: string;
  description?: string;
  image_url: string;
  tags: string[];
  contribution_level: string;
  is_featured: boolean;
  sort_order: number;
}

export const useAllProjectAssets = () => {
  const [assets, setAssets] = useState<UIAsset[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllAssets = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch all project assets marked for gallery display
        const { data: assets, error: assetsError } = await supabase
          .from('project_assets')
          .select('*')
          .eq('show_in_gallery', true)
          .order('sort_order', { ascending: true });

        if (assetsError) throw assetsError;

        // Transform to match UIAsset interface
        const transformedAssets = (assets || []).map(asset => ({
          id: asset.id,
          project_id: asset.project_id,
          title: asset.alt_text || asset.file_name,
          description: asset.caption,
          image_url: asset.file_path,
          tags: asset.asset_tags || [],
          contribution_level: asset.contribution_level || 'Full',
          is_featured: asset.is_featured || false,
          sort_order: asset.sort_order || 0
        }));

        setAssets(transformedAssets);

      } catch (err) {
        console.error('Error fetching all project assets:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch assets');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllAssets();
  }, []);

  return {
    assets,
    isLoading,
    error
  };
};
