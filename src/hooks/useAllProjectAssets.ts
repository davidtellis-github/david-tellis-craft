import { useState, useEffect } from 'react';
import { projectsData } from '@/data/projectData';

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

        // Aggregate all mockup images from all projects
        const allAssets: UIAsset[] = [];
        let sortOrder = 0;

        Object.values(projectsData).forEach(project => {
          (project.mockupImages || []).forEach((imgPath, index) => {
            allAssets.push({
              id: `${project.id}-asset-${index}`,
              project_id: project.id,
              title: `${project.title} - Design ${index + 1}`,
              description: project.subtitle,
              image_url: imgPath.startsWith('/') ? imgPath : `/src/assets/${imgPath}`,
              tags: [project.category],
              contribution_level: 'Full',
              is_featured: index === 0,
              sort_order: sortOrder++
            });
          });
        });

        setAssets(allAssets);

      } catch (err) {
        console.error('Error loading project assets:', err);
        setError(err instanceof Error ? err.message : 'Failed to load assets');
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
