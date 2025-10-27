import { useState, useEffect } from 'react';
import { projectsData } from '@/data/projectData';

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

        const project = projectsData[projectSlug];
        
        if (!project) {
          throw new Error('Project not found');
        }

        // Transform mockup images to assets format
        const mockupAssets: ProjectAsset[] = (project.mockupImages || []).map((imgPath, index) => ({
          id: `${project.id}-asset-${index}`,
          project_id: project.id,
          asset_type: 'image',
          file_name: imgPath,
          file_path: imgPath.startsWith('/') ? imgPath : `/src/assets/${imgPath}`,
          alt_text: `${project.title} mockup ${index + 1}`,
          caption: undefined,
          is_featured: index === 0,
          asset_tags: [],
          sort_order: index,
          created_at: new Date().toISOString()
        }));

        setAssets(mockupAssets);
        setExplorations([]);

      } catch (err) {
        console.error('Error loading project assets:', err);
        setError(err instanceof Error ? err.message : 'Failed to load assets');
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