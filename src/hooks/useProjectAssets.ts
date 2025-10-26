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
  contribution_level?: string;
  is_featured: boolean;
  asset_tags: string[];
  sort_order: number;
  show_in_gallery: boolean;
  created_at: string;
}

/**
 * Hook to fetch project assets from database
 * Categorizes assets by type following the flowchart structure:
 * - Portfolio Images (asset_type='portfolio-image')
 * - Gallery Assets (asset_type='gallery-image')
 * - Videos (asset_type='video')
 */
export const useProjectAssets = (projectSlug: string) => {
  const [assets, setAssets] = useState<ProjectAsset[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjectAssets = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Get project ID from slug
        const { data: project, error: projectError } = await supabase
          .from('projects')
          .select('id')
          .eq('slug', projectSlug)
          .single();

        if (projectError) throw projectError;
        if (!project) throw new Error('Project not found');

        // Fetch all project assets
        const { data: assetsData, error: assetsError } = await supabase
          .from('project_assets')
          .select('*')
          .eq('project_id', project.id)
          .order('sort_order', { ascending: true });

        if (assetsError) throw assetsError;

        setAssets(assetsData || []);

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

  // Categorize assets following flowchart structure
  const portfolioImages = assets.filter(asset => 
    asset.asset_type === 'portfolio-image' || asset.is_featured
  );
  
  const galleryAssets = assets.filter(asset => 
    asset.asset_type === 'gallery-image' && asset.show_in_gallery
  );
  
  const videos = assets.filter(asset => 
    asset.asset_type === 'video'
  );

  return {
    assets,
    isLoading,
    error,
    portfolioImages,
    galleryAssets,
    videos,
    allVisuals: assets.sort((a, b) => a.sort_order - b.sort_order)
  };
};
