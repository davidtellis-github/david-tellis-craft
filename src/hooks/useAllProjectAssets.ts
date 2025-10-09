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

        // Fetch all UI explorations from all projects
        const { data: explorations, error: explorationsError } = await supabase
          .from('ui_explorations')
          .select('*')
          .order('sort_order', { ascending: true });

        if (explorationsError) throw explorationsError;

        setAssets(explorations || []);

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
